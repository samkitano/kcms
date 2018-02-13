<?php

namespace App\Http\Controllers\Contracts;

interface NamingContract
{
    /**
     * Return the Menu group for the resource
     *
     * @return string
     */
    public static function getMenuGroup(): string;

    /**
     * Return the resource name to be used as page title.
     *
     * @param bool $singular
     * @return string
     */
    public static function getTitle($singular = false): string;
}
