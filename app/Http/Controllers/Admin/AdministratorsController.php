<?php

namespace App\Http\Controllers\Admin;

use App\Kcms\Services\Auth\Administrators\User;
use App\Http\Controllers\Contracts\NamingContract;

class AdministratorsController extends MembershipController implements NamingContract
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
            ? __t('menu.administrator')
            : __t('menu.administrators');
    }

    /** @inheritdoc */
    public function getUserModel(): string
    {
        return User::class;
    }
}
