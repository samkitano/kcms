<?php

namespace App\Http\Controllers\Admin;

use App\Kcms\Services\Auth\Users\User;

class UsersController extends MembershipController implements NamingContract, MembershipContract
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
            ? __('kcms.menu.user')
            : __('kcms.menu.users');
    }

    /**
     * @return string
     */
    public function getUserModel(): string
    {
        return User::class;
    }
}
