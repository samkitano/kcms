<?php

namespace Tests\Unit;

use App\Article;

class TagTest extends TestCase
{
    /**
     * @test
     */
    public function testAnArticleCanBeTagged()
    {
        $a = Article::first();
        $a->tag(['foo', 'bar', 'baz']);

        $tags = $a->fresh()->tags->toArray();

        $this->assertTrue(count($tags) === 3, 'Not 3');
        $this->assertTrue($tags[0]['name'] === 'foo', 'Not foo');
        $this->assertTrue($tags[1]['name'] === 'bar', 'Not bar');
        $this->assertTrue($tags[2]['name'] === 'baz', 'Not baz');
    }

    /**
     * @test
     */
    public function testTagsCanBeSlugged()
    {
        $a = Article::first();
        $a->tag('foo bar Baz');

        $tags = $a->fresh()->tags->toArray();

        $this->assertTrue(count($tags) === 1, 'Not 1');
        $this->assertTrue($tags[0]['slug'] === 'foo-bar-baz', 'Not foo-bar-baz');
    }

    /**
     * @test
     */
    public function testTagsCanBeRemoved()
    {
        $a = Article::first();
        $a->untag(['foo', 'bar', 'baz', 'foo-bar-baz']);

        $tags = $a->fresh()->tags->toArray();

        $this->assertTrue(count($tags) === 0, 'Not 0');
    }
}
