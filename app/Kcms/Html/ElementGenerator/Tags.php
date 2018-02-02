<?php

namespace App\Kcms\Html\ElementGenerator;

trait Tags
{
    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function a($attributes = null, $content = ''): self
    {
        return new static('a', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function blockquote($attributes = null, $content = ''): self
    {
        return new static('blockquote', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function br($attributes = null, $content = ''): self
    {
        return new static('br', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function button($attributes = null, $content = ''): self
    {
        return new static('button', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function caption($attributes = null, $content = ''): self
    {
        return new static('caption', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function code($attributes = null, $content = ''): self
    {
        return new static('code', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function div($attributes = null, $content = ''): self
    {
        return new static('div', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function fieldset($attributes = null, $content = ''): self
    {
        return new static('fieldset', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function figure($attributes = null, $content = ''): self
    {
        return new static('figure', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function figcaption($attributes = null, $content = ''): self
    {
        return new static('figcaption', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function footer($attributes = null, $content = ''): self
    {
        return new static('footer', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function form($attributes = null, $content = ''): self
    {
        return new static('form', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function h1($attributes = null, $content = ''): self
    {
        return new static('h1', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function h2($attributes = null, $content = ''): self
    {
        return new static('h2', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function h3($attributes = null, $content = ''): self
    {
        return new static('h3', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function h4($attributes = null, $content = ''): self
    {
        return new static('h4', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function h5($attributes = null, $content = ''): self
    {
        return new static('h5', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function h6($attributes = null, $content = ''): self
    {
        return new static('h6', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function header($attributes = null, $content = ''): self
    {
        return new static('header', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function input($attributes = null, $content = ''): self
    {
        return new static('input', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function img($attributes = null, $content = ''): self
    {
        return new static('img', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function label($attributes = null, $content = ''): self
    {
        return new static('label', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function legend($attributes = null, $content = ''): self
    {
        return new static('legend', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function li($attributes = null, $content = ''): self
    {
        return new static('li', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function main($attributes = null, $content = ''): self
    {
        return new static('main', $attributes, $content);
    }

    /**
     * @param $name
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function named($name, $attributes, $content = ''): self
    {
        return new static($name, $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function nav($attributes = null, $content = ''): self
    {
        return new static('nav', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function ol($attributes = null, $content = ''): self
    {
        return new static('ol', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function option($attributes = null, $content = ''): self
    {
        return new static('option', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function p($attributes = null, $content = ''): self
    {
        return new static('p', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function path($attributes = null, $content = ''): self
    {
        return new static('path', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function picture($attributes = null, $content = ''): self
    {
        return new static('picture', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function pre($attributes = null, $content = ''): self
    {
        return new static('pre', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function section($attributes = null, $content = ''): self
    {
        return new static('section', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function select($attributes = null, $content = ''): self
    {
        return new static('select', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function span($attributes = null, $content = ''): self
    {
        return new static('span', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function small($attributes = null, $content = ''): self
    {
        return new static('small', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function strong($attributes = null, $content = ''): self
    {
        return new static('strong', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function sub($attributes = null, $content = ''): self
    {
        return new static('sub', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function sup($attributes = null, $content = ''): self
    {
        return new static('sup', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function svg($attributes = null, $content = ''): self
    {
        return new static('svg', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function table($attributes = null, $content = ''): self
    {
        return new static('table', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function tbody($attributes = null, $content = ''): self
    {
        return new static('tbody', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function td($attributes = null, $content = ''): self
    {
        return new static('td', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function th($attributes = null, $content = ''): self
    {
        return new static('th', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function time($attributes = null, $content = ''): self
    {
        return new static('time', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function tr($attributes = null, $content = ''): self
    {
        return new static('tr', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function textarea($attributes = null, $content = ''): self
    {
        return new static('textarea', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function title($attributes = null, $content = ''): self
    {
        return new static('title', $attributes, $content);
    }

    /**
     * @param array|string|null $attributes
     * @param string            $content
     * @return self
     */
    public static function ul($attributes = null, $content = ''): self
    {
        return new static('ul', $attributes, $content);
    }
}
