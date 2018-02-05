<?php

namespace App\Kcms\Html\Navigation;

use Illuminate\Routing\Router;
use App\Kcms\Html\ElementGenerator\Tag;

class Breadcrumbs
{
    /** @var \Illuminate\Routing\Route */
    protected $current;

    /** @var array */
    protected $params;


    /**
     * Breadcrumbs constructor.
     *
     * @param Router $router
     */
    public function __construct(Router $router)
    {
        $this->current = $router->current();
        $this->params = $router->current()->parameters;
    }

    /**
     * Render the breadcrumbs
     *
     * @return string
     */
    public function render(): string
    {
        $breadcrumbs = '';
        $segs = explode('/', $this->current->uri);
        $base = array_shift($segs);
        $i = 0;

        while ($i < sizeof($segs)) {
            $breadcrumbs .= $this->addBreadcrumb($segs, $i, $base);

            $i++;
        }

        return $breadcrumbs;
    }

    /**
     * Add a breadcrumb to html string
     *
     * @param array  $segs
     * @param int    $i
     * @param string $base
     *
     * @return string
     */
    protected function addBreadcrumb($segs, int $i, string $base): string
    {
        $current = $this->getCurrentSegment($segs[$i]);
        $content =__("kcms.breadcrumbs.{$current}");

        if ($content === 'kcms.breadcrumbs.fallbackPlaceholder') {
            $content = 'Oh boy...';
        }

        if ($i === sizeof($segs) - 1) {
            return Tag::span(['class' => 'breadcrumb-active'], $content);
        }

        if ($current !== $segs[$i]) {
            return Tag::span(['class' => 'breadcrumb-id'], $this->params[$current]);
        }

        $sliced = array_slice($segs, 0, $i);
        $path = count($sliced)
            ? $base . '/' . implode('/', $sliced)
            : $base . '/' . $current;
        $url = url($path);

        return Tag::a(
            [
                'class' => 'breadcrumb',
                'title'  => __('kcms.breadcrumbs.goto').$content,
                'href' => $url
            ],
            $content
        );
    }

    /**
     * Return current segment, even if it is a parameter
     *
     * @param string $seg
     *
     * @return string
     */
    protected function getCurrentSegment(string $seg): string
    {
        if ($seg[0] === '{') {
            return str_replace(['}', '{'], '', $seg);
        }

        return $seg;
    }
}
