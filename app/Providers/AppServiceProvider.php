<?php

namespace App\Providers;

use App\Media;
use Illuminate\Support\Facades\Blade;
use App\Kcms\Observers\MediaObserver;
use Illuminate\Support\ServiceProvider;
use App\Kcms\Services\JavaScript\TranslateToJavaScript;
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
        if (! file_exists(resource_path('assets/js/admin/laravelTranslations.js'))) {
            TranslateToJavaScript::writeFiles();
        }

        Media::observe(MediaObserver::class);

        Blade::directive('varDump', function ($expression) {
            return "<?php var_dump({$expression}); ?>";
        });
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
