<?php

namespace App\Kcms\Services\Auth\Admin\Events;

use App\Events\Event;
use App\Kcms\Services\Auth\Front\User;

class UserCreatedByAdmin extends Event
{
    /** @var \App\Kcms\Services\Auth\Front\User */
    public $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }
}
