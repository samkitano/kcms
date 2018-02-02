<?php

namespace App\Kcms\Mail;

use Illuminate\Support\Facades\Mail;
use Illuminate\Database\Eloquent\Collection;
use App\Kcms\Services\Auth\Administrators\User;
use App\Kcms\Services\Auth\Users\Exceptions\UnauthorizedNotification;

trait NotifiesAdmins
{
    /**
     * @param $notifier
     *
     * @return bool
     *
     * @throws UnauthorizedNotification
     */
    public static function notify($notifier): bool
    {
        if (! config('kcms.notify_verifications')) {
            return false;
        }

        $recipients = config('kcms.notify_admins');

        if (empty($recipients || ! $recipients)) {
            return false;
        }

        $to = $recipients === 'all'
            ? static::toAllAdmins()
            : static::toSomeAdmins($recipients);

        Mail::to($to)->send($notifier);

        return true;
    }

    /**
     * @return Collection
     */
    protected static function getAdmins(): Collection
    {
        return User::all();
    }

    /**
     * @return array
     */
    protected static function toAllAdmins(): array
    {
        $res = [];

        foreach (static::getAdmins() as $admin) {
            $res[] = ['email' => $admin->email, 'name' => $admin->name];
        }

        return $res;
    }

    /**
     * @param string $recipients
     *
     * @return array
     *
     * @throws UnauthorizedNotification
     */
    protected static function toSomeAdmins($recipients): array
    {
        $exp = explode(',', $recipients);
        $admins = static::getAdmins();
        $res = [];

        foreach ($exp as $recipient) {
            $admin = $admins->where('email', '=', $recipient)->first();

            if (empty($admin)) {
                throw new UnauthorizedNotification('A recipient for a notification must be an administrator.');
            }

            $res[]= ['email' => trim($recipient), 'name' => $admin->name];
        }

        return $res;
    }
}
