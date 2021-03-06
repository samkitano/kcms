<?php

use Carbon\Carbon;
use App\Kcms\Exceptions\InvalidTimeStringException;

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

if (! function_exists('__user')) {
    /**
     * Currently authenticated user
     *
     * @return \App\Kcms\Services\Auth\Administrators\User|\App\Kcms\Services\Auth\Users\User|null
     * @throws \App\Kcms\Services\Auth\Users\Exceptions\UndeterminedUserException
     */
    function __user()
    {
        if (request()->isFront()) {
            return auth()->guard('front')->user();
        }

        if (request()->isAdmin()) {
            return auth()->guard('admin')->user();
        }

        throw new \App\Kcms\Services\Auth\Users\Exceptions\UndeterminedUserException('Could not determine current user');
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

if (! function_exists('superAdmin')) {
    /**
     * Check if current admin is super user
     *
     * @return bool
     */
    function superAdmin(): bool
    {
        return (bool) auth('admin')->user()->super_admin;
    }
}

if (! function_exists('strToSeconds')) {
    /**
     * Convert a string to seconds.
     * I.e: '1 minute' resolves to 60
     *
     * @param $str String to Convert
     *
     * @return int
     * @throws InvalidTimeStringException
     */
    function strToSeconds($str): int
    {
        if (($timestamp = strtotime($str)) === false) {
            throw new InvalidTimeStringException("The string ($str) is invalid");
        }

        return strtotime($str, 0);
    }
}


if (! function_exists('cache_path')) {
    /**
     * Returns path to cache directory
     *
     * @return string
     */
    function cache_path(): string
    {
        return storage_path('cache');
    }
}

if (! function_exists('lang_path')) {
    /**
     * Returns path to cache directory
     *
     * @return string
     */
    function lang_path(): string
    {
        return resource_path('lang');
    }
}

if (! function_exists('__t')) {
    /**
     * KCMS' own translation helper function
     *
     * @param string      $key
     * @param array       $replace
     * @param null|string $locale
     *
     * @return string
     */
    function __t(string $key, $replace = [], $locale = null): string
    {
        return app('translator')->getFromJson('kcms/' . $key, $replace, $locale);
    }
}

if (! function_exists('humanFileSize')) {
    /**
     * Human readable file sizes
     *
     * @param int $sizeInBytes
     *
     * @return string
     */
    function humanFileSize(int $sizeInBytes): string
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];

        if ($sizeInBytes == 0) {
            return '0 ' . $units[1];
        }

        for ($i = 0; $sizeInBytes > 1024; $i++) {
            $sizeInBytes /= 1024;
        }

        return round($sizeInBytes, 2) . ' ' . $units[$i];
    }
}

if (! function_exists('media_path')) {
    /**
     * Path to media files
     *
     * @param string $path
     * @return string
     */
    function media_path($path = ''): string
    {
        return public_path('media')
            .($path ? DIRECTORY_SEPARATOR.ltrim($path, DIRECTORY_SEPARATOR) : $path);
    }
}
