<?php

namespace App\Kcms\Services\JavaScript;

use Illuminate\Support\Arr;
use RecursiveIteratorIterator;
use RecursiveDirectoryIterator;
use Symfony\Component\Yaml\Parser;
use Illuminate\Filesystem\Filesystem;

class TranslateToJson
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
     * TranslateToJson constructor.
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
     * Takes the necessary steps to actually
     * save all the required JSON files.
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
     * Assign the JSON encoded translations to a property
     *
     * @return TranslateToJson
     */
    protected function encodeTranslations(): self
    {
        $this->translations = json_encode($this->translations, JSON_PRETTY_PRINT).PHP_EOL;

        return $this;
    }

    /**
     * Write the JSON translations to a file
     *
     * @return void
     */
    protected function saveTranslations()
    {
        $this->createTranslationsDir();

        $translations = $this->destination.DIRECTORY_SEPARATOR.$this->translationsFile;

        if ($this->files->exists($translations)) {
            unlink($translations);
        }

        file_put_contents($translations,
            '\'use strict\''.
            PHP_EOL.PHP_EOL.
            'let translations = '.
            json_encode($this->translations, JSON_PRETTY_PRINT).
            PHP_EOL.
            PHP_EOL.
            'export { translations }'.
            PHP_EOL
        );
    }

    /**
     * Iterates the TranslateToJson directory
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
     * Save a new manifest
     *
     * @return TranslateToJson
     */
    protected function saveManifest(): self
    {
        $this->createTranslationsDir();

        $manifest = $this->destination.DIRECTORY_SEPARATOR.$this->manifestFile;

        if ($this->files->exists($manifest)) {
            unlink($manifest);
        }

        file_put_contents($manifest, json_encode($this->translationFiles, JSON_PRETTY_PRINT).PHP_EOL);

        return $this;
    }

    /**
     * Creates the translations directory
     *
     * @return void
     */
    protected function createTranslationsDir()
    {
        if (! $this->files->exists($this->destination)) {
            mkdir($this->destination, 0755);
        }
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
}
