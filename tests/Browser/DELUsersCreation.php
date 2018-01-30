<?php

namespace Tests\Browser;

use Laravel\Dusk\Browser;
use App\Kcms\Services\Auth\Users\User;
use App\Kcms\Services\Auth\Administrators\User as Admin;

class UsersCreation extends DuskTestCase
{
    /**
     * @test
     * @throws \Exception
     * @throws \Throwable
     */
//    public function testFrontUserCreatedByAdminCanSetPassword()
//    {
//        $this->browse(function (Browser $browser) {
//            $admin = Admin::find(1);
//
//            $browser->visit('/admin/login')
//                    ->type('email', $admin->email)
//                    ->type('password', 'kitano')
//                    ->press('Login')
//                    ->visit('/admin/users/create')
//                    ->type('first_name', 'Test')
//                    ->type('last_name', 'Dusk')
//                    ->type('email', 'test@kcms.local')
//                    ->press(trans('kcms.actions.create'))
//                    ->assertSee('Preview Sent Email')
//                    ->clickLink('Preview Sent Email')
//                    ->assertSee(trans('kcms.mail.set_password'))
//                    ->clickLink(trans('kcms.mail.set_your_password'), 'a');
//
//            $user = User::where('email', 'test@kcms.local')->first();
//
//            $this->assertEquals(false, $user->verified);
//
//            $resetLink = $browser->attribute(
//                'a.button.button-blue',
//                'href'
//            );
//
//            $browser->visit($resetLink)
//                    ->assertSee(trans('auth.set'))
//                    ->type('password', 'secret')
//                    ->type('password_confirmation', 'secret')
//                    ->click('@submit-reset-password-button')
//                    ->assertPathIs('/')
//                    ->waitForText(trans('passwords.reset'))
//                    ->assertSee('Preview Sent Email')
//                    ->clickLink('Preview Sent Email')
//                    ->assertSee(trans('kcms.mail.welcome_text'));
//
//            $user = User::where('email', 'test@kcms.local')->first();
//
//            $this->assertEquals(true, $user->verified);
//        });
//    }

    /**
     * @test
     * @throws \Exception
     * @throws \Throwable
     */
//    public function testRegisteredFrontUserIsVerified()
//    {
//        \DB::table('verifications')->truncate();
//
//        $this->browse(function (Browser $browser) {
//            $browser->visit('/')
//                    ->click('@goto-register-button')
//                    ->assertPathIs('/register')
//                    ->assertSee(trans('auth.register'))
//                    ->type('first_name', 'Laravel')
//                    ->type('last_name', 'Dusk')
//                    ->type('email', 'dusk@local.test')
//                    ->type('password', 'secret')
//                    ->type('password_confirmation', 'secret')
//                    ->click('@submit-registration-button')
//                    ->assertPathIs('/')
//                    ->assertSee(trans('kcms.mail.check_inbox'))
//                    ->assertSee('Preview Sent Email')
//                    ->clickLink('Preview Sent Email')
//                    ->assertSee(trans('kcms.mail.activate'));
//
//            $sentLink = $browser->attribute('a.button.button-blue', 'href');
//            $shouldBe = url('/verify').'?token='.$this->getToken();
//
//            $this->assertEquals($shouldBe, $sentLink);
//
//            $user = User::where('email', 'dusk@local.test')->first();
//
//            $this->assertEquals(false, $user->isVerified());
//
//            $browser->visit($sentLink)
//                    ->assertSee(trans('auth.logged_in'))
//                    ->assertSee('Preview Sent Email')
//                    ->clickLink('Preview Sent Email')
//                    ->assertSee(trans('kcms.mail.welcome_text'));
//
//        });
//    }

    /**
     * @return mixed
     */
    public function getToken()
    {
        $user = User::where('email', '=','dusk@local.test')
                    ->first();

        $v = \DB::table('verifications')
                ->where('user_id', '=',$user->id)
                ->first();

        return $v->token;
    }
}
