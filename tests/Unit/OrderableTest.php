<?php

namespace Tests\Unit;

use App\Article;
use Illuminate\Support\Collection;

class OrderableTest extends TestCase
{
    /**
     * @test
     */
    public function testItSetsOrderOnCreation()
    {
        $orderColumn = Article::$orderCol;

        foreach (Article::all() as $article) {
            $this->assertNotNull($article->{$orderColumn});
            $this->assertEquals($article->{$orderColumn}, $article->id);
        }
    }

    /**
     * @test
     */
    public function testItCanGetMaxOrder()
    {
        $this->assertEquals(
            Article::all()->count(),
            (new Article())->getMaxOrder()
        );
    }

    /**
     * @test
     */
    public function testItCanSetAnewOrderFromArray()
    {
        $orderColumn = Article::$orderCol;
        $newOrder = Collection::make(Article::all()->pluck('id'))
                              ->shuffle()
                              ->toArray();

        Article::setNewOrder($newOrder);

        foreach (Article::orderBy($orderColumn)->get() as $i => $article) {
            $this->assertEquals($newOrder[$i], $article->id);
        }
    }

    /**
     * @test
     */
    public function testItCanSetAnewOrderFromCollection()
    {
        $orderColumn = Article::$orderCol;
        $newOrder = Collection::make(Article::all()->pluck('id'))
                              ->shuffle();

        Article::setNewOrder($newOrder);

        foreach (Article::orderBy($orderColumn)->get() as $i => $article) {
            $this->assertEquals($newOrder[$i], $article->id);
        }
    }

    /**
     * @test
     */
    public function testItProvidesAnOrderedTrait()
    {
        $i = 1;
        $orderColumn = Article::$orderCol;

        foreach (Article::ordered()->get()->pluck($orderColumn) as $order) {
            $this->assertEquals($i++, $order);
        }
    }

    /**
     * @test
     */
    public function testItCanMoveOrderDown()
    {
        $orderColumn = Article::$orderCol;

        $first = Article::find(2);
        $second = Article::find(3);

        $this->assertEquals($first->{$orderColumn}, 2);
        $this->assertEquals($second->{$orderColumn}, 3);

        $first->down();

        $first = Article::find(2);
        $second = Article::find(3);

        $this->assertEquals($first->{$orderColumn}, 3);
        $this->assertEquals($second->{$orderColumn}, 2);
    }

    /**
     * @test
     */
    public function testItCanMoveOrderUp()
    {
        $orderColumn = Article::$orderCol;

        $first = Article::find(3);
        $second = Article::find(4);

        $this->assertEquals($first->{$orderColumn}, 3);
        $this->assertEquals($second->{$orderColumn}, 4);

        $second->up();

        $first = Article::find(3);
        $second = Article::find(4);

        $this->assertEquals($first->{$orderColumn}, 4);
        $this->assertEquals($second->{$orderColumn}, 3);
    }

    /**
     * @test
     */
    public function testItDoesNotFailMovingLastDown()
    {
        $orderColumn = Article::$orderCol;
        $model = Article::all()->last();

        $this->assertEquals($model->{$orderColumn}, 10);
        $this->assertEquals($model, $model->down());
    }

    /**
     * @test
     */
    public function testItDoesNotFailMovingFirstUp()
    {
        $orderColumn = Article::$orderCol;
        $model = Article::first();

        $this->assertEquals($model->{$orderColumn}, 1);
        $this->assertEquals($model, $model->up());
    }

    /**
     * @test
     */
    public function testItCanSwapTwoModels()
    {
        $orderColumn = Article::$orderCol;
        $first = Article::find(4);
        $second = Article::find(5);

        $this->assertEquals($first->{$orderColumn}, 4);
        $this->assertEquals($second->{$orderColumn}, 5);

        Article::swap($first, $second);

        $this->assertEquals($first->{$orderColumn}, 5);
        $this->assertEquals($second->{$orderColumn}, 4);
    }

    /**
     * @test
     */
    public function testItCanSwapItSelf()
    {
        $orderColumn = Article::$orderCol;
        $first = Article::find(7);
        $second = Article::find(8);

        $this->assertEquals($first->{$orderColumn}, 7);
        $this->assertEquals($second->{$orderColumn}, 8);

        $first->swapWith($second);

        $this->assertEquals($first->{$orderColumn}, 8);
        $this->assertEquals($second->{$orderColumn}, 7);
    }

    /**
     * @test
     */
    public function testItCanMoveOrderToTop()
    {
        $orderColumn = Article::$orderCol;
        $position = 6;
        $oldModels = Article::where('id', '!=', $position)->get();
        $model = Article::find($position);

        $this->assertEquals(6, $model->{$orderColumn});

        $model = $model->toTop();

        $this->assertEquals(1, $model->{$orderColumn});

        $oldModels = $oldModels->pluck($orderColumn, 'id');
        $newModels = Article::where('id', '!=', $position)
                            ->get()
                            ->pluck($orderColumn, 'id');

        foreach ($oldModels as $key => $oldModel) {
            $this->assertEquals($oldModel + 1, $newModels[$key]);
        }
    }

    /**
     * @test
     */
    public function testItCanMoveOrderToBottom()
    {
        $orderColumn = Article::$orderCol;
        $position = 5;
        $oldModels = Article::where('id', '!=', $position)->get();
        $model = Article::find($position);

        $this->assertNotEquals(10, $model->{$orderColumn});

        $model = $model->toBottom();

        $this->assertEquals(10, $model->{$orderColumn});

        $oldModels = $oldModels->pluck($orderColumn, 'id');
        $newModels = Article::where('id', '!=', $position)
                            ->get()
                            ->pluck($orderColumn, 'id');

        foreach ($oldModels as $key => $order) {
            $this->assertEquals($order - 1, $newModels[$key]);
        }
    }
}
