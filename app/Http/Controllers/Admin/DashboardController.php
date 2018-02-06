<?php

namespace App\Http\Controllers\Admin;

use SensioLabs\Security\SecurityChecker;

/**
 * Class DashboardController
 * @package App\Http\Controllers\Admin
 * @TODO
 */
class DashboardController implements NamingContract
{
    protected $checker;

    public function __construct(SecurityChecker $checker)
    {
        $this->checker = $checker;
    }

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

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\JsonResponse|\Illuminate\View\View
     */
    public function index()
    {
        if (request()->expectsJson()) {
            return response()->json(['html' => '<h1>DASHBOARD</h1><h2>TODO</h2>'], 200);
        }

        $securityCheck = $this->checkPackages();

        return view('admin.dashboard')->with(compact('securityCheck'));
    }

    /**
     * @return array
     */
    protected function checkPackages(): array
    {
        return $this->checker->check(base_path('composer.lock'));
    }
}
