<?php

namespace App\Http\Controllers\Admin;

class SettingsController
{
    /**
     * @return string
     */
    public static function getMenu(): string
    {
        return __('kcms.menu.system');
    }

    /**
     * @return string
     */
    public static function getName(): string
    {
        return __('kcms.menu.settings');
    }

    public function index ()
    {
        return view('admin.settings');
    }
}
