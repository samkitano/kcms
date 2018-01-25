<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Validation\Rule;
use App\Kcms\Transformers\UsersTransformer;
use App\Kcms\Services\Auth\Admin\User as Admin;
use App\Kcms\Services\Auth\Admin\Events\AdminCreated;
use App\Kcms\Html\Presenters\Users as GenerateUserHtml;

class AdministratorsController extends MembershipController
{
    /** @var string */
    protected $resource = 'administrators';
    protected $modelClass = 'App\Kcms\Services\Auth\Admin\User';


    /**
     * Current menu group
     *
     * @return string
     */
    public static function getMenuGroup(): string
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
        ? __('kcms.menu.administrator')
        : __('kcms.menu.administrators');
    }

    /**
     * @return \Illuminate\View\View|\Illuminate\Http\JsonResponse
     */
//    public function index()
//    {
//        $fields = Admin::presentable();
//        $items = UsersTransformer::transform(Admin::all(), array_keys($fields));
//
//        if (request()->expectsJson()) {
//            return response()->json([
//                'items' => $items,
//                'fields' => $fields,
//                'resource' => $this->resource,
//            ], 200);
//        }
//
//        return view('admin.members.index' )
//            ->with('resource', $this->resource)
//            ->with(compact('items'))
//            ->with(compact('fields'));
//    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\JsonResponse|\Illuminate\View\View
     */
//    public function create()
//    {
//        if (request()->expectsJson()) {
//            return response()->json([
//                'input' => Admin::editable(),
//                'resource' => $this->resource,
//            ], 200);
//        }
//
//        return view('admin.members.create')
//            ->with('resource', $this->resource)
//            ->with('input', Admin::editable());
//    }

    /**
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
//    public function store()
//    {
//        $this->validate(request(), $this->validationRules());
//
//        $admin = Admin::create(request()->all());
//
//        event(new AdminCreated($admin));
//
//        if (request()->expectsJson()) {
//            return response()->json($admin);
//        }
//
//        return redirect("admin/{$this->resource}");
//    }

    /**
     * @param int $id
     * @return $this|\Illuminate\Http\JsonResponse
     */
//    public function edit(int $id)
//    {
//        if (request()->expectsJson()) {
//            return response()->json([
//                'profile' => GenerateUserHtml::userProfile(Admin::find($id)),
//                'input' => $this->getEditableAttributes($id),
//                'resource' => $this->resource,
//            ], 200);
//        }
//
//        return view('admin.members.edit')
//            ->with('resource', $this->resource)
//            ->with('input', $this->getEditableAttributes($id))
//            ->with('profile', GenerateUserHtml::userProfile(Admin::find($id)))
//            ->with(compact('id'));
//    }

    /**
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
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

        if (isset($data['password'])) {
            if ($data['password'] === '********') {
                unset($data['password']);
            }

            $data['password'] = bcrypt(request()->password);
        }

        $entity = Admin::findOrFail($id)->update($data);
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
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        Admin::destroy($id);

        if (request()->expectsJson()) {
            return response()->json(['OK'], 200);
        }

        return redirect("admin/{$this->resource}");
    }

    /**
     * Get editable atrributes
     *
     * @param Admin|int $user
     *
     * @return array
     */
    protected function getEditableAttributes($user): array
    {
        if ($user instanceof Admin) {
            $admin = $user;
            $editable = Admin::editable($admin->id);
        } else {
            $admin = Admin::findOrFail($user);
            $editable = Admin::editable($user);
        }

        foreach ($editable as $attr => $spec) {
            if ($attr === 'password' || $attr === 'password_confirmation') {
                continue;
            }

            $editable[$attr]['value'] = $admin->$attr;
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

//    /**
//     * Get validation rules for creation
//     *
//     * @return array
//     */
//    protected function validationRules(): array
//    {
//        return [
//            'email' => $this->getEmailValidationRule(),
//            'first_name' => 'required|max:50',
//            'last_name' => 'required|max:50',
//            'password' => 'confirmed|min:8|max:150',
//            'role' => 'required|max:15'
//        ];
//    }
//
//    /**
//     * Determine validation rule for email attribute
//     *
//     * @return string
//     */
//    protected function getEmailValidationRule(): string
//    {
//        $uniqueRule = Rule::unique('admins', 'email');
//
//        if ($this->requestIsUpdate()) {
//            $userId = request()->route('administrator');
//
//            $uniqueRule = $uniqueRule->ignore($userId);
//        }
//
//        return "required|email|{$uniqueRule}";
//    }
//
//    /**
//     * Check if request method is update
//     *
//     * @return bool
//     */
//    protected function requestIsUpdate(): bool
//    {
//        return request()->method() === 'PATCH' || request()->method() === 'PUT';
//    }
}
