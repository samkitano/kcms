<?php

namespace Tests\Unit;

use RecursiveIteratorIterator;
use RecursiveDirectoryIterator;
use Illuminate\Support\Facades\File;

/**
 * Class JavascriptTranslationsTest
 *
 * This test requires JavasCriptTranslations to be ran at least once
 * If the test fails, prease run php artisan make:jstrans
 */
class JavascriptTranslationsTest extends TestCase
{
    /**
     * @test
     */
    public function testManifestEsxists()
    {
        $this->assertTrue(File::exists($this->getManifestPath()));
    }

    /**
     * @test
     */
    public function testTranslationsFileExists()
    {
        $this->assertTrue(File::exists($this->getTranslationsPath()));
    }

    /**
     * @test
     */
    public function testManifestContainsExistingFiles()
    {
        $data = $this->getManifestData();

        $this->assertTrue(count($data) > 0);

        foreach ($data as $entry) {
            $this->assertTrue(File::exists($this->getLangPath().DIRECTORY_SEPARATOR.$entry['file']));
        }
    }

    /**
     * @test
     */
    public function testManifestContainsAccurateData()
    {
        $manifestData = $this->getManifestData();
        $langData = $this->getLangData();

        $this->assertEquals($manifestData, $langData);
    }

    /**
     * @test
     */
    public function testTranslationFileContainsTranslatedData()
    {
        $data = $this->getTranslatedData();
        $test = __t('tests.test');

        $fileExists = isset($data['tests']);
        $keyExists = isset($data['tests']['test']);

        $this->assertTrue($fileExists);
        $this->assertTrue($keyExists);
        $this->assertTrue($test == $data['tests']['test']);
    }

    protected function getLangData()
    {
        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator(
                $this->getLangPath(),
                RecursiveDirectoryIterator::SKIP_DOTS
            )
        );

        $res = [];

        foreach ($iterator as $iteratee) {
            $res[] = [
                'file' => basename($iteratee),
                'size' => $iteratee->getSize(),
                'time' => filemtime($iteratee),
            ];
        }

        usort($res, function($a, $b) {
            return $a['file'] <=> $b['file'];
        });

        return $res;
    }

    protected function getManifestData()
    {
        $data = json_decode(file_get_contents($this->getManifestPath()), true);

        usort($data, function($a, $b) {
            return $a['file'] <=> $b['file'];
        });

        return $data;
    }

    protected function getTranslatedData()
    {
        $fileContent = file_get_contents($this->getTranslationsPath());
        $fileContent = str_replace(['let translations = ', 'export { translations }'], '', $fileContent);

        return json_decode($fileContent, true);
    }

    protected function getManifestPath()
    {
        return resource_path('assets/js/admin/i18n.manifest.json');
    }

    protected function getTranslationsPath()
    {
        return resource_path('assets/js/admin/laravelTranslations.js');
    }

    protected function getLangPath()
    {
        return lang_path().DIRECTORY_SEPARATOR.config('app.locale').DIRECTORY_SEPARATOR.'kcms';
    }
}
