<?php

namespace App\Kcms\Yaml;

use Illuminate\Support\Arr;
use Symfony\Component\Yaml\Parser;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Contracts\Translation\Loader;

class Translations implements Loader
{
    /** @var Filesystem */
    protected $files;

    /** @var string */
    protected $path;

    /** @var array */
    protected $hints = [];

    /**
     * Create a new Translations instance.
     *
     * @param Filesystem $files
     * @param string     $path
     */
    public function __construct(Filesystem $files, string $path)
    {
        $this->path  = $path;
        $this->files = $files;
    }

    /** @inheritdoc */
    public function load($locale, $group, $namespace = null)
    {
        return is_null($namespace) || $namespace == '*'
            ? $this->loadPath($this->path, $locale, $group)
            : $this->loadNamespaced($locale, $group, $namespace);
    }

    /** @inheritdoc */
    public function addNamespace($namespace, $hint)
    {
        $this->hints[$namespace] = $hint;
    }

    /** @inheritdoc */
    public function namespaces()
    {
        return $this->hints;
    }

    /** @inheritdoc */
    public function addJsonPath($path)
    {
    }

    /**
     * Loads locale from given path
     *
     * @param string $path
     * @param string $locale
     * @param string $group
     *
     * @return array
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     */
    protected function loadPath(
        string $path,
        string $locale,
        string $group
    ): array
    {
        foreach ($this->allowedExtensions() as $extension) {
            $fullPath = "{$path}/{$locale}/{$group}.{$extension}";

            if ($this->files->exists($fullPath)) {
                return $this->parseContent($extension, $fullPath);
            }
        }

        return [];
    }

    /**
     * Parse file content before loading
     *
     * @param string $extension
     * @param string $file
     *
     * @return array
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     */
    protected function parseContent(string $extension, string $file): array
    {
        $content = null;

        switch ($extension) {
            case 'php':
                $content = $this->files->getRequire($file);
                break;
            case 'yml':
            case 'yaml':
                $content = $this->parseYamlOrLoadFromCache($file);
                break;
        }

        return Arr::dot($content);
    }

    /**
     * Parse a Yaml file and return as a php array or load from cache.
     *
     * @param string $file
     *
     * @return array
     */
    protected function parseYamlOrLoadFromCache(string $file): array
    {
        $cachedir = storage_path() . '/yaml-translation/';
        $cachefile = $cachedir . 'cache.' . md5($file) . '.php';

        if (@filemtime($cachefile) < filemtime($file)) {
            $parser = new Parser();
            $yaml = $parser->parse(file_get_contents($file));
            $content = $yaml ?? [];
            //$content = null === ($yaml) ? [] : $yaml;

            if (! file_exists($cachedir)) {
                @mkdir($cachedir, 0755);
            }

            file_put_contents($cachefile, "<?php" . PHP_EOL . PHP_EOL . "return " . var_export($content, true) . ";");
        } else {
            $content = require $cachefile;
        }

        return $content;
    }

    /**
     * Get Allowed Translation File Extensions.
     *
     * @return array
     */
    protected function allowedExtensions(): array
    {
        return ['php', 'yml', 'yaml'];
    }

    /**
     * Load a local namespaced translation group for overrides.
     *
     * @param array  $lines
     * @param string $locale
     * @param string $group
     * @param string $namespace
     *
     * @return array
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     */
    protected function loadNamespaceOverrides(
        array $lines,
        string $locale,
        string $group,
        string $namespace
    ): array
    {
        foreach ($this->allowedExtensions() as $extension) {
            $file = "{$this->path}/vendor/{$namespace}/{$locale}/{$group}.{$extension}";

            if ($this->files->exists($file)) {
                return array_replace_recursive(
                    $lines,
                    $this->parseContent($extension, $file)
                );
            }
        }

        return $lines;
    }

    /**
     * Load a namespaced translation group.
     *
     * @param string $locale
     * @param string $group
     * @param string $namespace
     *
     * @return array
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     */
    protected function loadNamespaced(
        string $locale,
        string $group,
        string $namespace
    ): array
    {
        if (isset($this->hints[$namespace])) {
            $lines = $this->loadPath($this->hints[$namespace], $locale, $group);

            return $this->loadNamespaceOverrides($lines, $locale, $group, $namespace);
        }

        return [];
    }
}
