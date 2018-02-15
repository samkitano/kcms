<?php

namespace App\Providers;

use App\Article;
use Illuminate\Support\Facades\Blade;
use App\Kcms\Observers\ArticleObserver;
use Illuminate\Support\ServiceProvider;
use App\Kcms\Services\JavaScript\TranslateToJson;
use Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        if (! file_exists(public_path('i18n/kcms.i18n.json'))) {
            TranslateToJson::writeFiles();
        }

        Article::observe(ArticleObserver::class);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        if ($this->app->environment() !== 'production') {
            $this->app->register(IdeHelperServiceProvider::class);
            $this->app->register(DuskServiceProvider::class);
        }
    }
}
