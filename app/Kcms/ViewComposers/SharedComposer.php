<?php

namespace App\Kcms\ViewComposers;

use JavaScript;
use Illuminate\Routing\Router;
use App\Kcms\Html\Navigation\Menu;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\File;
use App\Kcms\Http\VueRoutes\VueRouteExtractor;

class SharedComposer
{
    /**
     * @var \Illuminate\Routing\Router
     */
    protected $router;

    /** @var \App\Kcms\Services\Auth\Admin\User */
    protected $admin;

    /** @var array */
    protected $translations;

    /** @var bool */
    protected $local;

    /**
     * SharedComposer constructor.
     * @param Router $router
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     */
    public function __construct(Router $router)
    {
        $langFile = 'lang'.DIRECTORY_SEPARATOR.app()->getLocale().DIRECTORY_SEPARATOR.'kcms.php';

        $this->translations = File::getRequire(resource_path($langFile));
        $this->admin = auth()->guard('admin')->user();
        $this->router = $router;
        $this->local = app()->environment() === 'local';
    }

    /**
     * Compose the view
     *
     * @param View $view
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
        $assembler = new VueRouteExtractor($this->router);
        $vueRoutes = $assembler->vueRoutes();

        /** @noinspection PhpMethodParametersCountMismatchInspection */
        JavaScript::put([
            'vueRoutes' => $vueRoutes,
            'admin' => $this->admin,
            'translations' => $this->translations,
            'local' => $this->local,
        ]);
    }

    /**
     * Compose the views for PHP
     *
     * @param View $view
     */
    protected function composePhp($view)
    {
        $menus = new Menu($this->router);
        $menu = $menus->getMenu();

        /** @noinspection PhpMethodParametersCountMismatchInspection */
        JavaScript::put([
            'translations' => $this->translations, // we will need the translations for jQuery as well
            'local' => $this->local,
        ]);

        $view->with('adminUser', $this->admin)
             ->with(compact('menu'));
    }
}
