<?php

namespace App\Kcms\Html\ElementGenerator;

/**
 * Trait Tags
 * @package App\Kcms\Html\ElementGenerator
 */
trait Tags
{
    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function a($attributes, $content = ''): self
    {
        return new static('a', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function blockquote($attributes, $content = ''): self
    {
        return new static('blockquote', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function button($attributes, $content = ''): self
    {
        return new static('button', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function caption($attributes, $content = ''): self
    {
        return new static('caption', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function code($attributes, $content = ''): self
    {
        return new static('code', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function div($attributes, $content = ''): self
    {
        return new static('div', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function fieldset($attributes, $content = ''): self
    {
        return new static('fieldset', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function figure($attributes, $content = ''): self
    {
        return new static('figure', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function figcaption($attributes, $content = ''): self
    {
        return new static('figcaption', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function footer($attributes, $content = ''): self
    {
        return new static('footer', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function form($attributes, $content = ''): self
    {
        return new static('form', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function h1($attributes, $content = ''): self
    {
        return new static('h1', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function h2($attributes, $content = ''): self
    {
        return new static('h2', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function h3($attributes, $content = ''): self
    {
        return new static('h3', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function h4($attributes, $content = ''): self
    {
        return new static('h4', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function h5($attributes, $content = ''): self
    {
        return new static('h5', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function h6($attributes, $content = ''): self
    {
        return new static('h6', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function header($attributes, $content = ''): self
    {
        return new static('header', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function input($attributes, $content = ''): self
    {
        return new static('input', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function img($attributes, $content = ''): self
    {
        return new static('img', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function label($attributes, $content = ''): self
    {
        return new static('label', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function legend($attributes, $content = ''): self
    {
        return new static('legend', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function li($attributes, $content = ''): self
    {
        return new static('li', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function main($attributes, $content = ''): self
    {
        return new static('main', $attributes, $content);
    }

    /**
     * @param $name
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function named($name, $attributes, $content = ''): self
    {
        return new static($name, $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function nav($attributes, $content = ''): self
    {
        return new static('nav', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function ol($attributes, $content = ''): self
    {
        return new static('ol', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function option($attributes, $content = ''): self
    {
        return new static('option', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function p($attributes, $content = ''): self
    {
        return new static('p', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function path($attributes, $content = ''): self
    {
        return new static('path', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function picture($attributes, $content = ''): self
    {
        return new static('picture', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function pre($attributes, $content = ''): self
    {
        return new static('pre', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function section($attributes, $content = ''): self
    {
        return new static('section', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function select($attributes, $content = ''): self
    {
        return new static('select', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function span($attributes, $content = ''): self
    {
        return new static('span', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function small($attributes, $content = ''): self
    {
        return new static('small', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function strong($attributes, $content = ''): self
    {
        return new static('strong', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function sub($attributes, $content = ''): self
    {
        return new static('sub', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function sup($attributes, $content = ''): self
    {
        return new static('sup', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function svg($attributes, $content = ''): self
    {
        return new static('svg', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function table($attributes, $content = ''): self
    {
        return new static('table', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function tbody($attributes, $content = ''): self
    {
        return new static('tbody', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function td($attributes, $content = ''): self
    {
        return new static('td', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function th($attributes, $content = ''): self
    {
        return new static('th', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function time($attributes, $content = ''): self
    {
        return new static('time', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function tr($attributes, $content = ''): self
    {
        return new static('tr', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function textarea($attributes, $content = ''): self
    {
        return new static('textarea', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function title($attributes, $content = ''): self
    {
        return new static('title', $attributes, $content);
    }

    /**
     * @param array|string $attributes
     * @param $content
     * @return self
     */
    public static function ul($attributes, $content = ''): self
    {
        return new static('ul', $attributes, $content);
    }
}
