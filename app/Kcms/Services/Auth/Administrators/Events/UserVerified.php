<?php

namespace App\Kcms\Services\Auth\Administrators\Events;

use App\Events\Event;
use App\Kcms\Services\Auth\Administrators\User;

class UserVerified extends Event
{
    /** @var \App\Kcms\Services\Auth\Administrators\User */
    public $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }
}
