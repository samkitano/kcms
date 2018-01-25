<?php

namespace App\Kcms\Mail;

use Illuminate\Support\Facades\Password;
use Illuminate\Contracts\Events\Dispatcher;
use App\Kcms\Services\Auth\Admin\Events\AdminCreated;
use App\Kcms\Services\Auth\Admin\Events\UserCreatedByAdmin;

class EventHandler
{
    /**
     * Subscribe events
     *
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(AdminCreated::class, function (AdminCreated $event) {
            Password::broker('admin')->sendResetLink(['email' => $event->user->email]);
        });

        $events->listen(UserCreatedByAdmin::class, function (UserCreatedByAdmin $event) {
            Password::broker('front')->sendResetLink(['email' => $event->user->email]);
        });
    }
}
