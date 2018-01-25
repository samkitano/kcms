<?php

use Carbon\Carbon;
use App\Kcms\Services\Auth\User;
use Spatie\HtmlElement\HtmlElement;

if (! function_exists('humanize_diff_date')) {
    /**
     * Returns human readable difference between
     * the current date and a given past date
     *
     * @param Carbon $date
     * @return string
     */
    function humanize_diff_date(Carbon $date): string
    {
        return (new Jenssegers\Date\Date($date->timestamp))->ago();
    }
}

if (! function_exists('el')) {
    /**
     * Wrapper for Spatie's HtmlElement
     *
     * @param string       $tag        The html element tag.
     * @param array|string $attributes When only two arguments are passed, the second parameter
     *                                 represents the content instead of the attribute.
     * @param array|string $content    Contents can be passed in as a string or an array which
     *                                 will be concatenated as siblings.
     *
     * @return string
     */
    function el(string $tag, $attributes = null, $content = null): string
    {
        return HtmlElement::render(...func_get_args());
    }
}

if (! function_exists('__user')) {
    /**
     * Currently authenticated user
     *
     * @return \App\Kcms\Services\Auth\Admin\User|\App\Kcms\Services\Auth\Front\User|null
     * @throws \Exception
     */
    function __user(): ?User
    {
        if (request()->isFront()) {
            return auth()->guard('front')->user();
        }

        if (request()->isAdmin()) {
            return auth()->guard('admin')->user();
        }

        throw new Exception('Coud not determine current user');
    }
}

if (! function_exists('startsWithUnderscore')) {
    /**
     * Check if a string starts with an underscore
     *
     * @param string $str
     * @return bool
     */
    function startsWithUnderscore(string $str): bool
    {
        return substr($str, 0, 1) === '_';
    }
}

if (! function_exists('startsWithBrace')) {
    /**
     * Check if a string starts with an opening brace
     *
     * @param string $str
     * @return bool
     */
    function startsWithBrace(string $str): bool
    {
        return substr($str, 0, 1) === '{';
    }
}

if (! function_exists('replaceBracesWithColon')) {
    /**
     * Remove starting and ending braces from string
     * and add a starting colon
     *
     * @param string $str
     * @return string
     */
    function replaceBracesWithColon(string $str): string
    {
        $str = str_replace('}', '', $str);

        return str_replace('{', ':', $str);
    }
}

if (! function_exists('removeBraces')) {
    /**
     * Remove braces from string
     *
     * @param string $str
     * @return string
     */
    function removeBraces(string $str): string
    {
        return str_replace(['{', '}'], '', $str);
    }
}

if (! function_exists('routeNameIsIndex')) {
    /**
     * Check if a route name is index
     *
     * @param string $as Route name to check
     *
     * @return bool
     */
    function routeNameIsIndex(string $as): bool
    {
        return substr($as, strrpos($as, '.')) === '.index';
    }
}
