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
                ->assertSee(__t('mail.user_granted'))
                ->assertSee(__t('mail.set_password'))
                ->clickLink(__t('mail.set_your_password'), 'a');

            $user = User::where('email', '=', $user_email)
                        ->first();
            $resetLink = $brw->attribute('a.button.button-blue', 'href');

            $this->assertFalse($user->isVerified());

            $brw->visit($resetLink)
                ->on(new ResetPw)
                ->assertSee(__t('auth.set'))
                ->type('@password', 'say-my-name')
                ->type('@confirm', 'say-my-name')
                ->press('@submit')
                ->on(new HomePage)
                ->assertSee(__t('passwords.reset'))
                ->assertSee('Preview Sent Email')
                ->clickLink('Preview Sent Email')
                ->assertSee(__t('mail.welcome_text'));

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
                ->select('@role', __t('auth.admin'))
                ->press('@submit')
                ->on(new Administrators)
                ->assertSee('James Kirk')
                ->assertSee($new_admin_email)
                ->assertSee('Preview Sent Email')
                ->clickLink('Preview Sent Email')
                ->assertSee(__t('mail.admin_granted'));

            $user = Admin::where('email', '=', $new_admin_email)
                         ->first();
            $resetLink = $brw->attribute('a.button.button-blue', 'href');

            $this->assertFalse($user->isVerified());

            $brw->visit($resetLink)
                ->on(new AdminReset)
                ->assertSee(__t('auth.set'))
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
                ->assertDontSee(__t('administrators.create'))
                ->visit(new AdministratorsCreate)
                ->assertSee(__t('alerts.unauthorized'));
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
                ->assertSee(__t('buttons.edit'))
                ->assertSee(__t('buttons.delete'))
                ->press(__t('buttons.edit'))
                ->assertSee(__t('buttons.show'))
                ->waitForText(__t('auth.role'))
                ->type('first_name', 'Jon')
                ->type('last_name', 'Snow')
                ->press(__t('buttons.update'))
                ->on(new Administrators)
                ->clickLink('Jon Snow', 'a > span')
                ->assertSee(__t('buttons.delete'))
                ->press(__t('buttons.delete'))
                ->waitForText(__t('alerts.confirm'))
                ->press('OK')
                ->waitForText(__t('alerts.success'))
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
                ->assertDontSee(__t('buttons.edit'))
                ->assertDontSee(__t('buttons.delete'));
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
                ->assertSee(__t('buttons.edit'))
                ->press(__t('buttons.edit'))
                ->waitForText(__t('buttons.update'))
                ->type('first_name', 'Ricky')
                ->type('last_name', 'Sanchez')
                ->press(__t('buttons.update'))
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
                ->assertSee(__t('buttons.edit'))
                ->assertDontSee(__t('buttons.delete'));
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
                ->assertSee(__t('buttons.edit'))
                ->press(__t('buttons.edit'))
                ->waitForText(__t('buttons.update'))
                ->assertDontSee(__t('auth.role'));
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
                ->assertSee(__t('buttons.edit'))
                ->press(__t('buttons.edit'))
                ->waitForText(__t('buttons.update'))
                ->assertSee(__t('auth.password'))
                ->type('password', $pw)
                ->type('password_confirmation', $pw)
                ->press(__t('buttons.update'))
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
                ->assertSee(__t('buttons.edit'))
                ->press(__t('buttons.edit'))
                ->waitForText(__t('buttons.update'))
                ->assertDontSee(__t('auth.password'));
        });
    }
}
