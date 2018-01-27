<?php

namespace App\Http\Controllers\Admin;

class AdministratorsController extends MembershipController implements NamingContract
{
    /**
     * Current menu group
     *
     * @return string
     */
    public static function getMenuGroup(): string
    {
        return __('kcms.menu.members');
    }

    /**
     * Current menu item
     *
     * @param bool $singular
     *
     * @return string
     */
    public static function getTitle($singular = false): string
    {
        return $singular
            ? __('kcms.menu.administrator')
            : __('kcms.menu.administrators');
    }
}
