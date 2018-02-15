<?php

namespace App\Kcms\Services\Auth\Users\Events;

use App\Events\Event;
use App\Kcms\Services\Auth\Users\User;

class UserVerified extends Event
{
    /** @var User */
    public $user;

    /**
     * UserVerified constructor.
     *
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }
}
