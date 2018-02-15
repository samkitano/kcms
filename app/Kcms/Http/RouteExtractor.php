<?php

namespace App\Kcms\Http;

use Illuminate\Routing\Router;

class RouteExtractor
{
    /** @var Router */
    protected $router;

    /** @var \Illuminate\Routing\Route */
    protected $currentRoute;

    /** @var \Illuminate\Routing\RouteCollection */
    protected $routes;


    /**
     * RouteExtractor constructor.
     *
     * @param Router $router
     */
    public function __construct(Router $router)
    {
        $this->router = $router;
        $this->routes = $router->getRoutes();
    }

    /**
     * Get the name to be presented in the Vue menu.
     * The name is determined in the controller.
     *
     * @return string
     */
    protected function getResourceTitle(): string
    {
        $name = '';
        $controller = $this->getController();
        $methods = $this->getControllerMethods($controller);

        if (in_array('getTitle', $methods)) {
            $name = call_user_func($controller.'::getTitle');
        }

        return $name;
    }

    /**
     * Get the current route's controller
     *
     * @return string
     */
    protected function getController(): string
    {
        return substr(
            $this->currentRoute->action['controller'],
            0,
            strpos($this->currentRoute->action['controller'], '@')
        );
    }

    /**
     * Get the controller methods from the current route
     *
     * @param string $controller The name of the controller
     *
     * @return array
     */
    protected function getControllerMethods( string $controller): array
    {
        return get_class_methods($controller);
    }

    /**
     * Get the current route method
     *
     * @return string
     */
    protected function getRouteMethod(): string
    {
        $method = $this->currentRoute->methods[0];

        if ($method === 'HEAD') {
            $method = 'GET';
        }

        return $method;
    }

    /**
     * Get the menu group name for the current route.
     * The group is determined by the controller.
     *
     * @return string
     */
    protected function getMenuGroup(): string
    {
        $controller = $this->getController();
        $methods = $this->getControllerMethods($controller);
        $menu = '';

        if (in_array('getMenuGroup', $methods)) {
            $menu = call_user_func($controller.'::getMenuGroup');
        }

        return $menu;
    }
}
