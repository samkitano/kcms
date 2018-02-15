<?php

namespace Tests\Browser\Pages\Front\Auth;

use Laravel\Dusk\Browser;
use Laravel\Dusk\Page as BasePage;

class ForgotPw extends BasePage
{
    /**
     * Get the URL for the page.
     *
     * @return string
     */
    public function url()
    {
        return '/password/forgotten';
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
                ->assertSee(__t('auth.reset'));

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
            '@submit' => 'button.submit',
            '@backToLogin' => 'a.back',
        ];
    }
}
