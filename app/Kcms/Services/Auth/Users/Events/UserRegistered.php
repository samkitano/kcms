<?php

namespace App\Kcms\Services\Auth\Users\Events;

use App\Events\Event;
use App\Kcms\Services\Auth\Users\User;

class UserRegistered extends Event
{
    /** @var \App\Kcms\Services\Auth\Users\User */
    public $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }
}
