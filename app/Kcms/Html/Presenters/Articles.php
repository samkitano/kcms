<?php

namespace App\Kcms\Html\Presenters;

use App\Article;
use App\Kcms\Html\ElementGenerator\Tag;
use App\Kcms\Html\Traits\HtmlConstants;

class Articles
{
    public static function title(Article $article)
    {
        return Tag::a([
            'title' => __t('articles.edit'),
            'href' => route('articles.edit', $article->id)
        ], $article->title);
    }

    public static function blocks(Article $article): int
    {
        return $article->children()->count();
    }

    public static function tags(Article $article): int
    {
        return $article->tags->count();
    }

    public static function status(Article $article)
    {
        $published = (bool) $article->published;

        return $published
            ? static::publishedStatus($article->published)
            : static::draftStatus();
    }

    public static function order(Article $article)
    {
        return [
            'order' => $article->{$article::$orderCol},
            'max' => $article::maxOrder($article->parent_id),
            'id' => $article->id,
        ];
    }

    public static function created(Article $article)
    {
        return $article->created_at->format('d-m-y h:i');
    }

    public static function updated(Article $article)
    {
        return $article->updated_at->format('d-m-y h:i');
    }

    protected static function draftStatus()
    {
        $path = Tag::path([
            'd' => HtmlConstants::$draftSvgPath
        ]);
        $title = Tag::title(__t('articles.draft'));
        $content = $path.$title;

        return Tag::svg([
            'role' => 'img',
            'viewBox' => HtmlConstants::$faViewBox,
            'width' => 16,
            'height' => 16,
            'class' => 'fill-current',
        ], $content);
    }

    protected static function publishedStatus($date)
    {
        $path = Tag::path([
            'd' => HtmlConstants::$publishedSvgPath
        ]);
        $title = Tag::title(__t('articles.published').' '.$date);
        $content = $path.$title;

        return Tag::svg([
            'role' => 'img',
            'viewBox' => HtmlConstants::$faViewBox,
            'width' => 16,
            'height' => 16,
            'class' => 'fill-current',
        ], $content);
    }
}
