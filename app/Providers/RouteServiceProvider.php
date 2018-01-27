<?php

namespace App\Providers;

use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * This namespace is applied to your controller routes.
     *
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */
    protected $namespace = 'App\Http\Controllers';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerSections(app(Router::class));

        parent::boot();
    }

    /**
     * @param Router $router
     */
    protected function registerSections(Router $router)
    {
        $router->macro('module', function ($module, $menu=null) use ($router) {
            $router->resource($module, ucfirst($module).'Controller')->middleware($menu);
        });
    }

    /**
     * Define the routes for the application.
     *
     * @return void
     */
    public function map()
    {
        Route::namespace($this->namespace)->group(function () {
            // ADMIN
            Route::prefix('admin')
                 ->middleware('web')
                 ->namespace('Admin')
                 ->group(function () {
                     Route::get('login', 'Auth\LoginController@showLoginForm')
                          ->name('admin.login');
                     Route::post('login', 'Auth\LoginController@login');

                     Route::post('logout', 'Auth\LoginController@logout')
                          ->name('admin.logout');

                     Route::get('password/forgotten', 'Auth\ForgotPasswordController@showLinkRequestForm')
                          ->name('admin.forgot');
                     Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')
                          ->name('admin.send-link');

                     Route::get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')
                          ->name('admin.getreset');
                     Route::post('password/reset', 'Auth\ResetPasswordController@reset')
                          ->name('admin.reset');

                     Route::middleware('auth')
                          ->group(function () {
                              if (config('kcms.vue_admin')) {
                                  Route::prefix('api')
                                       ->middleware('api')
                                       ->group(function () {
                                           /** @noinspection PhpIncludeInspection */
                                           require base_path('routes/admin.php');
                                       });

                                  Route::any('{all}', function () {
                                      return view('admin.home');
                                  })->where(['all' => '.*']);
                             }

                             /** @noinspection PhpIncludeInspection */
                             require base_path('routes/admin.php');
                         });

                     Route::fallback('NotFoundController');
            });

            // FRONT
            Route::namespace('Front')
                 ->middleware('web')
                 ->group(function () {
                     if (config('kcms.allow_front_login')) {
                         Route::get('login', 'Auth\LoginController@showLoginForm')
                              ->name('front.login');
                         Route::post('login', 'Auth\LoginController@login');

                         Route::post('logout', 'Auth\LoginController@logout')
                              ->name('front.logout');

                         Route::get('password/forgotten', 'Auth\ForgotPasswordController@showLinkRequestForm')
                              ->name('front.forgot');
                         Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')
                              ->name('front.send-link');

                         Route::get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')
                              ->name('front.getreset');
                         Route::post('password/reset', 'Auth\ResetPasswordController@reset')
                              ->name('front.reset');
                     }

                     if (config('kcms.allow_front_register')) {
                         Route::get('register', 'Auth\RegisterController@showRegistrationForm')
                              ->name('front.register');
                         Route::post('register', 'Auth\RegisterController@register');

                         if (config('kcms.user_verification')) {
                             Route::get('verify', 'Auth\RegisterController@verify')
                                  ->name('front.verify');
                         }
                     }

                     Route::middleware(['web',])->group(function () {
                         /** @noinspection PhpIncludeInspection */
                         require base_path('routes/front.php');
                     });
            });
        });
    }
}
