<?php

namespace App\Kcms\Services\Auth\Admin\Events;

use App\Events\Event;
use App\Kcms\Services\Auth\Admin\User;

class AdminCreated extends Event
{
    /** @var \App\Kcms\Services\Auth\Admin\User */
    public $user;

    /**
     * AdminCreated event constructor.
     *
     * @param \App\Kcms\Services\Auth\Admin\User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }
}
