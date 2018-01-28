<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Kcms\Html\ElementGenerator\Tag;
use App\Kcms\Html\Exceptions\TagCanNotHaveContentException;

class HtmlGeneratorTest extends TestCase
{
    public function testAtag()
    {
        $attrs = [
            'href' => '/',
        ];

        $a = Tag::a($attrs, 'test')->toHtml();

        $this->assertEquals('<a href="/">test</a>', $a);
    }

    public function testAtagWithoutAttrs()
    {
        $p = Tag::p('test')->toHtml();

        $this->assertEquals('<p>test</p>', $p);
    }

    public function testAnEmptyTag()
    {
        $tag = Tag::span()->toHtml();

        $this->assertEquals('<span></span>', $tag);
    }

    public function testTagWithNoContent()
    {
        $this->expectException(TagCanNotHaveContentException::class);

        Tag::br('test')->toHtml();
    }
}
