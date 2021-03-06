<?php

namespace App\Kcms\Services\Auth\Administrators\Mail;

use Illuminate\Mail\Mailable;
use Illuminate\Bus\Queueable;
use App\Kcms\Services\Auth\Administrators\User;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ResetPassword extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /** @var \App\Kcms\Services\Auth\Administrators\User */
    public $user;

    /** @var string */
    public $token;

    /**
     * Create a new message instance.
     *
     * @param \App\Kcms\Services\Auth\Administrators\User $user
     * @param string                             $token
     */
    public function __construct(User $user, string $token)
    {
        $this->user = $user;
        $this->token = $token;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
            ->subject(__t('mail.access_to').config('app.url'))
            ->markdown($this->user->hasNeverLoggedIn() ? 'mails.admin.set-password' : 'mails.admin.reset-password');
    }
}
