<?php

namespace App\Kcms\Services\Auth\Users;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Kcms\Mail\Users\ActivateAccount;

trait VerifiesUsers
{
    public static function makeVerification($user)
    {
        if (! config('kcms.user_verification')) {
            return null;
        }

        $token = static::generateToken();

        DB::table('verifications')->insert(
            [
                'user_id' => $user->id,
                'token' => $token,
                'created_at' => Carbon::now(),
            ]
        );

        Mail::to($user->email)->send(new ActivateAccount($user, $token));
    }

    public static function verify($token)
    {
        $v = DB::table('verifications')
                ->where('token', '=', $token)
                ->first();

        if (empty($v)) {
            return __('auth.invalid_token');
        }

        // TODO: check expiration

        $user = User::find($v->user_id);

        DB::table('verifications')
           ->where('id', '=', $v->id)
           ->delete();

        $user->verify()->registerLastActivity()->save();

        return $user;
    }

    protected static function generateToken()
    {
        return hash_hmac('sha256', str_random(40), config('app.key'));
    }
}
