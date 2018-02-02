<?php

namespace App\Kcms\Providers;

use Illuminate\Foundation\AliasLoader;
use Illuminate\Support\ServiceProvider;
use App\Kcms\Services\JavaScript\JavaScript;
use App\Kcms\Services\JavaScript\ViewBinder;

class JavaScriptServiceProvider extends ServiceProvider
{
    /**
     * Register the JavaScript Provider
     */
    public function register()
    {
        $this->app->singleton('JavaScript', function ($app) {
            return new JavaScript(new ViewBinder($app['events']));
        });
    }

    /**
     * Load JavaScript Alias
     */
    public function boot()
    {
        if (class_exists('Illuminate\Foundation\AliasLoader')) {
            AliasLoader::getInstance()->alias(
                'JS',
                'App\Kcms\Facades\JavaScriptFacade'
            );
        } else {
            class_alias('App\Kcms\Facades\JavaScriptFacade', 'JS');
        }
    }
}
