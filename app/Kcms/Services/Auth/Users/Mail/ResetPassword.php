<?php

namespace App\Kcms\Services\Auth\Users\Mail;

use Illuminate\Mail\Mailable;
use Illuminate\Bus\Queueable;
use App\Kcms\Services\Auth\Users\User;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ResetPassword extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /** @var \App\Kcms\Services\Auth\Users\User */
    public $user;

    /** @var string */
    public $token;

    /**
     * Create a new message instance.
     *
     * @param User   $user
     * @param string $token
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
            ->subject('🔐 Access to '.config('app.url'))
            ->markdown($this->user->hasNeverLoggedIn() ? 'mails.user.set-password' : 'mails.user.reset-password');
    }
}
