<?php

namespace Tests\Browser;

use Laravel\Dusk\Browser;
use Illuminate\Support\Facades\Hash;
use Tests\Browser\Pages\Admin\Dashboard;
use Tests\Browser\Pages\Admin\AdminHome;
use Tests\Browser\Pages\Admin\Auth\Login;
use Tests\Browser\Pages\Admin\Auth\ResetPw;
use Tests\Browser\Pages\Admin\Auth\ForgotPw;

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
        $admin = static::$rootAdmin;

        $this->browse(function (Browser $brw) use ($admin) {
            $brw->visit(new AdminHome)
                ->assertSee(__t('auth.login'))
                ->click('@login')
                ->on(new Login)
                ->assertSourceHas($this->csrfField(
                    $brw->attribute(
                        'meta[name=csrf-token]',
                        'content'
                    )
                ))
                ->type('@email', $admin->email)
                ->type('@password', 'secret')
                ->press('@submit')
                ->on(new Dashboard)
                ->assertDontSee(__t('auth.login'))
                ->assertSee(__t('menu.dashboard'))
                ->press('@logout')
                ->on(new AdminHome)
                ->assertSee(__t('auth.login'));
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

        $admin = static::$normalAdmin;

        $this->browse(function (Browser $brw) use ($admin) {
            $brw->visit(new Login)
                ->click('@forgot-pw')
                ->on(new ForgotPw)
                ->assertSourceHas($this->csrfField(
                    $brw->attribute(
                        'meta[name=csrf-token]',
                        'content'
                    )
                ))
                ->type('@email', $admin->email)
                ->press('@submit')
                ->on(new ForgotPw)
                ->assertSee(__t('passwords.sent'))
                ->assertSee('Preview Sent Email')
                ->clickLink('Preview Sent Email')
                ->assertSee(__t('mail.change_password'));

            $sentLink = $brw->attribute('a.button.button-blue', 'href');

            $brw->visit($sentLink)
                ->on(new ResetPw)
                ->assertSourceHas($this->csrfField(
                    $brw->attribute(
                        'meta[name=csrf-token]',
                        'content'
                    )
                ))
                ->type('@password', 'newsecret')
                ->type('@confirm', 'newsecret')
                ->press('@submit')
                ->on(new Dashboard)
                ->assertSee(__('passwords.reset'));

            $this->assertTrue(Hash::check('newsecret', $admin->fresh()->password));
        });
    }

    /**
     * @test
     * @return void
     * @throws \Exception
     * @throws \Throwable
     */
    public function testAdminsCantRegister()
    {
        $this->browse(function (Browser $brw) {
            $brw->visit('/admin/register')
                ->assertSee(__t('alerts.404'));
        });
    }
}
