<?php

namespace App\Kcms\Services\Auth\Users;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Kcms\Mail\Users\ActivateAccount;

trait VerifiesUsers
{
    /**
     * Creates a verification token
     *
     * @param $user
     * @return null|bool
     */
    public static function makeVerification($user):? bool
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
        
        return true;
    }

    /**
     * Verify a user given a valid token
     *
     * @param string $token
     *
     * @return array|bool|\Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model|null|string|static|static[]
     * @throws \App\Kcms\Exceptions\InvalidTimeStringException
     */
    public static function verify(string $token)
    {
        $storedToken = DB::table('verifications')
                ->where('token', '=', $token)
                ->first();

        if (empty($storedToken)) {
            return __t('auth.invalid_token');
        }

        $expired = static::checkExpiration($storedToken);

        if ($expired !== false) {
            return $expired;
        }

        $user = User::find($storedToken->user_id);

        $user->verify()->registerLastActivity()->save();

        static::deleteToken($storedToken->id);

        return $user;
    }

    /**
     * Generate a random token
     *
     * @return string
     */
    public static function generateToken(): string
    {
        return hash_hmac('sha256', str_random(40), config('app.key'));
    }

    /**
     * Check if a given token is expired
     *
     * @param $token
     *
     * @return array|bool|null|string
     * @throws \App\Kcms\Exceptions\InvalidTimeStringException
     */
    protected static function checkExpiration($token)
    {
        $config = config('kcms.tokens_expiration_time');

        if (empty($config) || ! $config) {
            return false;
        }

        $date = Carbon::createFromFormat('Y-m-d H:i:s', $token->created_at);

        $limitDate = $date->addSeconds(strToSeconds($config));

        if (Carbon::now() > $limitDate) {
            static::deleteToken($token->id);

            return __t('auth.token_expired');
        }

        return false;
    }

    /**
     * Delete a token from the verifications table
     *
     * @param $token_id
     */
    protected static function deleteToken($token_id)
    {
        DB::table('verifications')
            ->where('id', '=', $token_id)
            ->delete();
    }
}
