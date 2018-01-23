<?php

namespace App\Http\Controllers\Admin;

/**
 * Class DashboardController
 * @package App\Http\Controllers\Admin
 * @TODO
 */
class DashboardController
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
        return __('kcms.menu.dashboard');
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
