<?php

namespace App\Kcms\Observers;

use App\Article;
use App\Kcms\Orderable\Orderable;

class ArticleObserver
{
    use Orderable;

    /**
     * Ops to perform when an article is being created
     *
     * @param Article $article
     */
    public function creating(Article $article)
    {
        // assign default ordering
        //$article->{Orderable::$orderCol} = $article->maxOrder($article->parent_id) + 1;
    }
}
