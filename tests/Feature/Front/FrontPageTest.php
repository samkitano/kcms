<?php

namespace Tests\Feature;

use App\Kcms\Services\Auth\Users\User;
use Tests\TestCase;

class FrontPageTest extends TestCase
{
    /**
     * It displays front home page
     *
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
