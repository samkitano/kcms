<?php

namespace Tests\Browser;

use Laravel\Dusk\Browser;
use Tests\Browser\Pages\HomePage;
use Tests\Browser\Pages\Dashboard;
use Tests\Browser\Pages\AdminUsers;
use Tests\Browser\Pages\AdminResetPw;
use Tests\Browser\Pages\FrontResetPw;
use App\Kcms\Services\Auth\Users\User;
use Tests\Browser\Pages\Administrators;
use Tests\Browser\Pages\AdminUsersCreate;
use Tests\Browser\Pages\AdministratorsCreate;
use App\Kcms\Services\Auth\Administrators\User as Admin;

class AdministrationTest extends DuskTestCase
{
    /**
     * A Dusk test example.
     *
     * @test
     * @return void
     * @throws \Exception
     * @throws \Throwable
     */
    public function testAdministratorsCanCreateFrontUsers()
    {
        $admin = Admin::find(1);
        $user_email = 'dusky@tests.local';

        $this->browse(function (Browser $brw) use ($admin, $user_email) {
            $brw->loginAs($admin->id, 'admin')
                ->visit(new AdminUsers)
                ->press('@create')
                ->on(new AdminUsersCreate)
                ->assertSourceHas($this->csrfField(
                    $brw->attribute(
                        'meta[name=csrf-token]',
                        'content'
                    )
                ))
                ->type('@first_name', 'Dusky')
                ->type('@last_name', 'Testman')
                ->type('@email', $user_email)
                ->press('@submit')
                ->on(new AdminUsers)
                ->assertSee('Dusky Testman')
                ->assertSee('Preview Sent Email')
                ->clickLink('Preview Sent Email')
                ->assertSee(trans('kcms.mail.user_granted'))
                ->assertSee(trans('kcms.mail.set_password'))
                ->clickLink(trans('kcms.mail.set_your_password'), 'a');

            $user = User::where('email', '=', $user_email)
                        ->first();
            $resetLink = $brw->attribute('a.button.button-blue', 'href');

            $this->assertFalse($user->isVerified());

            $brw->visit($resetLink)
                ->on(new FrontResetPw)
                ->assertSee(trans('auth.set'))
                ->type('@password', 'secret')
                ->type('@confirm', 'secret')
                ->press('@submit')
                ->on(new HomePage)
                ->assertSee(trans('passwords.reset'))
                ->assertSee('Preview Sent Email')
                ->clickLink('Preview Sent Email')
                ->assertSee(trans('kcms.mail.welcome_text'));

            $user = User::where('email', '=', $user_email)->first();
            $this->assertTrue($user->isVerified());
        });
    }

    /**
     * @test
     * @return void
     * @throws \Exception
     * @throws \Throwable
     */
    public function testSuperAdminCanCreateAdministrators()
    {
        $admin = Admin::find(1);
        $admin_email = 'dusky_admin@tests.local';

        $this->browse(function (Browser $brw) use ($admin, $admin_email) {
            $brw->loginAs($admin->id, 'admin')
                ->visit(new Administrators)
                ->press('@create')
                ->on(new AdministratorsCreate)
                ->assertSourceHas($this->csrfField(
                    $brw->attribute(
                        'meta[name=csrf-token]',
                        'content'
                    )
                ))
                ->type('@first_name', 'Dusky')
                ->type('@last_name', 'Testman')
                ->type('@email', $admin_email)
                ->select('@role', trans('kcms.fields.admin'))
                ->press('@submit')
                ->on(new Administrators)
                ->assertSee('Dusky Testman')
                ->assertSee('dusky_admin@tests.local')
                ->assertSee('Preview Sent Email')
                ->clickLink('Preview Sent Email')
                ->assertSee(trans('kcms.mail.admin_granted'));

            $user = Admin::where('email', '=', $admin_email)
                         ->first();
            $resetLink = $brw->attribute('a.button.button-blue', 'href');

            $this->assertFalse($user->isVerified());

            $brw->visit($resetLink)
                ->on(new AdminResetPw)
                ->assertSee(trans('auth.set'))
                ->type('@password', 'secret')
                ->type('@confirm', 'secret')
                ->press('@submit')
                ->assertPathIs('/admin/dashboard');

            // $user = Admin::where('email', '=', $admin_email)->first();
            // $this->assertTrue($user->isVerified()); TODO
        });
    }

//    public function testNormalAdminsCantCreateAdministrators()
//    {
//
//    }
//
//    public function testSuperAdminCanChangeAdminRole()
//    {
//
//    }
//
//    public function testNormalAdminCantChangeAdminRole()
//    {
//
//    }
//
//    public function testAdminsCantChangeTheirOwnRole()
//    {
//
//    }
}
