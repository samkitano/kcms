<?php

namespace App\Kcms\Services\Auth\Front\Events;

use App\Events\Event;
use App\Kcms\Services\Auth\Front\User;

class UserVerified extends Event
{
    /** @var \App\Kcms\Services\Auth\Front\User */
    public $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }
}
