<?php

namespace App\Http\Controllers\Admin;

use App\Kcms\Services\Auth\Administrators\User;

class AdministratorsController extends MembershipController implements NamingContract, MembershipContract
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
            ? __('kcms.menu.administrator')
            : __('kcms.menu.administrators');
    }

    /** @inheritdoc */
    public function getUserModel(): string
    {
        return User::class;
    }
}
