<?php

namespace App\Http\Controllers\Admin;

use App\Kcms\Cache\Cacheable;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model as Eloquent;
use Illuminate\Foundation\Validation\ValidatesRequests;

abstract class ContentController extends AdminBaseController
{
    use ValidatesRequests, Cacheable;

    /**
     * Get the current content model
     *
     * @return string
     */
    public abstract function getContentModel(): string;


    /**
     * Get the proper member model class
     *
     * @return string
     */
    public function getModelClass()
    {
        return $this->getContentModel();
    }

    /**
     * @return \Illuminate\Http\RedirectResponse
     */
    public function up()
    {
        $this->model::find(request()->id_up)->up();

        return back();
    }

    /**
     * @return \Illuminate\Http\RedirectResponse
     */
    public function down()
    {
        $this->model::find(request()->id_down)->down();

        return back();
    }

    /**
     * @return \Illuminate\Http\RedirectResponse
     */
    public function top()
    {
        $this->model::find(request()->id_top)->toTop();

        return back();
    }

    /**
     * @return \Illuminate\Http\RedirectResponse
     */
    public function bottom()
    {
        $this->model::find(request()->id_bottom)->toBottom();

        return back();
    }

    /**
     * @return $this|\Illuminate\Database\Eloquent\Model
     */
//    protected function make()
//    {
//        return $this->model::create();
//    }

    /**
     * List of entities
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector|\Illuminate\View\View
     */
    public function index()
    {
        $data = [
            'items' => $this->transformer->transform(
                $this->all(),
                $this->presentableKeys()
            ),
            'fields' => $this->presentable(),
        ];

        return $this->respond($data, __FUNCTION__);
    }

    /**
     * Create an entity
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector|\Illuminate\View\View
     */
    public function create()
    {
        if (! count($this->editable())) {
            flash()->error(__t('alerts.cant_create', ['title' => static::getTitle()]));

            return back();
        }

        $data = [
            'input' => $this->editable(),
        ];

        return $this->respond($data, __FUNCTION__);
    }

    /**
     * Edit an entity
     *
     * @param int $id
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector|\Illuminate\View\View
     */
    public function edit(int $id)
    {
        if (! count($this->editable())) {
            flash()->error(__t('alerts.cant_edit', ['title' => static::getTitle()]));

            return back();
        }

        $data = [
            'profile' => Presenter::userProfile($this->find($id)),
            'input' => $this->editableWithValues($id),
            'id' => $id,
        ];

        return $this->respond($data, __FUNCTION__);
    }

    /**
     * Store a new entity
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector|\Illuminate\View\View
     */
    public function store()
    {
        $this->validate(request(), $this->validationRules());

//        $moduleSingular = ucfirst(Str::singular($this->module));
        $newEntity = call_user_func([$this->model, 'create'], request()->all());
//        $eventName = 'App\\Kcms\\Services\\Auth\\'
//            . ucfirst($this->module)
//            . '\\Events\\'
//            . $moduleSingular
//            . 'CreatedByAdmin';
//
//        event(new $eventName($newEntity));

        return $this->respond(['redirect' => "admin/{$this->module}"], __FUNCTION__);
    }

    /**
     * Update the entity
     *
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function update($id)
    {
        $data = array_except(request()->all(), ['_method', '_token']);

        if (! count($data)) {
            return $this->respond(['info' => __t('alerts.nothing_to_update')], null);
        }

        if (request()->has('password') && request()->password === '********') {
            unset($data['password']);
        }

        $this->validate(request(), $this->updateValidationRules($data, $id));

        if (isset($data['password'])) {
            $data['password'] = bcrypt(request()->password);
        }

        $entity = call_user_func([$this->model, 'findOrFail'], $id);

        $entity->update(array_except($data, 'password_confirmation'));

        return $this->respond(['redirect' => "admin/{$this->module}"], __FUNCTION__);
    }

    /**
     * Destroy the entity
     *
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        call_user_func([$this->model, 'destroy'], $id);

        return $this->respond(['redirect' => "admin/{$this->module}"], __FUNCTION__);

    }

    /**
     * Get the editable attributes for the model
     *
     * @param null|int $id
     *
     * @return mixed
     */
    protected function editable($id = null): array
    {
        return call_user_func($this->model.'::editable', $id);
    }

    /**
     * Return only presentable keys
     *
     * @return array
     */
    protected function presentableKeys(): array
    {
        return array_keys($this->presentable());
    }

    /**
     * Get the editable attributes with respective values
     *
     * @param int $id
     * @return array
     */
    protected function editableWithValues(int $id): array
    {
        $entity = $this->find($id);
        $editable = $this->editable($id);

        foreach ($editable as $attr => $spec) {
            if ($attr === 'password' || $attr === 'password_confirmation') {
                continue;
            }

            $editable[$attr]['value'] = $entity->$attr;
        }

        return $editable;
    }

    /**
     * Return the presentable attributes for the model
     *
     * @return mixed
     */
    protected function presentable()
    {
        return call_user_func($this->model.'::presentable');
    }

    /**
     * Return all entities
     *
     * @return Collection
     */
    protected function all(): Collection
    {
        return call_user_func([$this->model, 'all']);
    }

    /**
     * Find entity by id
     *
     * @param int $id
     * @return Eloquent
     */
    protected function find(int $id): Eloquent
    {
        return call_user_func([$this->model, 'where'], 'id', $id)
            ->firstOrFail();
    }

    /**
     * Find entity by email
     *
     * @param string $email
     * @return Eloquent
     */
    protected function findByEmail(string $email): Eloquent
    {
        return call_user_func([$this->model, 'where'], 'email', $email)->firstOrFail();
    }

    /**
     * Return the proper response
     *
     * @param $data
     * @param $method
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector|\Illuminate\View\View
     */
    protected function respond($data, $method)
    {
        $data = array_merge(
            $data,
            [
                'resource' => $this->module,
                'model' => $this->model()
            ]
        );

        if (request()->expectsJson()) {
            return response()->json($data, 200);
        }

        if ($method === 'store' || $method === 'destroy' || $method === 'update') {
            return redirect("admin/{$this->module}");
        }

        if (empty($method)) {
            return back()->with($data);
        }

        return view("admin.content.{$method}", $data );
    }


//    /**
//     * Get validation rules for updates
//     *
//     * @param array    $fields
//     * @param null|int $id
//     *
//     * @return array
//     */
//    protected function updateValidationRules($fields, $id): array
//    {
//        $rules = [];
//
//        foreach ($fields as $field => $val) {
//            if (isset($this->validationRules($id)[$field])) {
//                $rules[$field] = $this->validationRules($id)[$field];
//            }
//        }
//
//        return $rules;
//    }

    /**
     * Determine validation rule for email attribute
     *
     * @param null|int $id
     *
     * @return string
     */
    protected function getEmailValidationRule($id): string
    {
        $uniqueRule = Rule::unique($this->module, 'email');

        if (isset($id)) {
            $uniqueRule = $uniqueRule->ignore($id);
        }

        return "required|email|{$uniqueRule}";
    }
}
