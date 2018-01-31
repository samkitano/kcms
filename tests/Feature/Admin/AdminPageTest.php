<?php

namespace Tests\Feature\Admin;

use Tests\TestCase;
use App\Kcms\Services\Auth\Administrators\User as Admin;

class AdminPageTest extends TestCase
{
    /**
     * It displays admin home page
     *
     * @return void
     */
    public function testDisplayHomePage()
    {
        $response = $this->get('/admin');

        $response->assertStatus(200)
                 ->assertSee('K-CMS');
    }

    /**
     * It displays admin home page
     *
     * @return void
     */
    public function testUnathedUserSeesLogin()
    {
        $response = $this->get('/admin');

        $response->assertStatus(200)
                 ->assertDontSee(trans('auth.register'))
                 ->assertSee(trans('auth.login'));
    }

    /**
     * It displays admin login page
     *
     * @return void
     */
    public function testUnauthedUserSeesAdminLoginPage()
    {
        $response = $this->get('/admin/login');

        $response->assertStatus(200)
                 ->assertSee(trans('auth.login'));
    }

    /**
     * No registration in admin area. A 404 should be shown.
     *
     * @return void
     */
    public function testUnauthedUserDontSeeRegisterPage()
    {
        $response = $this->get('/admin/register');

        $response->assertStatus(200)
                 ->assertSee(trans('kcms.errors.404'));
    }

    /**
     * Authenticated user has logout and sees dashboard
     *
     * @return void
     */
    public function testAuthedUserSeesDashboard()
    {
        $admin = Admin::first();
        auth('admin')->loginUsingId($admin->id);

        $response = $this->get('/admin/dashboard');

        $response->assertStatus(200)
                 ->assertSee($admin->name)
                 ->assertSee(trans('auth.logout'))
                 ->assertSee(trans('kcms.menu.dashboard'));
    }
}
