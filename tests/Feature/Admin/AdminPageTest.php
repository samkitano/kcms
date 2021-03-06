<?php

namespace Tests\Feature\Admin;

use Tests\Feature\TestCase;
use App\Kcms\Services\Auth\Administrators\User as Admin;

class AdminPageTest extends TestCase
{
    /**
     * It displays admin home page
     *
     * @test
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
     * @test
     * @return void
     */
    public function testUnathedUserSeesLogin()
    {
        $response = $this->get('/admin');

        $response->assertStatus(200)
                 ->assertDontSee(__t('auth.register'))
                 ->assertSee(__t('auth.login'));
    }

    /**
     * It displays admin login page
     *
     * @test
     * @return void
     */
    public function testUnauthedUserSeesAdminLoginPage()
    {
        $response = $this->get('/admin/login');

        $response->assertStatus(200)
                 ->assertSee(__t('auth.login'));
    }

    /**
     * No registration in admin area. A 404 should be shown.
     *
     * @test
     * @return void
     */
    public function testUnauthedUserDontSeeRegisterPage()
    {
        $response = $this->get('/admin/register');

        $response->assertStatus(200)
                 ->assertSee(__t('alerts.404'));
    }

    /**
     * Authenticated user has logout and sees dashboard
     *
     * @test
     * @return void
     */
    public function testAuthedUserSeesDashboard()
    {
        $admin = Admin::first();

        auth('admin')->loginUsingId($admin->id);

        $response = $this->get('/admin/dashboard');

        $response->assertStatus(200)
                 ->assertSee($admin->name)
                 ->assertSee(__t('auth.logout'))
                 ->assertSee(__t('menu.dashboard'));
    }
}
