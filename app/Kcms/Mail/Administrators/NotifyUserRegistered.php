<?php

namespace App\Kcms\Mail\Administrators;

use Illuminate\Mail\Mailable;
use Illuminate\Bus\Queueable;
use App\Kcms\Services\Auth\User;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class NotifyUserRegistered extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /** @var \App\Kcms\Services\Auth\User */
    public $user;

    /**
     * Create a new message instance.
     *
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Build the message.
     *
     * @return $this|false
     */
    public function build()
    {
        return $this
            ->subject(__('kcms.mail.user_registered').config('app.url'))
            ->text('mails.admin.user-registered')->with(['email' => $this->user->email]);
    }
}
