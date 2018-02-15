<?php

namespace App\Http\Controllers\Admin;

use App\Kcms\Services\Auth\Users\User;
use App\Http\Controllers\Contracts\NamingContract;

class UsersController extends MembershipController implements NamingContract
{
    /** @inheritdoc */
    public static function getMenuGroup(): string
    {
        return __t('menu.members');
    }

    /** @inheritdoc */
    public static function getTitle($singular = false): string
    {
        return $singular
            ? __t('menu.user')
            : __t('menu.users');
    }

    /** @inheritdoc */
    public function getUserModel(): string
    {
        return User::class;
    }
}
