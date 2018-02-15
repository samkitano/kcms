<?php

namespace App\Kcms\Services\Auth\Administrators\Events;

use App\Events\Event;
use App\Kcms\Services\Auth\Administrators\User;

class AdministratorCreatedByAdmin extends Event
{
    /** @var \App\Kcms\Services\Auth\Administrators\User */
    public $user;

    /**
     * AdministratorCreatedByAdmin event constructor.
     *
     * @param \App\Kcms\Services\Auth\Administrators\User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }
}
