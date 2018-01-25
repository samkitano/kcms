<?php

namespace App\Http\Controllers\Admin;

class SettingsController implements NamingContract
{
    /**
     * @return string
     */
    public static function getMenuGroup(): string
    {
        return __('kcms.menu.system');
    }

    /**
     * @param bool $singular
     * @return string
     */
    public static function getTitle($singular = false): string
    {
        return __('kcms.menu.settings');
    }


    public function index()
    {
        return view('admin.settings');
    }

    /**
     * Clear application cache
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function clearCache()
    {
        cache()->flush();

        return response()->json('OK', 200);
    }
}
