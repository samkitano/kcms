<?php

namespace Tests\Browser;

use Illuminate\Support\Facades\Hash;
use Laravel\Dusk\Browser;
use App\Kcms\Services\Auth\Users\User;

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
        $this->browse(function (Browser $browser) {
            $browser->visit('/')
                    ->assertSee('K-CMS');
        });
    }

    /**
     * @test
     * @return void
     * @throws \Exception
     * @throws \Throwable
     */
    public function testLoginAndLogout()
    {
        $user = User::where('verified', true)->first();

        $this->browse(
            function (Browser $browser) use ($user) {
                $browser->visit('/')
                    ->click('@goto-login-button')
                    ->assertPathIs('/login')
                    ->assertSee(trans('auth.fill_login'))
                    ->type('email', $user->email)
                    ->type('password', 'secret')
                    ->click('@submit-login-button')
                    ->waitForText(trans('auth.logged_in'))
                    ->assertSee('K-CMS')
                    ->assertPathIs('/')
                    ->click('@logout-button')
                    ->waitForText(trans('auth.logged_out'))
                    ->assertPathIs('/');
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
        $user = User::first();

        $this->browse(function (Browser $browser) use ($user) {
            $browser
                ->visit('/')
                ->click('@goto-login-button')
                ->assertPathIs('/login')
                ->click('@goto-forgot-pw')
                ->assertPathIs('/password/forgotten')
                ->assertSee(trans('auth.forgot_info'))
                ->type('email', $user->email)
                ->click('@submit-forgot-pw-button')
                ->assertSee(__('passwords.sent'))
                ->assertSee('Preview Sent Email')
                ->clickLink('Preview Sent Email')
                ->assertSee(trans('kcms.mail.change_password'));

            $sentLink = $browser->attribute('a.button.button-blue', 'href');

            $browser
                ->visit($sentLink)
                ->assertSee(trans('kcms.mail.set_your_password'))
                ->type('password', 'newsecret')
                ->type('password_confirmation', 'newsecret')
                ->press(trans('auth.reset'))
                ->assertPathIs('/')
                ->assertSee(__('passwords.reset'));

            $this->assertTrue(Hash::check('newsecret', $user->fresh()->password));
        });
    }
}
