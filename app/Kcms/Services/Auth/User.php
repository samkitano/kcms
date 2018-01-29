<?php

namespace App\Kcms\Services\Auth;

use Carbon\Carbon;
use App\Kcms\Mail\Users\Welcome;
use Illuminate\Auth\Authenticatable;
use Illuminate\Support\Facades\Mail;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;


/**
 * @property int $id
 * @property string $email
 * @property string $password
 * @property string $first_name
 * @property string $last_name
 * @property string $name
 * @property string $remember_token
 * @property string $locale
 * @property \Carbon\Carbon $last_activity
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property string $gravatar
 * @mixin \Eloquent
 */
abstract class User extends Model implements AuthenticatableContract, CanResetPasswordContract, AuthorizableContract
{
    use Authenticatable, CanResetPassword, Authorizable, Notifiable, UserPresenter;

    protected $guarded = ['id'];
    protected $hidden = ['password', 'remember_token'];
    protected $dates = ['last_active_at'];

    abstract public function guardDriver(): string;
    abstract public function getHomeUrl(): string;
    abstract public function getProfileUrl(): string;

    /**
     * @return string
     */
    public function getNameAttribute(): string
    {
        return $this->first_name.' '.$this->last_name;
    }

    /**
     * @return bool
     */
    public function hasNeverLoggedIn(): bool
    {
        return empty($this->password);
    }

    /**
     * @return User
     */
    public function registerLastActivity(): self
    {
        $this->last_active_at = Carbon::now();

        return $this;
    }

    /**
     * @return bool
     */
    public function isCurrentUser(): bool
    {
        $guardMatches = $this->guardDriver() === config('auth.defaults.guard');

        return $guardMatches && $this->id ? $this->id === auth()->id() : false;
    }

    /**
     * @param string $email
     *
     * @return \App\Kcms\Services\Auth\User|null
     */
    public static function findByEmail(string $email)
    {
        return static::where('email', $email)->first();
    }

    /**
     * Send a welcome email to the newly registered user
     */
    public function sendWelcomeEmail()
    {
        if (config('kcms.welcome_email')) {
            Mail::to($this->email)->send(new Welcome($this));
        }
    }
}
