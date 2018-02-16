<?php

namespace Tests\Unit;

class YamlTranslationTest extends TestCase
{
    /**
     * @test
     */
    public function testItCanReadTranslations()
    {
        $this->assertEquals('Test', __t('tests.test'));
    }

    /**
     * @test
     */
    public function testItCanReplacePlaceholders()
    {
        $this->assertEquals('Test with replaced text', __t('tests.replace', ['replacement' => 'replaced text']));
    }
}
