<?php

namespace Tests\Browser\Pages\Admin\Auth;

use Laravel\Dusk\Browser;
use Laravel\Dusk\Page as BasePage;

class ResetPw extends BasePage
{
    /**
     * Get the URL for the page.
     *
     * @return string
     */
    public function url()
    {
        return '/admin/password/reset/*';
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
                ->assertSee(__t('auth.set'));
    }

    /**
     * Get the element shortcuts for the page.
     *
     * @return array
     */
    public function elements()
    {
        return [
            '@password' => 'input#password',
            '@confirm' => 'input#password_confirmation',
            '@submit' => 'button.submit'
        ];
    }
}
