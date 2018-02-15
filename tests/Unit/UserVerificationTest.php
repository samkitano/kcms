<?php

namespace Tests\Unit;

use Carbon\Carbon;
use App\Kcms\Services\Auth\Users\User;
use App\Kcms\Services\Auth\Users\VerifiesUsers;

class UserVerificationTest extends TestCase
{
    /**
     * @test
     * @throws \App\Kcms\Exceptions\InvalidTimeStringException
     */
    public function testItCanVerifyUsers()
    {
        $user = factory(User::class)->create(['verified' => false]);

        $token = VerifiesUsers::generateToken();
        $table = 'verifications';
        $data = [
            'user_id' => $user->id,
            'token' => $token,
            'created_at' => Carbon::now(),
        ];

        \DB::table($table)->insert($data);

        $this->assertFalse((bool) $user->verified);

        $verified = VerifiesUsers::verify($token);

        $this->assertTrue($verified instanceof User);
        $this->assertTrue((bool) $user->fresh()->verified);
        $this->assertDatabaseMissing($table, $data);
    }

    /**
     * @test
     * @throws \App\Kcms\Exceptions\InvalidTimeStringException
     */
    public function testItCanRejectExpiredTokens()
    {
        $user = factory(User::class)->create(['verified' => false]);

        $token = VerifiesUsers::generateToken();
        $table = 'verifications';
        $data = [
            'user_id' => $user->id,
            'token' => $token,
            'created_at' => Carbon::now()->subDays(4),
        ];

        \DB::table($table)->insert($data);

        $this->assertFalse((bool) $user->verified);

        $verified = VerifiesUsers::verify($token);

        $this->assertEquals(__t('auth.token_expired'), $verified);
        $this->assertFalse($verified instanceof User);
        $this->assertFalse((bool) $user->fresh()->verified);
        $this->assertDatabaseMissing($table, $data);
    }
}
