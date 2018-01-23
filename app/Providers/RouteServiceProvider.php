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
                            if (env('VUE_ADMIN')) {
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
                    if (env('ALLOW_FRONT_LOGIN')) {
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

                    if (env('ALLOW_FRONT_REGISTER')) {
                        Route::get('register', 'Auth\RegisterController@showRegistrationForm')
                            ->name('front.register');
                        Route::post('register', 'Auth\RegisterController@register');
                    }
//                    Route::prefix('api')
//                        ->middleware('api')
//                        ->namespace('Api')
//                        ->group(function () {
//                            require base_path('routes/frontApi.php');
//                        });

                    Route::middleware(['web',/* 'demoMode', 'rememberLocale'*/])->group(function () {
//                        $multiLingual = count(config('app.locales')) > 1;
//
//                        Route::group($multiLingual ? ['prefix' => locale()] : [], function () {
//                            try {
//                                Auth::routes();
                                /** @noinspection PhpIncludeInspection */
                                require base_path('routes/front.php');
//                            } catch (Exception $exception) {
//                                logger()->warning("Front routes weren't included because {$exception->getMessage()}.");
//                            }
                        });
//
//                        if ($multiLingual) {
//                            Route::get('/', function () {
//                                return redirect(locale());
//                            });
//                        }
//
//                        Route::fallback('NotFoundController');
//                    });
                });
        });
    }

    /**
     * Define the "web" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     *
     * @return void
     */
    protected function mapWebRoutes()
    {
        Route::middleware('web')
             ->namespace($this->namespace)
             ->group(base_path('routes/web.php'));
    }

    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @return void
     */
    protected function mapApiRoutes()
    {
        Route::prefix('api')
             ->middleware('api')
             ->namespace($this->namespace)
             ->group(base_path('routes/api.php'));
    }

    protected function mapAdminRoutes()
    {
        Route::prefix('admin')
            ->middleware('web')
            ->namespace($this->namespace.'\Admin')
            ->group(function () {
                Route::get('login', 'Auth\LoginController@showLoginForm')
                    ->name('admin.login');
                Route::post('login', 'Auth\LoginController@login');

                Route::post('logout', 'Auth\LoginController@logout')
                    ->name('admin.logout');

                Route::get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm')
                    ->name('admin.forgot');
                Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')
                    ->name('admin.send-link');

                Route::get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm');
                Route::post('password/reset', 'Auth\ResetPasswordController@reset');

                Route::middleware('auth')
                    ->group(function () {
                        /** @noinspection PhpIncludeInspection */
                        require base_path('routes/admin.php');
                    });

                Route::fallback('NotFoundController');
            });
    }
}
