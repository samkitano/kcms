<?php

namespace Tests\Browser;

use Laravel\Dusk\Browser;
use Tests\Browser\Pages\HomePage;
use Tests\Browser\Pages\FrontLogin;
use Illuminate\Support\Facades\Hash;
use Tests\Browser\Pages\FrontResetPw;
use Tests\Browser\Pages\FrontForgotPw;
use App\Kcms\Services\Auth\Users\User;
use Tests\Browser\Pages\FrontRegister;

class FrontAuthTest extends DuskTestCase
{
    /**
     * A basic browser test example.
     *
     * @test
     * @return void
     * @throws \Exception
     * @throws \Throwable
     */
    public function testHomePage()
    {
        $this->browse(function (Browser $brw) {
            $brw->visit(new HomePage)
                ->assertSee('K-CMS');
        });
    }

    /**
     * @test
     * @return void
     * @throws \Exception
     * @throws \Throwable
     */
    public function testVerifiedUserCanLoginAndLogout()
    {
        $user = User::where('verified', true)->first();

        $this->browse(
            function (Browser $brw) use ($user) {
                $brw->visit(new HomePage)
                    ->click('@login')
                    ->on(new FrontLogin)
                    ->assertSourceHas($this->csrfField(
                        $brw->attribute(
                            'meta[name=csrf-token]',
                            'content'
                        )
                    ))
                    ->type('@email', $user->email)
                    ->type('@password', 'secret')
                    ->press('@submit')
                    ->on(new HomePage)
                    ->waitForText(trans('auth.logged_in'))
                    ->assertSee('K-CMS')
                    ->click('@logout')
                    ->on(new HomePage)
                    ->assertSee(trans('auth.logged_out'));
            }
        );
    }

    /**
     * @test
     * @return void
     * @throws \Exception
     * @throws \Throwable
     */
    public function testUnverifiedUserCantLogin()
    {
        $user = User::where('verified', false)->first();

        $this->browse(
            function (Browser $brw) use ($user) {
                $brw->visit(new FrontLogin)
                    ->assertSourceHas($this->csrfField(
                        $brw->attribute(
                            'meta[name=csrf-token]',
                            'content'
                        )
                    ))
                    ->type('@email', $user->email)
                    ->type('@password', 'secret')
                    ->press('@submit')
                    ->on(new HomePage)
                    ->assertSee(trans('kcms.mail.check_inbox'));
            }
        );
    }
    
    /**
     * @test
     * @return void
     * @throws \Exception
     * @throws \Throwable
     */
    public function testUserCanRegister()
    {
        $this->browse(
            function (Browser $brw) {
                $brw->visit(new HomePage)
                    ->click('@register')
                    ->on(new FrontRegister)
                    ->assertSourceHas($this->csrfField(
                        $brw->attribute(
                            'meta[name=csrf-token]',
                            'content'
                        )
                    ))
                    ->type('@first_name', 'Laravel')
                    ->type('@last_name', 'Dusk')
                    ->type('@email', 'dusk@test.local')
                    ->type('@password', 'secret')
                    ->type('@confirm', 'secret')
                    ->press('@submit')
                    ->on(new HomePage)
                    ->assertSee(trans('kcms.mail.check_inbox'))
                    ->assertSee('Preview Sent Email')
                    ->clickLink('Preview Sent Email')
                    ->assertSee(trans('kcms.mail.activate'));

                $user = User::where('email', 'dusk@test.local')->first();
                $sentLink = $brw->attribute('a.button.button-blue', 'href');
                $shouldBe = url('/verify').'?token='.$this->getToken($user);

                $this->assertEquals($shouldBe, $sentLink);
                $this->assertEquals(false, $user->isVerified());

                $brw->visit($sentLink)
                    ->on(new HomePage())
                    ->assertSee(trans('auth.logged_in'))
                    ->assertSee('Preview Sent Email')
                    ->clickLink('Preview Sent Email')
                    ->assertSee(trans('kcms.mail.welcome_text'));
            }
        );
    }

    /**
     * @test
     * @throws \Exception
     * @throws \Throwable
     */
    public function testUserCanResetPassword()
    {
        $this->resetVerificationsTable();

        $user = User::first();

        $this->browse(function (Browser $brw) use ($user) {
            $brw->visit(new HomePage)
                ->click('@login')
                ->on(new FrontLogin)
                ->assertSourceHas($this->csrfField(
                    $brw->attribute(
                        'meta[name=csrf-token]',
                        'content'
                    )
                ))
                ->click('@forgot-pw')
                ->on(new FrontForgotPw)
                ->assertSourceHas($this->csrfField(
                    $brw->attribute(
                        'meta[name=csrf-token]',
                        'content'
                    )
                ))
                ->type('@email', $user->email)
                ->press('@submit')
                ->on(new FrontForgotPw)
                ->assertSee(__('passwords.sent'))
                ->assertSee('Preview Sent Email')
                ->clickLink('Preview Sent Email')
                ->assertSee(trans('kcms.mail.change_password'));

            $sentLink = $brw->attribute('a.button.button-blue', 'href');

            $brw->visit($sentLink)
                ->on(new FrontResetPw)
                ->assertSourceHas($this->csrfField(
                    $brw->attribute(
                        'meta[name=csrf-token]',
                        'content'
                    )
                ))
                ->type('@password', 'newsecret')
                ->type('@confirm', 'newsecret')
                ->press('@submit')
                ->on(new HomePage)
                ->assertSee(__('passwords.reset'));

            $this->assertTrue(Hash::check('newsecret', $user->fresh()->password));
        });
    }

    /**
     * @param $user
     * @return mixed
     */
    public function getToken($user)
    {
        $v = \DB::table('verifications')
                ->where('user_id', '=',$user->id)
                ->first();

        return $v->token;
    }
}
