<?php

namespace Tests\Browser;

use Laravel\Dusk\Browser;
use App\Kcms\Services\Auth\Users\User;
use Tests\Browser\Pages\Front\HomePage;
use Tests\Browser\Pages\Front\Auth\ResetPw;
use Tests\Browser\Pages\Admin\Members\AdminUsers;
use Tests\Browser\Pages\Admin\Members\Administrators;
use Tests\Browser\Pages\Admin\Members\AdminUsersCreate;
use App\Kcms\Services\Auth\Administrators\User as Admin;
use Tests\Browser\Pages\Admin\Auth\ResetPw as AdminReset;
use Tests\Browser\Pages\Admin\Members\AdministratorsCreate;

class MembersTest extends DuskTestCase
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
                ->on(new ResetPw)
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
                ->on(new AdminReset)
                ->assertSee(trans('auth.set'))
                ->type('@password', 'secret')
                ->type('@confirm', 'secret')
                ->press('@submit')
                ->assertPathIs('/admin/dashboard');

             $user = Admin::where('email', '=', $admin_email)->first();
             $this->assertTrue($user->isVerified());
        });
    }

    /**
     * @test
     * @return void
     * @throws \Exception
     * @throws \Throwable
     */
    public function testNormalAdminsCantCreateAdministrators()
    {
        $admin = $this->createNormalAdmin();

        $this->browse(function (Browser $brw) use ($admin) {
            $brw->loginAs($admin->id, 'admin')
                ->visit(new Administrators)
                ->assertDontSee(trans('kcms.administrators.create'))
                ->visit(new AdministratorsCreate)
                ->assertSee(trans('kcms.alerts.unauthorized'));
        });
    }

    /**
     * @test
     * @return void
     * @throws \Exception
     * @throws \Throwable
     */
    public function testSuperAdminCanEditAndDeleteAdmins()
    {
        $admin = $this->createNormalAdmin();
        $super_admin = $this->createSuperAdmin();

        $this->browse(function (Browser $brw) use ($admin, $super_admin) {
            $brw->loginAs($super_admin->id, 'admin')
                ->visit(new Administrators)
                ->assertSee($admin->name)
                ->assertSee($super_admin->name)
                ->clickLink($admin->name, 'a > span')
                ->assertSee(trans('kcms.actions.edit'))
                ->assertSee(trans('kcms.actions.delete'))
                ->press(trans('kcms.actions.edit'))
                ->assertSee(trans('kcms.actions.show'))
                ->assertDontSee(trans('kcms.actions.edit'))
                ->waitForText(trans('kcms.fields.role'))
                ->type('first_name', 'Dusker')
                ->press(trans('kcms.actions.update'))
                ->on(new Administrators)
                ->assertSee('Dusker Testman')
                ->clickLink('Dusker Testman', 'a > span')
                ->assertSee(trans('kcms.actions.delete'))
                ->press(trans('kcms.actions.delete'))
                ->waitForText(trans('kcms.alerts.confirm'))
                ->press('OK')
                ->waitForText(trans('kcms.alerts.success'))
                ->press('OK')
                ->assertPathIs('/admin/administrators')
                ->assertDontSee('Dusker Testman')
                ->assertDontSee('Dusky Testman');
        });
    }

    /**
     * @test
     * @group current
     * @return void
     * @throws \Exception
     * @throws \Throwable
     */
    public function testNormalAdminCantEditOrDeleteOtherAdmins()
    {
        $admin = $this->createNormalAdmin();
        $super_admin = $this->createSuperAdmin();

        $this->browse(function (Browser $brw) use ($admin, $super_admin) {
            $brw->loginAs($admin->id, 'admin')
                ->visit(new Administrators)
                ->assertSee($admin->name)
                ->assertSee($super_admin->name)
                ->clickLink($super_admin->name, 'a > span')
                ->assertDontSee('kcms.actions.edit')
                ->assertDontSee('kcms.actions.delete');
        });
    }

//    public function testAdminsCanEditOwnProfile()
//    {
//
//    }

//    public function testAdminsCantDeleteOwnAccount()
//    {
//
//    }

//    public function testAdminsCanChangePassword()
//    {
//
//    }

//    public function testAdminsCantChangeTheirOwnRole()
//    {
//
//    }

}
