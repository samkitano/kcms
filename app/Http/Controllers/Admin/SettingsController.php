<?php

namespace App\Http\Controllers\Admin;

class SettingsController
{
    /**
     * @return string
     */
    public static function getMenuGroup(): string
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
