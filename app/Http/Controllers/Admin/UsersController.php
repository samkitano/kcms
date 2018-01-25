<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Validation\Rule;
use App\Kcms\Services\Auth\Front\User;
use App\Kcms\Transformers\UsersTransformer;
use App\Kcms\Html\Presenters\Users as GenerateUserHtml;
use Illuminate\Foundation\Validation\ValidatesRequests;
use App\Kcms\Services\Auth\Admin\Events\UserCreatedByAdmin;

class UsersController
{
    use ValidatesRequests;

    protected $resource = 'users';

    /**
     * Current menu group
     *
     * @return string
     */
    public static function getMenu(): string
    {
        return __('kcms.menu.members');
    }

    /**
     * Current menu item
     *
     * @param bool $singular
     *
     * @return string
     */
    public static function getName($singular = false): string
    {
        return $singular
            ? __('kcms.menu.user')
            : __('kcms.menu.users');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $fields = User::presentable();
        $items = UsersTransformer::transform(User::all(), array_keys($fields));

        if (request()->expectsJson()) {
            return response()->json([
                'items' => $items,
                'fields' => $fields,
                'resource' => $this->resource,
            ], 200);
        }

        return view('admin.members.index' )
            ->with('resource', $this->resource)
            ->with(compact('items'))
            ->with(compact('fields'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        if (request()->expectsJson()) {
            return response()->json([
                'input' => User::editable(),
                'resource' => $this->resource
            ], 200);
        }

        return view('admin.members.create')
            ->with('resource', $this->resource)
            ->with('input', User::editable());

    }

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        $this->validate(request(), $this->validationRules());

        $user = User::create(request()->all());

        event(new UserCreatedByAdmin($user));

        if (request()->expectsJson()) {
            return response()->json($user);
        }

        return redirect("admin/{$this->resource}");
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        if (request()->expectsJson()) {
            return response()->json([
                'profile' => GenerateUserHtml::userProfile(User::find($id)),
                'input' => $this->getEditableAttributes($id),
                'resource' => $this->resource,
            ], 200);
        }

        return view('admin.members.edit')
            ->with('resource', $this->resource)
            ->with('input', $this->getEditableAttributes($id))
            ->with('profile', GenerateUserHtml::userProfile(User::find($id)))
            ->with(compact('id'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update($id)
    {
        $data = array_except( request()->all(), ['_method', '_token']);

        if (! count($data)) {
            if (request()->expectsJson()) {
                return response()->json([
                    'info' => __('kcms.actions.nothing_to_update'),
                ]);
            }
            return back()->with('info', __('kcms.actions.nothing_to_update'));
        }

        $this->validate(request(), $this->updateValidationRules($data));

//        if (isset($data['password'])) {
//            if ($data['password'] === '********') {
//                unset($data['password']);
//            }
//
//            $data['password'] = bcrypt(request()->password);
//        }

        $entity = User::findOrFail($id)->update($data);
        $updated = array_keys($data);
        $fields = [];

        foreach ($updated as $item) {
            $fields[] = __('kcms.fields'.$item);
        }

        if (request()->expectsJson()) {
            return response()->json([
                'input' => $this->getEditableAttributes($entity),
            ]);
        }

        return redirect("admin/{$this->resource}");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        User::destroy($id);

        if (request()->expectsJson()) {
            return response()->json(['OK'], 200);
        }

        return redirect("admin/{$this->resource}");
    }

    /**
     * Get editable atrributes
     *
     * @param User|int $user
     *
     * @return array
     */
    protected function getEditableAttributes($user): array
    {
        if ($user instanceof User) {
            $entity = $user;
            $editable = User::editable($entity->id);
        } else {
            $entity = User::findOrFail($user);
            $editable = User::editable($user);
        }

        foreach ($editable as $attr => $spec) {
            if ($attr === 'password' || $attr === 'password_confirmation') {
                continue;
            }

            $editable[$attr]['value'] = $entity->$attr;
        }

        return $editable;
    }

    /**
     * Get validation rules for updates
     *
     * @param array $fields
     *
     * @return array
     */
    protected function updateValidationRules($fields): array
    {
        $rules = [];

        foreach ($fields as $field => $val) {
            $rules[$field] = $this->validationRules()[$field];
        }

        return $rules;
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
//            'role' => 'required|max:15'
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
            $userId = request()->route('user');

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
