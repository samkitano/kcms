<?php

namespace App\Kcms\ViewComposers;

use Illuminate\Routing\Router;
use App\Kcms\Html\Navigation\Menu;
use Illuminate\Contracts\View\View;
use App\Kcms\Html\Navigation\Breadcrumbs;
use App\Kcms\Facades\JavaScriptFacade as JS;
use App\Kcms\Http\VueRoutes\VueRouteExtractor;

class SharedComposer
{
    /**
     * @var \Illuminate\Routing\Router
     */
    protected $router;

    /** @var \App\Kcms\Services\Auth\Administrators\User */
    protected $admin;

    /** @var bool */
    protected $local;

    /**
     * SharedComposer constructor.
     *
     * @param Router $router
     */
    public function __construct(Router $router)
    {
        $this->router = $router;
        $this->local = app()->environment() === 'local';
        $this->admin = auth()->guard('admin')->user();
    }

    /**
     * Compose the view
     *
     * @param View $view
     * @throws \Exception
     */
    public function compose(View $view)
    {
        config('kcms.vue_admin')
            ? $this->composeJavascript()
            : $this->composePhp($view);
    }

    /**
     * Compose javascript elements for Vue
     */
    protected function composeJavascript()
    {
        $vueRoutes = app(VueRouteExtractor::class)->render();

        JS::inject([
            'vueRoutes' => $vueRoutes,
            'admin' => $this->admin,
            'local' => $this->local,
        ]);
    }

    /**
     * Compose the views for PHP
     *
     * @param View $view
     * @throws \Exception
     */
    protected function composePhp($view)
    {
        $menu = app(Menu::class)->render();
        $breadcrumbs = app(Breadcrumbs::class)->render();

        JS::inject([
            'local' => $this->local,
        ]);

        $view->with('adminUser', $this->admin)
             ->with(compact('menu'))
             ->with(compact('breadcrumbs'));
    }
}
