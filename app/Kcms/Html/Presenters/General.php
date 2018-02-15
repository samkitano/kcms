<?php

namespace App\Kcms\Html\Presenters;

use App\Kcms\Html\ElementGenerator\Tag;
use App\Kcms\Html\Traits\HtmlConstants;

class General
{
    use HtmlConstants;

    /**
     * @param string $title
     *
     * @return array|string
     */
    public static function pageTitle(string $title): string
    {
        return (string) Tag::h1(['class' => 'text-2xl font-narrow'], ucfirst($title));
    }
}
