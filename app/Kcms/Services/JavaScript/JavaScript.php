<?php

namespace App\Kcms\Services\JavaScript;

use stdClass;
use JsonSerializable;

class JavaScript
{
    /** @var string */
    protected $namespace = 'kitano';

    /** @var ViewBinder */
    protected $viewBinder;

    /**
     * Create a new JavaScript instance.
     *
     * @param ViewBinder $viewBinder
     */
    public function __construct(ViewBinder $viewBinder)
    {
        $this->viewBinder = $viewBinder;
    }

    /**
     * Inject converted array into the given view
     *
     * @param array $arr
     *
     * @return string
     */
    public function inject(array $arr): string
    {
        $javascript = $this->buildJs($arr);

        $this->viewBinder->bind($javascript);

        return $javascript;
    }

    /**
     * Builds the JS string
     *
     * @param array $items
     *
     * @return string
     */
    protected function buildJs(array $items): string
    {
        $js = "window.{$this->namespace} = window.{$this->namespace} || {};";

        foreach ($items as $key => $val) {
            $js .= "{$this->namespace}.{$key} = {$this->convert($val)};";
        }

        return $js;
    }

    /**
     * Convert the value to JS
     *
     * @param mixed $value
     *
     * @return string
     */
    protected function convert($value): string
    {
        if (is_array($value)) {
            return json_encode($value);
        }

        if (is_bool($value)) {
            return $value ? 'true' : 'false';
        }

        if (is_null($value)) {
            return 'null';
        }

        if (is_string($value)) {
            return "'{$this->escape($value)}'";
        }

        if (is_numeric($value)) {
            return $value;
        }

        if (is_object($value)) {
            if ($value instanceof JsonSerializable || $value instanceof StdClass) {
                return json_encode($value);
            }

            if (method_exists($value, 'toJson')) {
                return $value;
            }

            return "'{$value}'";
        }

        return '';
    }

    /**
     * Escape strings
     *
     * @param string $value
     *
     * @return string
     */
    protected function escape(string $value): string
    {
        return str_replace(["\\", "'", "\n"], ["\\\\", "\'", "\\n"], $value);
    }
}
