<?php

namespace App\Kcms\Html;

use App\Kcms\Html\Navigation\AuthNav;

class Navigation
{
    const XMLNS = 'http://www.w3.org/2000/svg';

    /** @var null|array */
    protected $errors;

    /** @var \App\Kcms\Html\ElementGenerator\Tag */
    protected $html;

    public static function authNav() {
        return AuthNav::create()->html;
    }
}
