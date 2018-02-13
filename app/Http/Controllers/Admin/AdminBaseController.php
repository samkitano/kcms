<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

abstract class AdminBaseController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /** @var \Illuminate\Database\Eloquent\Model */
    protected $model;

    /** @var string */
    protected $module;

    /** @var bool */
    protected $redirectToIndex = false;

    /**
     * Get the proper member model class
     *
     * @return string
     */
    public abstract function getModelClass();

    /**
     * Controller constructor.
     */
    public function __construct()
    {
        $this->module = $this->module();
        $this->model = $this->model();
    }

    /**
     * @return string
     */
    protected function module(): string
    {
        return lcfirst(str_replace_last('Controller', '', class_basename($this)));
    }

    /**
     * Return current model namespace
     *
     * @return string
     */
    protected function model(): string
    {
        return $this->getModelClass();
    }
}
