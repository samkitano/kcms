<?php

namespace App\Kcms\Mail;

use Illuminate\{
    Support\Facades\Password,
    Contracts\Events\Dispatcher
};
use App\Kcms\{
    Services\Auth\Users\VerifiesUsers,
    Mail\Administrators\NotifyUserVerified,
    Services\Auth\Users\Events\UserVerified,
    Mail\Administrators\NotifyUserRegistered,
    Services\Auth\Users\Events\UserRegistered,
    Services\Auth\Users\Events\UserCreatedByAdmin,
    Services\Auth\Administrators\Events\AdministratorCreatedByAdmin
};

class EventHandler
{
    use NotifiesAdmins;

    /**
     * Subscribe events
     *
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(AdministratorCreatedByAdmin::class, function (AdministratorCreatedByAdmin $event) {
            Password::broker('admin')->sendResetLink(['email' => $event->user->email]);
        });

        $events->listen(UserCreatedByAdmin::class, function (UserCreatedByAdmin $event) {
            Password::broker('front')->sendResetLink(['email' => $event->user->email]);
        });

        $events->listen(UserVerified::class, function (UserVerified $event) {
            NotifiesAdmins::notify(new NotifyUserVerified($event->user));
        });

        $events->listen(UserRegistered::class, function (UserRegistered $event) {
            NotifiesAdmins::notify(new NotifyUserRegistered($event->user));
            VerifiesUsers::makeVerification($event->user);
        });
    }
}
