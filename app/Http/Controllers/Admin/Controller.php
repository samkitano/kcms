<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Foundation\Validation\ValidatesRequests;

abstract class Controller
{
    use ValidatesRequests;

    /** @var string */
    protected $moduleName;

    /** @var bool */
    protected $redirectToIndex = false;

    /**
     * Controller constructor.
     */
    public function __construct()
    {
        $this->moduleName = $this->moduleName();
    }

    /**
     * @return string
     */
    protected function moduleName(): string
    {
        return lcfirst(str_replace_last('Controller', '', class_basename($this)));
    }
}
