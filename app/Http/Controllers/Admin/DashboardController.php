<?php

namespace App\Http\Controllers\Admin;

use App\Kcms\Cache\Cacheable;
use SensioLabs\Security\SecurityChecker;
use App\Http\Controllers\Contracts\NamingContract;

/**
 * Class DashboardController
 * @package App\Http\Controllers\Admin
 * @TODO
 */
class DashboardController implements NamingContract
{
    use Cacheable;

    /** @var SecurityChecker */
    protected $checker;

    /**
     * DashboardController constructor.
     * @param SecurityChecker $checker
     */
    public function __construct(SecurityChecker $checker)
    {
        $this->checker = $checker;
    }

    /** @inheritdoc */
    public static function getMenuGroup(): string
    {
        return __('kcms.menu.system');
    }

    /** @inheritdoc */
    public static function getTitle($singular = false): string
    {
        return __('kcms.menu.dashboard');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\JsonResponse|\Illuminate\View\View
     * @throws \Exception
     */
    public function index()
    {
        if (request()->expectsJson()) {
            return response()->json(['html' => '<h1>DASHBOARD</h1><h2>TODO</h2>'], 200);
        }

        $securityCheck = $this->sensiolabsSecurityCheck();

        return view('admin.dashboard')->with(compact('securityCheck'));
    }

    /**
     * Security check results.
     *
     * The results will be cached permanently, until
     * a composer update is performed.
     *
     * @return array
     * @throws \Exception
     */
    protected function sensiolabsSecurityCheck(): array
    {
        return $this->remember(__FUNCTION__, 'check', function () {
            return $this->checker->check(base_path('composer.lock'));
        });
    }
}
