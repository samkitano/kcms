<?php

namespace Tests\Browser;

use Laravel\Dusk\Browser;
use Tests\Browser\Pages\Dashboard;
use Tests\Browser\Pages\AdminHome;
use Tests\Browser\Pages\AdminLogin;
use Illuminate\Support\Facades\Hash;
use Tests\Browser\Pages\AdminResetPw;
use Tests\Browser\Pages\AdminForgotPw;
use App\Kcms\Services\Auth\Administrators\User as Admin;

class AdminAuthTest extends DuskTestCase
{
    /**
     * @test
     * @return void
     * @throws \Exception
     * @throws \Throwable
     */
    public function testAdminCanLoginAndLogout()
    {
        $admin = Admin::first();

        $this->browse(function (Browser $brw) use ($admin) {
            $brw->visit(new AdminHome)
                ->assertSee(trans('auth.login'))
                ->click('@login')
                ->on(new AdminLogin)
                ->assertSourceHas($this->csrfField(
                    $brw->attribute(
                        'meta[name=csrf-token]',
                        'content'
                    )
                ))
                ->type('@email', $admin->email)
                ->type('@password', 'kitano')
                ->press('@submit')
                ->on(new Dashboard)
                ->assertDontSee(trans('auth.login'))
                ->assertSee(trans('kcms.menu.dashboard'))
                ->press('@logout')
                ->on(new AdminHome)
                ->assertSee(trans('auth.login'));
        });
    }

    /**
     * @test
     * @return void
     * @throws \Exception
     * @throws \Throwable
     */
    public function testAdminCanResetPassword()
    {
        $this->resetVerificationsTable();

        $admin = Admin::first();

        $this->browse(function (Browser $brw) use ($admin) {
            $brw->visit(new AdminLogin)
                ->assertSourceHas($this->csrfField(
                    $brw->attribute(
                        'meta[name=csrf-token]',
                        'content'
                    )
                ))
                ->click('@forgot-pw')
                ->on(new AdminForgotPw)
                ->assertSourceHas($this->csrfField(
                    $brw->attribute(
                        'meta[name=csrf-token]',
                        'content'
                    )
                ))
                ->type('@email', $admin->email)
                ->press('@submit')
                ->on(new AdminForgotPw)
                ->assertSee(__('passwords.sent'))
                ->assertSee('Preview Sent Email')
                ->clickLink('Preview Sent Email')
                ->assertSee(trans('kcms.mail.change_password'));

            $sentLink = $brw->attribute('a.button.button-blue', 'href');

            $brw->visit($sentLink)
                ->on(new AdminResetPw)
                ->assertSourceHas($this->csrfField(
                    $brw->attribute(
                        'meta[name=csrf-token]',
                        'content'
                    )
                ))
                ->type('@password', 'secret')
                ->type('@confirm', 'secret')
                ->press('@submit')
                ->on(new Dashboard)
                ->assertSee(__('passwords.reset'));

            $this->assertTrue(Hash::check('secret', $admin->fresh()->password));
        });
    }
}
