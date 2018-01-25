<?php

namespace App\Kcms\Providers;

use Illuminate\Support\{
    Facades\View, ServiceProvider
};
use App\Kcms\ViewComposers\{
    SharedComposer, AuthNavComposer
};

class ViewServiceProvider extends ServiceProvider
{
    /**
     * Boot the service
     */
    public function boot()
    {
        $authViews = [
            'auth/*',
            'admin/*',
        ];

        $this->addComposer('admin/*', SharedComposer::class);
        $this->addComposer($authViews, AuthNavComposer::class);
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
