<?php

namespace App\Http\Controllers\Admin;

use App\Kcms\Services\Auth\Users\User;
use App\Http\Controllers\Contracts\NamingContract;

class UsersController extends MembershipController implements NamingContract
{
    /** @inheritdoc */
    public static function getMenuGroup(): string
    {
        return __('kcms.menu.members');
    }

    /** @inheritdoc */
    public static function getTitle($singular = false): string
    {
        return $singular
            ? __('kcms.menu.user')
            : __('kcms.menu.users');
    }

    /** @inheritdoc */
    public function getUserModel(): string
    {
        return User::class;
    }
}
