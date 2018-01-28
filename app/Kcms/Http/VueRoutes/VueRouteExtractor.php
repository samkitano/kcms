<?php

namespace App\Kcms\Http\VueRoutes;

use App\Kcms\Http\RouteExtractor;

class VueRouteExtractor extends RouteExtractor
{
    /**
     * Members container
     *
     * @var array
     */
    protected $members = [
        'administrators',
        'users',
        'subscribers',
    ];

    /** @var array */
    protected $vueRoutes = [];

    /**
     * Exclude this routes from being parsed to Vue
     *
     * @var array
     */
    protected $excluded = [];


    /**
     * Make the routes
     *
     * @return array
     */
    public function vueRoutes()
    {
        foreach ($this->routes->getIterator() as $this->currentRoute) {

            if ($this->rejectRoute()) {
                continue;
            }

            $this->assembleRoute();
        }

        return $this->vueRoutes;
    }

    /**
     * Assemble current route
     */
    protected function assembleRoute()
    {
        $arrayAs = explode('.', $this->currentRoute->action['as']);
        $isNamed = $arrayAs[0] === 'admin';
        $isIndex = $arrayAs[1] === 'index';

        if (! $isIndex && ! $isNamed) {
            return;
        }

        $namespace = $isNamed ? '/' : 'crud';
        $basename = basename($this->currentRoute->uri);

        if (in_array($basename, $this->members)) {
            $namespace = 'members';
        }

        $meta = [
            'namespace' => $namespace,
            'menu' => $this->getMenuGroup(),
            'name' => $this->getResourceTitle(),
            'endpoint' => [
                'url' => $this->getEndpoint(),
                'parameterNames' => $this->getParameters($this->currentRoute->uri)
            ],
        ];

        $this->addVueRoute(
            replaceBracesWithColon(str_replace('/api', '', $this->currentRoute->uri)),
            $isNamed ? ucfirst($arrayAs[1]) : 'Index',
            $meta
        );
    }

    /**
     * Push the assembled route to an array to be returned.
     *
     * @param string $path
     * @param string $component
     * @param array $meta
     */
    protected function addVueRoute(string $path, string $component, array $meta)
    {
        $this->vueRoutes[] = [
            'path' => '/'.$path,
            'component' => $component,
            'meta' => $meta,
        ];
    }

    /**
     * @return string
     */
    protected function getEndpoint(): string
    {
        return replaceBracesWithColon(url($this->currentRoute->uri));
    }

    /**
     * @param $uri
     * @return array
     */
    protected function getParameters($uri)
    {
        $segments = explode('/', $uri);
        $t = [];

        foreach ($segments as $segment) {
            if (startsWithBrace($segment)) {
                $t[] = removeBraces($segment);
            }
        }

        return $t;
    }

    /**
     * @return bool
     */
    protected function rejectRoute(): bool
    {
        // reject pre-determined
        if (in_array($this->currentRoute->uri, $this->excluded)) {
            return true;
        }

        // we are only interested in get methods
        if ($this->getRouteMethod() !== 'GET') {
            return true;
        }

        // reject debugbar as well as other irrelevant routes
        if (startsWithUnderscore($this->currentRoute->uri)) {
            return true;
        }

        // reject home route and non aliased routes
        if (! isset($this->currentRoute->action['as'])) {
            return true;
        }

        // reject off-namespace
        if ($this->currentRoute->action['namespace'] !== 'App\Http\Controllers\Admin') {
            return true;
        }

        // just in case
        if ($this->currentRoute->action['prefix'] !== 'admin/api') {
            return true;
        }

        return false;
    }
}
