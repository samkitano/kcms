<?php

namespace App\Kcms\Providers;

use Illuminate\Http\Request;
use Illuminate\Support\ServiceProvider;

/**
 * Class NavServiceProvider
 *
 * @package App\Kcms\Providers
 * @method Request isFront()
 * @method Request isAdmin()
 */
class NavServiceProvider extends ServiceProvider
{
    /**
     * Register Provider
     */
    public function register()
    {
        $this->registerArea();
    }

    /**
     * Register Main Site Areas (Admin and Front)
     */
    protected function registerArea()
    {
        Request::macro('area', function () {
            if (request()->segment(1) === 'admin') {
                return 'admin';
            }

            return 'front';
        });

        Request::macro('isFront', function () {
            return request()->area() === 'front';
        });

        Request::macro('isAdmin', function () {
            return request()->area() === 'admin';
        });
    }
}
