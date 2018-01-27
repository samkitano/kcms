<?php

namespace App\Kcms\Mail\Users;

use Illuminate\Mail\Mailable;
use Illuminate\Bus\Queueable;
use App\Kcms\Services\Auth\User;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ActivateAccount extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /** @var \App\Kcms\Services\Auth\User */
    public $user;

    /** @var string */
    public $token;

    /**
     * Create a new message instance.
     *
     * @param User   $user
     * @param string $token
     */
    public function __construct(User $user, $token)
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
            ->to($this->user->email)
            ->subject(__('kcms.mail.activate').config('app.url'))
            ->markdown('mails.user.activate');
    }
}
