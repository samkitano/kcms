<?php

namespace App\Kcms\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * Class JavaScriptFacade
 * @package App\Kcms\Facades
 * @method static inject($var)
 */
class JavaScriptFacade extends Facade
{
    /**
     * The name of the binding in the IoC container.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'JavaScript';
    }
}
