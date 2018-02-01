<?php

namespace Tests\Browser;

use Laravel\Dusk\Browser;
use Illuminate\Support\Facades\Hash;
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
     * @test
     * @return void
     * @throws \Exception
     * @throws \Throwable
     */
    public function testAdminsCanCreateFrontUsers()
    {
        $admin = static::$normalAdmin;
        $user_email = 'walt@breaking.tests';

        $this->browse(function (Browser $brw) use ($admin, $user_email) {
            $brw->loginAs($admin->id, 'admin')
                ->visit(new AdminUsersCreate)
                ->assertSourceHas($this->csrfField(
                    $brw->attribute(
                        'meta[name=csrf-token]',
                        'content'
                    )
                ))
                ->type('@first_name', 'Walt')
                ->type('@last_name', 'Heisenberg')
                ->type('@email', $user_email)
                ->press('@submit')
                ->on(new AdminUsers)
                ->assertSee('Walt Heisenberg')
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
                ->type('@password', 'say-my-name')
                ->type('@confirm', 'say-my-name')
                ->press('@submit')
                ->on(new HomePage)
                ->assertSee(trans('passwords.reset'))
                ->assertSee('Preview Sent Email')
                ->clickLink('Preview Sent Email')
                ->assertSee(trans('kcms.mail.welcome_text'));

            $user = User::where('email', '=', $user_email)->first();
            $this->assertTrue($user->isVerified());
            $this->assertTrue(Hash::check('say-my-name', $user->password));
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
        $admin = static::$rootAdmin;
        $new_admin_email = 'kirk@stelar.fleet';

        $this->browse(function (Browser $brw) use ($admin, $new_admin_email) {
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
                ->type('@first_name', 'James')
                ->type('@last_name', 'Kirk')
                ->type('@email', $new_admin_email)
                ->select('@role', trans('kcms.fields.admin'))
                ->press('@submit')
                ->on(new Administrators)
                ->assertSee('James Kirk')
                ->assertSee($new_admin_email)
                ->assertSee('Preview Sent Email')
                ->clickLink('Preview Sent Email')
                ->assertSee(trans('kcms.mail.admin_granted'));

            $user = Admin::where('email', '=', $new_admin_email)
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

             $user = Admin::where('email', '=', $new_admin_email)->first();
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
        $admin = static::$normalAdmin;

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
        $admin = static::$normalAdmin;
        $super_admin = static::$superAdmin;

        $this->browse(function (Browser $brw) use ($admin, $super_admin) {
            $brw->loginAs($super_admin->id, 'admin')
                ->visit(new Administrators)
                ->assertSee($super_admin->name)
                ->assertSee($admin->name)
                ->clickLink($admin->name, 'a > span')
                ->assertPathIs('/admin/administrators/'.$admin->id.'/edit')
                ->assertSourceHas($this->csrfField(
                    $brw->attribute(
                        'meta[name=csrf-token]',
                        'content'
                    )
                ))
                ->assertSee(trans('kcms.actions.edit'))
                ->assertSee(trans('kcms.actions.delete'))
                ->press(trans('kcms.actions.edit'))
                ->assertSee(trans('kcms.actions.show'))
                ->assertDontSee(trans('kcms.actions.edit'))
                ->waitForText(trans('kcms.fields.role'))
                ->type('first_name', 'Jon')
                ->type('last_name', 'Snow')
                ->press(trans('kcms.actions.update'))
                ->on(new Administrators)
                ->clickLink('Jon Snow', 'a > span')
                ->assertSee(trans('kcms.actions.delete'))
                ->press(trans('kcms.actions.delete'))
                ->waitForText(trans('kcms.alerts.confirm'))
                ->press('OK')
                ->waitForText(trans('kcms.alerts.success'))
                ->press('OK')
                ->assertPathIs('/admin/administrators')
                ->assertDontSee('Jon Snow');
        });
    }

    /**
     * @test
     * @return void
     * @throws \Exception
     * @throws \Throwable
     */
    public function testNormalAdminCantEditOrDeleteOtherAdmins()
    {
        $admin = static::$normalAdmin;
        $super_admin = static::$superAdmin;

        $this->browse(function (Browser $brw) use ($admin, $super_admin) {
            $brw->loginAs($admin->id, 'admin')
                ->visit(new Administrators)
                ->assertSee($super_admin->name)
                ->assertSee($admin->name)
                ->clickLink($super_admin->name, 'a > span')
                ->assertPathIs('/admin/administrators/'.$super_admin->id.'/edit')
                ->assertDontSee('kcms.actions.edit')
                ->assertDontSee('kcms.actions.delete');
        });
    }

    /**
     * @test
     * @return void
     * @throws \Exception
     * @throws \Throwable
     */
    public function testAdminsCanEditOwnProfile()
    {
        $admin = static::$normalAdmin;

        $this->browse(function (Browser $brw) use ($admin) {
            $brw->loginAs($admin->id, 'admin')
                ->visit(new Administrators)
                ->assertSee($admin->name)
                ->assertSee($admin->email)
                ->clickLink($admin->name, 'a > span')
                ->assertPathIs('/admin/administrators/'.$admin->id.'/edit')
                ->assertSee(trans('kcms.actions.edit'))
                ->press(trans('kcms.actions.edit'))
                ->waitForText(trans('kcms.actions.update'))
                ->type('first_name', 'Ricky')
                ->type('last_name', 'Sanchez')
                ->press(trans('kcms.actions.update'))
                ->on(new Administrators)
                ->assertSee('Ricky Sanchez');
        });
    }

    /**
     * @test
     * @return void
     * @throws \Exception
     * @throws \Throwable
     */
    public function testAdminsCantDeleteOwnAccount()
    {
        $admin = static::$normalAdmin;

        $this->browse(function (Browser $brw) use ($admin) {
            $brw->loginAs($admin->id, 'admin')
                ->visit('admin/administrators/'.$admin->id.'/edit')
                ->assertSee(trans('kcms.actions.edit'))
                ->assertDontSee(trans('kcms.actions.delete'));
        });
    }

    /**
     * @test
     * @return void
     * @throws \Exception
     * @throws \Throwable
     */
    public function testAdminsCantChangeTheirOwnRole()
    {
        $admin = static::$superAdmin;

        $this->browse(function (Browser $brw) use ($admin) {
            $brw->loginAs($admin->id, 'admin')
                ->visit('admin/administrators/'.$admin->id.'/edit')
                ->assertSee(trans('kcms.actions.edit'))
                ->press(trans('kcms.actions.edit'))
                ->waitForText(trans('kcms.actions.update'))
                ->assertDontSee(trans('kcms.fields.role'));
        });
    }

    /**
     * @test
     * @return void
     * @throws \Exception
     * @throws \Throwable
     */
    public function testAdminsCanChangePassword()
    {
        $admin = static::$superAdmin;

        $this->browse(function (Browser $brw) use ($admin) {
            $pw = 'pickle-ricky';
            $brw->loginAs($admin->id, 'admin')
                ->visit('admin/administrators/'.$admin->id.'/edit')
                ->assertSee(trans('kcms.actions.edit'))
                ->press(trans('kcms.actions.edit'))
                ->waitForText(trans('kcms.actions.update'))
                ->assertSee(trans('kcms.fields.password'))
                ->type('password', $pw)
                ->type('password_confirmation', $pw)
                ->press(trans('kcms.actions.update'))
                ->on(new Administrators)
                ->assertSee($admin->name);

            $this->assertTrue(Hash::check($pw, $admin->fresh()->password));
        });
    }

    /**
     * @test
     * @return void
     * @throws \Exception
     * @throws \Throwable
     */
    public function testAdminsCantChangeOtherAdminsPasswords()
    {
        $admin = static::$superAdmin;
        $other = static::$normalAdmin;

        $this->browse(function (Browser $brw) use ($admin, $other) {
            $brw->loginAs($admin->id, 'admin')
                ->visit('admin/administrators/'.$other->id.'/edit')
                ->assertSee(trans('kcms.actions.edit'))
                ->press(trans('kcms.actions.edit'))
                ->waitForText(trans('kcms.actions.update'))
                ->assertDontSee(trans('kcms.fields.password'));
        });
    }
}
