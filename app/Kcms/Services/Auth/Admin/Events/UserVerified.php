<?php

namespace App\Kcms\Services\Auth\Back\Events;

use App\Events\Event;
use App\Kcms\Services\Auth\Admin\User;

class UserVerified extends Event
{
    /** @var \App\Kcms\Services\Auth\Admin\User */
    public $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }
}
