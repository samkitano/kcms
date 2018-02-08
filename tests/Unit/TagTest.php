<?php

namespace Tests\Unit;

use App\Article;
use App\Tag;
use App\Tagged;
use Tests\TestCase;

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
        $a->tag('foo bar baz');

        $tags = $a->fresh()->tags->toArray();

        $this->assertTrue(count($tags) === 4, 'Not 4');
        $this->assertTrue($tags[3]['slug'] === 'foo-bar-baz', 'Not foo-bar-baz');
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

    /**
     * @test
     */
    public function testCreatedTagsRemainInDb()
    {
        $foo = Tag::where('name', 'foo')->first();
        $bar = Tag::where('name', 'bar')->first();
        $baz = Tag::where('name', 'baz')->first();
        $fbb = Tag::where('name', 'foo bar baz')->first();

        $this->assertTrue($foo->count == 0);
        $this->assertEquals('App\Article', $foo->model);
        $this->assertTrue($bar->count == 0);
        $this->assertEquals('App\Article', $bar->model);
        $this->assertTrue($baz->count == 0);
        $this->assertEquals('App\Article', $baz->model);
        $this->assertTrue($fbb->count == 0);
        $this->assertEquals('App\Article', $fbb->model);
    }

    /**
     * @test
     * @throws \Exception
     */
    public function testCleanUpDb()
    {
        $foo = Tag::where('name', 'foo')->first();
        $fooId = $foo->id;
        $bar = Tag::where('name', 'bar')->first();
        $barId = $bar->id;
        $baz = Tag::where('name', 'baz')->first();
        $bazId = $baz->id;
        $fbb = Tag::where('name', 'foo bar baz')->first();
        $fbbId = $fbb->id;

        $foo->delete();
        $bar->delete();
        $baz->delete();
        $fbb->delete();

        Tagged::where('tag_id', $fooId)->delete();
        Tagged::where('tag_id', $barId)->delete();
        Tagged::where('tag_id', $bazId)->delete();
        Tagged::where('tag_id', $fbbId)->delete();

        $this->assertTrue(Tag::where('name', 'foo')->count() == 0);
        $this->assertTrue(Tag::where('name', 'bar')->count() == 0);
        $this->assertTrue(Tag::where('name', 'baz')->count() == 0);
        $this->assertTrue(Tag::where('name', 'foo bar baz')->count() == 0);

        $this->assertTrue(Tagged::where('tag_id', $fooId)->count() == 0);
        $this->assertTrue(Tagged::where('tag_id', $barId)->count() == 0);
        $this->assertTrue(Tagged::where('tag_id', $bazId)->count() == 0);
        $this->assertTrue(Tagged::where('tag_id', $fbbId)->count() == 0);
    }
}
