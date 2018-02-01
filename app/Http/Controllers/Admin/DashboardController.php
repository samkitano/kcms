<?php

namespace App\Http\Controllers\Admin;

/**
 * Class DashboardController
 * @package App\Http\Controllers\Admin
 * @TODO
 */
class DashboardController implements NamingContract
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
        return __('kcms.menu.dashboard');
    }

    public function getUserModel()
    {
    }


    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\JsonResponse|\Illuminate\View\View
     */
    public function index()
    {
        if (request()->expectsJson()) {
            return response()->json(['html' => '<h1>DASHBOARD</h1><h2>TODO</h2>'], 200);
        }

        return view('admin.dashboard');
    }
}
