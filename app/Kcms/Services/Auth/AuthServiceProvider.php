<?php

namespace App\Kcms\Services\Auth;

use Illuminate\Contracts\Auth\Access\Gate as GateContract;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /** @var array */
    protected $policies = [];

    /**
     * @param GateContract $gate
     */
    public function boot(GateContract $gate)
    {
        /** @noinspection PhpMethodParametersCountMismatchInspection */
        parent::registerPolicies($gate);
    }

    /** @inheritdoc */
    public function register()
    {
        parent::register();

        auth()->shouldUse(request()->area());
    }
}
