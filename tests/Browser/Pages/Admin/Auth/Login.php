<?php

namespace Tests\Browser\Pages\Admin\Auth;

use Laravel\Dusk\Browser;
use Laravel\Dusk\Page as BasePage;

class Login extends BasePage
{
    /**
     * Get the URL for the page.
     *
     * @return string
     */
    public function url()
    {
        return '/admin/login';
    }

    /**
     * Assert that the browser is on the page.
     *
     * @param  Browser  $browser
     * @return void
     */
    public function assert(Browser $browser)
    {
        $browser->assertPathIs($this->url())
                ->assertSee(__t('auth.fill_login'));
    }

    /**
     * Get the element shortcuts for the page.
     *
     * @return array
     */
    public function elements()
    {
        return [
            '@email' => 'input#email',
            '@password' => 'input#password',
            '@remember' => 'input#remember',
            '@submit' => 'button.submit',
            '@forgot-pw' => 'a.forgot',
        ];
    }
}
