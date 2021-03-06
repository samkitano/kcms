<?php

namespace App\Kcms\Services\Auth\Users\Events;

use App\Events\Event;
use App\Kcms\Services\Auth\Users\User;

class UserCreatedByAdmin extends Event
{
    /** @var \App\Kcms\Services\Auth\Users\User */
    public $user;

    /**
     * UserCreatedByAdmin constructor.
     *
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }
}
