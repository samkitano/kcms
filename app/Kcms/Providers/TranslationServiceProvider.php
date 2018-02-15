<?php

namespace App\Kcms\Providers;

use App\Kcms\Yaml\Translations;
use Illuminate\Translation\TranslationServiceProvider as BaseProvider;

class TranslationServiceProvider extends BaseProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function registerLoader()
    {
        $this->app->singleton('translation.loader', function ($app) {
            return new Translations($app[ 'files' ], $app[ 'path.lang' ]);
        });
    }
}
