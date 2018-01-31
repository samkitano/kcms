<?php

namespace App\Kcms\Services\Auth\Administrators;

use Illuminate\Support\Facades\Mail;
use App\Kcms\Services\Auth\MemberContract;
use App\Kcms\Services\Auth\User as BaseUser;
use App\Kcms\Services\Auth\Administrators\Mail\ResetPassword;
use App\Kcms\Services\Auth\Administrators\Events\UserVerified;

/**
 * @property string $role
 * @property bool   $verified
 * @property mixed  $attributes
 * @property bool   $status
 * @todo: ACL
 */
class User extends BaseUser implements MemberContract
{
    /** @var string */
    protected $table = 'administrators';

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
                'default' => 'admin',
                'editable' => false,
                'help' => '',
                'label' => __('kcms.fields.role'),
                'state' => '',
                'type' => 'choice',
                'tag' => 'select',
                'value' => 'admin',
                'options' => [
                    'root' => __('kcms.fields.root'),
                    'admin' => __('kcms.fields.admin'),
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
     * @return string
     */
    public function getRoleAttribute(): string
    {
        return $this->attributes['role'];
    }

    /**
     * @param string $role
     */
    public function setRoleAttribute(string $role)
    {
        $this->attributes['role'] = $role;
    }

    /**
     * @param string $role
     * @return bool
     */
    public function hasRole(string $role): bool
    {
        return $this->role === $role;
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
