<?php

namespace App\Kcms\Services\JavaScript;

use Illuminate\Support\Arr;
use RecursiveIteratorIterator;
use RecursiveDirectoryIterator;
use Symfony\Component\Yaml\Parser;
use Illuminate\Filesystem\Filesystem;

class TranslateToJavaScript
{
    /** @var \SplFileInfo */
    protected $currentFile;

    /** @var string */
    protected $destination;

    /** @var Filesystem */
    protected $files;

    /** @var array */
    protected $manifest;

    /** @var string */
    protected $manifestFile = 'i18n.manifest.json';

    /**  @var string */
    protected $source;

    /** @var array */
    protected $translationFiles;

    /** @var array */
    protected $translations;

    /** @var string */
    protected $translationsFile = 'laravelTranslations.js';

    /**
     * TranslateToJavaScript constructor.
     */
    public function __construct()
    {
        $this->files = new Filesystem;
        $this->source = lang_path().DIRECTORY_SEPARATOR.config('app.locale').DIRECTORY_SEPARATOR.'kcms';
        $this->destination = resource_path('assets/js/admin');
    }

    /**
     * Writes all translation files to a single JSON
     * file, and a manifest for later quick check
     *
     * @return bool
     */
    public static function writeFiles()
    {
        $translator = new static();

        return $translator->make();
    }

    /**
     * Creates the translations directory
     *
     * @return TranslateToJavaScript
     */
    protected function createTranslationsDir(): self
    {
        if (! $this->files->exists($this->destination)) {
            mkdir($this->destination, 0755, true);
        }

        return $this;
    }

    /**
     * Check if translation file has YAML extension
     *
     * @return bool
     */
    protected function currentFileIsYaml()
    {
        $extension = $this->currentFile->getExtension();

        return $extension === 'yaml' || $extension === 'yml';
    }

    /**
     * Assigns the current translation
     * info to respective properties
     *
     * @return void
     */
    protected function loadTranslation()
    {
        if (! $this->currentFileIsYaml()) {
            return;
        }

        $parser = new Parser();
        $yaml = $parser->parse(file_get_contents($this->currentFile));
        $file = basename($this->currentFile);
        $name = substr(
            $file,
            0,
            (strlen($file))-(strlen(strrchr($file, '.')))
        );

        $this->translationFiles[] = [
            'file' => $file,
            'size' => $this->currentFile->getSize(),
            'time' => filemtime($this->currentFile),
        ];

        $this->translations[$name] = Arr::dot($yaml);
    }

    /**
     * Iterates the TranslateToJavaScript directory
     *
     * @return void
     */
    protected function loadTranslations()
    {
        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator(
                $this->source,
                RecursiveDirectoryIterator::SKIP_DOTS
            )
        );

        foreach ($iterator as $this->currentFile) {
            $this->loadTranslation();
        }
    }

    /**
     * Loads existing manifest
     *
     * @return bool
     */
    protected function loadManifest(): bool
    {
        $manifest = $this->destination.DIRECTORY_SEPARATOR.$this->manifestFile;

        if (! $this->files->exists($manifest)) {
            return false;
        }

        $this->manifest = json_decode(file_get_contents($manifest), true);

        return true;
    }

    /**
     * Starts the conversion process, by determining if
     * the manifest file matches the existing files.
     * In that case, we will just return false.
     *
     * @return bool
     */
    protected function make(): bool
    {
        $this->loadTranslations();

        if ($this->manifestMatchesTranslations()) {
            return false;
        }

        return $this->saveFiles();
    }

    /**
     * Check if existing manifest matches
     * the existing translation files.
     *
     * @return bool
     */
    protected function manifestMatchesTranslations(): bool
    {
        $hasManifest = $this->loadManifest();

        if (! $hasManifest || count($this->manifest) !== count($this->translationFiles)) {
            return false;
        }

        usort($this->manifest, function($a, $b) {
            return $a['file'] <=> $b['file'];
        });

        usort($this->translationFiles, function($a, $b) {
            return $a['file'] <=> $b['file'];
        });

        return $this->manifest === $this->translationFiles;
    }

    /**
     * Takes the necessary steps to actually
     * save all the required JS files.
     *
     * @return bool
     */
    protected function saveFiles(): bool
    {
        $this->saveManifest()
             ->saveTranslations();

        return true;
    }

    /**
     * Save a new manifest
     *
     * @return TranslateToJavaScript
     */
    protected function saveManifest(): self
    {
        $manifest = $this->destination.DIRECTORY_SEPARATOR.$this->manifestFile;

        $this->createTranslationsDir()
             ->unlinkFile($manifest)
             ->writeContentToFile(json_encode($this->translationFiles), $manifest);

        return $this;
    }

    /**
     * Write the JS translations file
     *
     * @return TranslateToJavaScript
     */
    protected function saveTranslations(): self
    {
        $translations = $this->destination.DIRECTORY_SEPARATOR.$this->translationsFile;

        $this->createTranslationsDir()
             ->unlinkFile($translations)
             ->writeContentToFile($this->translationTemplate(), $translations);

        return $this;
    }

    /**
     * The template for the translations JS file
     *
     * @return string
     */
    protected function translationTemplate(): string
    {
        return 'let translations = '.json_encode($this->translations).PHP_EOL.'export { translations }'.PHP_EOL;
    }

    /**
     * Delete the given file
     *
     * @param string $file Full path to file to unlink
     *
     * @return TranslateToJavaScript
     */
    protected function unlinkFile(string $file): self
    {
        if ($this->files->exists($file)) {
            unlink($file);
        }

        return $this;
    }

    /**
     * Writes given content to given file
     *
     * @param string $content The content to write
     * @param string $file    The full path of the file to write to
     */
    protected function writeContentToFile(string $content, string $file)
    {
        file_put_contents($file, $content.PHP_EOL);
    }
}
