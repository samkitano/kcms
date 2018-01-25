<?php

namespace App\Http\Controllers\Admin;

use App\Kcms\Cache\Cacheable;
use Illuminate\Validation\Rule;
use Illuminate\Support\Collection;
use App\Kcms\Transformers\UsersTransformer;
use App\Kcms\Services\Auth\Admin\User as Admin;
use App\Kcms\Html\Presenters\Users as Presenter;
use Illuminate\Database\Eloquent\Model as Eloquent;
use Illuminate\Foundation\Validation\ValidatesRequests;

abstract class MembershipController
{
    use ValidatesRequests, Cacheable;

    /** @var string */
    protected $editable;
    protected $modelClass;
    protected $modelName;
    protected $moduleName;
    protected $presentable;
    protected $resource;
    protected $transformer;
    protected $translatedMenuGroup;
    protected $translatedModelName;

    public function __construct(UsersTransformer $transformer)
    {
        $this->translatedMenuGroup = __('kcms.menu.members');
        $this->moduleName = $this->moduleName();
        $this->translatedModelName = __("kcms.menu.{$this->moduleName}");
        $this->presentable = call_user_func($this->modelClass.'::presentable');
        $this->transformer = $transformer;
    }

    public function index()
    {
        $data = [
            'items' => $this->transformer->transform(
                $this->all(),
                array_keys($this->presentable)
            ),
            'fields' => $this->presentable,
        ];

        return $this->respond($data, __FUNCTION__);
    }

    public function create()
    {
        $data = [
            'input' => call_user_func($this->modelClass.'::editable'),
        ];

        return $this->respond($data, __FUNCTION__);
    }

    public function edit(int $id)
    {
        $data = [
            'profile' => Presenter::userProfile($this->find($id)),
            'input' => $this->fillEditableAttributes($id),
            'id' => $id,
        ];

        return $this->respond($data, __FUNCTION__);
    }

    public function store()
    {
        $this->validate(request(), $this->validationRules());

        //$admin = Admin::create(request()->all());
        $entity = call_user_func([$this->modelClass, 'create'], request()->all());

//        if ($entity instanceof Admin) {
//            event(new AdminCreated($entity));
//        } else {
//
//        }


        if (request()->expectsJson()) {
            return response()->json($entity);
        }

        return redirect("admin/{$this->resource}");
    }

    protected function all(): Collection
    {
        return call_user_func([$this->modelClass, 'all']);
    }

    protected function find(int $id): Eloquent
    {
        return call_user_func([$this->modelClass, 'where'], 'id', $id)
            ->firstOrFail();
    }
    // TODO
    protected function fillEditableAttributes(/*$user*/$id): array
    {
//        $entity = $this->find($id);
//        $editable = call_user_func()
//        if ($user instanceof Admin) {
//            $admin = $user;
//            $editable = Admin::editable($admin->id);
//        } else {
//            $admin = Admin::findOrFail($user);
//            $editable = Admin::editable($user);
//        }
//
//        foreach ($editable as $attr => $spec) {
//            if ($attr === 'password' || $attr === 'password_confirmation') {
//                continue;
//            }
//
//            $editable[$attr]['value'] = $admin->$attr;
//        }
//
//        return $editable;
    }

    protected function respond($data, $crudMethod)
    {
        $data = array_merge($data, ['resource' => $this->moduleName]);

        if (request()->expectsJson()) {
            return response()->json($data, 200);
        }

        return view("admin.members.{$crudMethod}", $data );
    }

    protected function moduleName(): string
    {
        return lcfirst(str_replace_last('Controller', '', class_basename($this)));
    }

    /**
     * Get validation rules for creation
     *
     * @return array
     */
    protected function validationRules(): array
    {
        return [
            'email' => $this->getEmailValidationRule(),
            'first_name' => 'required|max:50',
            'last_name' => 'required|max:50',
            'password' => 'confirmed|min:8|max:150',
            'role' => 'required|max:15'
        ];
    }

    /**
     * Determine validation rule for email attribute
     *
     * @return string
     */
    protected function getEmailValidationRule(): string
    {
        $uniqueRule = Rule::unique('admins', 'email');

        if ($this->requestIsUpdate()) {
            $userId = request()->route('administrator');

            $uniqueRule = $uniqueRule->ignore($userId);
        }

        return "required|email|{$uniqueRule}";
    }

    /**
     * Check if request method is update
     *
     * @return bool
     */
    protected function requestIsUpdate(): bool
    {
        return request()->method() === 'PATCH' || request()->method() === 'PUT';
    }

}
