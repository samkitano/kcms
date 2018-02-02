<?php

namespace App\Kcms\Services\Auth\Users;

use Illuminate\Support\Facades\Mail;
use App\Kcms\Services\Auth\MemberContract;
use App\Kcms\Services\Auth\User as BaseUser;
use App\Kcms\Services\Auth\Users\Mail\ResetPassword;
use App\Kcms\Services\Auth\Users\Events\UserVerified;
use App\Kcms\Services\Auth\Users\Events\UserRegistered;

/**
 * @property string $address
 * @property string $postal
 * @property string $role
 * @property string $city
 * @property string $country
 * @property string $telephone
 * @property bool   $verified
 * @property mixed  $attributes
 */
class User extends BaseUser implements MemberContract
{
    /** @var string */
    protected $table = 'users';

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
// TODO: front user change pw
//            'password' => [
//                'editable' => true,
//                'label' => __('kcms.fields.password'),
//                'help' => '',
//                'state' => '',
//                'type' => 'password',
//                'tag' => 'input',
//                'value' => '********',
//            ],
//            'password_confirmation' => [
//                'editable' => true,
//                'label' => __('kcms.fields.password_confirmation'),
//                'state' => '',
//                'type' => 'password',
//                'tag' => 'input',
//                'value' => '',
//            ],
        ];
        
        return $res;
    }

    /**
     * Register a user
     *
     * @param array $input
     * @return User
     */
    public static function register(array $input): self
    {
        $forceVerification = config('kcms.user_verification') ?? false;

        $defaults = [
            'verified' =>  (bool) ! $forceVerification,
        ];

        if (isset($input['password'])) {
            $input['password'] = bcrypt($input['password']);
        }

        $user = static::create($defaults + array_only($input, [
            'first_name',
            'last_name',
            'email',
            'password',
        ]));

        event(new UserRegistered($user));

        return $user;
    }

    /**
     * @return string
     */
    public function guardDriver(): string
    {
        return 'front';
    }

    /**
     * @return string
     */
    public function getHomeUrl(): string
    {
        return url('/');
    }

    /**
     * @return string
     */
    public function getProfileUrl(): string
    {
        if (config('kcms.vue_admin')) {
            return '/admin/users/'.$this->id.'/edit';
        }

        return action('Admin\UsersController@edit', $this->id);
    }

    /**
     * @return bool
     */
    public function isVerified(): bool
    {
        return (bool) $this->verified;
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
        Mail::to($this->email)->send(new ResetPassword($this, $token));
    }
}
