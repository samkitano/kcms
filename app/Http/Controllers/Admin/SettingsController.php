<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Contracts\NamingContract;

class SettingsController extends Controller implements NamingContract
{
    /** @inheritdoc */
    public static function getMenuGroup(): string
    {
        return __('kcms.menu.system');
    }

    /** @inheritdoc */
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
