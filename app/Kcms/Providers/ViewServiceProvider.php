<?php

namespace App\Kcms\Providers;

use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;
use App\Kcms\ViewComposers\SharedComposer;
use App\Kcms\ViewComposers\AuthNavComposer;

class ViewServiceProvider extends ServiceProvider
{
    /**
     * Boot the service
     */
    public function boot()
    {
        $this->addComposer('admin/*', SharedComposer::class);
        $this->addComposer('admin/*', AuthNavComposer::class);
    }

    /**
     * Add composers to service
     *
     * @param $views
     * @param $callback
     */
    protected function addComposer($views, $callback)
    {
        View::composer($views, $callback);
    }
}
