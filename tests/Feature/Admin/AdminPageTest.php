<?php

namespace Tests\Feature\Admin;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

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

        $response->assertStatus(200)->assertSee('K-CMS');
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
                 ->assertSee(trans('auth.login'));
    }

    /**
     * It displays admin login page
     *
     * @return void
     */
    public function testUnauthedUserSeesLoginPage()
    {
        $response = $this->get('/admin/login');

        $response->assertStatus(200)
            ->assertSee(trans('auth.login'));
    }
}
