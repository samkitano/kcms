<?php

namespace Tests\Feature\Front;

use Tests\Feature\TestCase;
use App\Kcms\Services\Auth\Users\User;

class FrontPageTest extends TestCase
{
    /**
     * It displays front home page
     *
     * @test
     * @return void
     */
    public function testDisplayHomePage()
    {
        $response = $this->get('/');

        $response->assertStatus(200)
                 ->assertSee('K-CMS');
    }

    /**
     * It displays front register page
     *
     * @test
     * @return void
     */
    public function testUnathedUserSeesRegister()
    {
        $response = $this->get('/register');

        $response->assertStatus(200)
                 ->assertSee(trans('auth.register'));
    }

    /**
     * It displays front login page
     *
     * @test
     * @return void
     */
    public function testUnathedUserSeesLogin()
    {
        $response = $this->get('/login');

        $response->assertStatus(200)
                 ->assertSee(trans('auth.login'));
    }

    /**
     * An authed user will see a logout action,
     * not any other authentication actions
     *
     * @test
     * @return void
     */
    public function testAnAuthedUserSeesLogout()
    {
        $user = User::first();

        auth('front')->loginUsingId($user->id);

        $response = $this->get('/');

        $response->assertStatus(200)
                 ->assertSee(trans('auth.logout'))
                 ->assertDontSee('auth.register')
                 ->assertDontSee(trans('auth.login'));
    }
}
