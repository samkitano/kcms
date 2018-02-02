<?php

namespace App\Http\Controllers\Admin;

//use ReflectionClass;
//use Illuminate\Http\Request;
//use Illuminate\Support\Collection;
//use Illuminate\Support\Facades\Cache;
//use App\Models\Scopes\NonDraftScope;
//use Illuminate\Database\Eloquent\Model as Eloquent;
use Illuminate\Foundation\Validation\ValidatesRequests;

/**
 * Class Controller
 * @package App\Http\Controllers\Admin
 * @TODO: cleanup
 */
abstract class Controller
{
    use ValidatesRequests;

    /** @var string */
    protected $moduleName;
//    protected $modelClass;
//    protected $modelName;

    /** @var bool */
    protected $redirectToIndex = false;

    public function __construct()
    {
        $this->moduleName = $this->moduleName();
//        $this->modelClass = $this->modelClass();
//        $this->modelName = __("admin.models.{$this->moduleName}");
    }

//    public function index()
//    {
//        $models = $this->all();
//
//        return view("admin.{$this->moduleName}.index", compact('models'));
//    }
//
//    protected function all(): Collection
//    {
//        return call_user_func([$this->modelClass, 'all']);
//    }
//
//    protected function modelClass(): string
//    {
//        return (new ReflectionClass($this))
//            ->getMethod('make')
//            ->getReturnType();
//    }

    protected function moduleName(): string
    {
        return lcfirst(str_replace_last('Controller', '', class_basename($this)));
    }
}
