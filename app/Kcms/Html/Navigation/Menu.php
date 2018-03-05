<?php

namespace App\Kcms\Html\Navigation;

use App\Kcms\Http\RouteExtractor;
use App\Kcms\Html\ElementGenerator\Tag;

class Menu extends RouteExtractor
{
    /**
     * Exclude this routes from being parsed to Menu
     *
     * @var array
     */
    protected $excluded = [
        'admin/login',
        'admin/password/forgotten',
        'admin/password/reset/{token}',
    ];


    /**
     * Render the main menu for admin area
     *
     * @return Tag
     */
    public function render(): Tag
    {
        return Tag::nav(['class' => 'menu'], $this->content());
    }

    /**
     * Build the main menu
     *
     * @return Tag
     */
    protected function content(): Tag
    {
        $liGroups = '';

        foreach ($this->getMenuArray() as $menu => $menuItem) {
            $span = Tag::span(['class' => 'uppercase font-bold'], $menu);
            $ul = Tag::ul(['class' => 'mt-1'], $this->getLisForItem($menuItem));
            $liGroups .= Tag::li(['class' => 'menu-group'], $span.$ul);
        }

        return Tag::ul(['class' => 'menu-wrap'], $liGroups);
    }

    /**
     * Organize all needed menu groups and items in an associative array
     *
     * @return array
     */
    protected function getMenuArray(): array
    {
        $menu = [];

        foreach ($this->routes->getIterator() as $this->currentRoute) {
            if ($this->rejectRoute()) {
                continue;
            }

            $menu[$this->getMenuGroup()][] = $this->addMenuItem();
        }

        return $menu;
    }

    /**
     * Adds an item to the menu array
     *
     * @return array
     */
    protected function addMenuItem(): array
    {
        return [
            'name' => $this->getResourceTitle(),
            'uri' => '/'.$this->currentRoute->uri,
            'active' => $this->router->current() === $this->currentRoute
        ];
    }

    /**
     * Reject unwanted routes
     *
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

        // accept only indexes
        if (! routeNameIsIndex($this->currentRoute->action['as'])) {
            return true;
        }

        return false;
    }

    /**
     * @param array $menuItem
     *
     * @return string
     */
    protected function getLisForItem(array $menuItem): string
    {
        $li = '';

        foreach ($menuItem as $item) {
            $menu = strtolower($item['name']);
            $active = $item['active'] ? ' router-link-active' : '';
            $a = Tag::a(['class' => "menu-{$menu} menu-link{$active}", 'href' => $item['uri']], $item['name']);
            $li .= Tag::li(['class' => 'text-kcms'], $a);
        }

        return $li;
    }
}
