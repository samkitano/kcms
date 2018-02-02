<?php

namespace App\Http\Controllers\Admin;

use App\Kcms\Services\Auth\Administrators\User;

class AdministratorsController extends MembershipController implements NamingContract, MembershipContract
{
    /**
     * Resource menu group
     *
     * @return string
     */
    public static function getMenuGroup(): string
    {
        return __('kcms.menu.members');
    }

    /**
     * Resource menu item
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

    /**
     * @return string
     */
    public function getUserModel(): string
    {
        return User::class;
    }
}
