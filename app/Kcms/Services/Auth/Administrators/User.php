<?php

namespace App\Kcms\Services\Auth\Administrators;

use Illuminate\Support\Facades\Mail;
use App\Kcms\Services\Auth\MemberContract;
use App\Kcms\Services\Auth\User as BaseUser;
use App\Kcms\Services\Auth\Administrators\Mail\ResetPassword;
use App\Kcms\Services\Auth\Administrators\Events\UserVerified;

/**
 * App\Kcms\Services\Auth\Administrators\User
 *
 * @property string $role
 * @property bool   $verified
 * @property mixed  $attributes
 * @property bool   $status
 * @property bool   super_admin
 * @property int $id
 * @property string $email
 * @property string|null $password
 * @property string|null $first_name
 * @property string|null $last_name
 * @property \Carbon\Carbon|null $last_active_at
 * @property int $super_admin
 * @property string|null $remember_token
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read string $full_name
 * @property-read string $gravatar
 * @property-read string $last_active
 * @property-read string $name
 * @property-read mixed $since
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Kcms\Services\Auth\Administrators\User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Kcms\Services\Auth\Administrators\User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Kcms\Services\Auth\Administrators\User whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Kcms\Services\Auth\Administrators\User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Kcms\Services\Auth\Administrators\User whereLastActiveAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Kcms\Services\Auth\Administrators\User whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Kcms\Services\Auth\Administrators\User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Kcms\Services\Auth\Administrators\User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Kcms\Services\Auth\Administrators\User whereSuperAdmin($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Kcms\Services\Auth\Administrators\User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Kcms\Services\Auth\Administrators\User whereVerified($value)
 * @mixin \Eloquent
 */
class User extends BaseUser implements MemberContract
{
    const ROOT_ROLE = 'root';
    const DEFAULT_ROLE = 'admin';

    /** @var string */
    protected $table = 'administrators';

    /**
     * The presentable attributes for index view
     *
     * @return array
     */
    public static function presentable(): array
    {
        return [
            'name' => [
                'sortable' => true,
                'label' => __('kcms.fields.name')
            ],
            'email' => [
                'sortable' => true,
                'label' => __('kcms.fields.email')
            ],
            'role' => [
                'sortable' => true,
                'label' => __('kcms.fields.role')
            ],
            'last_active' => [
                'sortable' => true,
                'label' => __('kcms.fields.last_active')
            ],
        ];
    }

    /**
     * The editable/creatable attributes
     *
     * @param null $id
     * @return array
     * @throws \App\Kcms\Services\Auth\Users\Exceptions\UndeterminedUserException
     */
    public static function editable($id = null): array
    {
        $res = [
            'first_name' => [
                'editable' => true,
                'help' => '',
                'label' => __('kcms.fields.first_name'),
                'state' => '',
                'type' => 'text',
                'tag' => 'input',
                'value' => '',
            ],
            'last_name' => [
                'editable' => true,
                'help' => '',
                'label' => __('kcms.fields.last_name'),
                'state' => '',
                'type' => 'text',
                'tag' => 'input',
                'value' => '',
            ],
            'email' => [
                'editable' => true,
                'help' => '',
                'label' => __('kcms.fields.email'),
                'state' => '',
                'type' => 'email',
                'tag' => 'input',
                'value' => '',
            ],
            'role' => [
                'default' => self::DEFAULT_ROLE,
                'editable' => false,
                'help' => '',
                'label' => __('kcms.fields.role'),
                'state' => '',
                'type' => 'choice',
                'tag' => 'select',
                'value' => self::DEFAULT_ROLE,
                'options' => [
                    self::ROOT_ROLE => __('kcms.fields.root'),
                    self::DEFAULT_ROLE => __('kcms.fields.admin'),
                ],
            ],
            'password' => [
                'editable' => true,
                'label' => __('kcms.fields.password'),
                'help' => '',
                'state' => '',
                'type' => 'password',
                'tag' => 'input',
                'value' => '********',
            ],
            'password_confirmation' => [
                'editable' => true,
                'label' => __('kcms.fields.password_confirmation'),
                'state' => '',
                'type' => 'password',
                'tag' => 'input',
                'value' => '',
            ],
        ];

        if (! isset($id)) { // empty id = create
            unset($res['password']);
            unset($res['password_confirmation']);

            return $res;
        }

        if (__user()->id !== $id) { // admin can not change other admin's pw, go figure.
            unset($res['password']);
            unset($res['password_confirmation']);
        } else {
            unset($res['role']); // admin can not change own role
        }

        if (__user()->role !== 'root') { // only root admin can change other admin roles
            unset($res['role']);
        }

        return $res;
    }

    /**
     * @return string
     */
    public function guardDriver(): string
    {
        return 'admin';
    }

    /**
     * @return string
     */
    public function getHomeUrl(): string
    {
        return url('admin/dashboard');
    }

    public function getRoleAttribute(): string
    {
        return $this->attributes['super_admin']
            ? self::ROOT_ROLE
            : self::DEFAULT_ROLE;
    }

    public function setRoleAttribute($role)
    {
        $this->attributes['super_admin'] = $role === self::ROOT_ROLE;
    }

    /**
     * @return string
     */
    public function getProfileUrl(): string
    {
        if (config('kcms.vue_admin')) {
            return '/admin/administrators/'.$this->id.'/edit';
        }

        return action('Admin\AdministratorsController@edit', $this->id);
    }

    /**
     * @return bool
     */
    public function getVerifiedAttribute(): bool
    {
        return $this->attributes['verified'];
    }

    /**
     * @param bool $state
     */
    public function setVerifiedAttribute(bool $state)
    {
        $this->attributes['verified'] = $state;
    }

    /**
     * @return bool
     */
    public function isVerified(): bool
    {
        return $this->verified;
    }

    /**
     * @return User
     */
    public function verify(): self
    {
        $this->verified = true;

        event(new UserVerified($this));

        $this->sendWelcomeEmail();

        return $this;
    }

    /**
     * Send the password reset notification.
     *
     * @param string $token
     */
    public function sendPasswordResetNotification($token)
    {
        Mail::to($this->email)
            ->send(new ResetPassword($this, $token));
    }

    /**
     * @return bool|null
     * @throws \Exception
     */
    public function delete()
    {
        if (__user() && __user()->id === $this->id) {
            abort(406);
        }

        return parent::delete();
    }
}
