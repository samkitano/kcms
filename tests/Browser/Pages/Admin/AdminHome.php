<?php

namespace Tests\Browser\Pages\Admin;

use Laravel\Dusk\Browser;
use Laravel\Dusk\Page as BasePage;

class AdminHome extends BasePage
{
    /**
     * Get the URL for the page.
     *
     * @return string
     */
    public function url()
    {
        return '/admin';
    }

    /**
     * Assert that the browser is on the page.
     *
     * @param  Browser  $brw
     * @return void
     */
    public function assert(Browser $brw)
    {
        $brw->assertPathIs($this->url());
    }

    /**
     * Get the element shortcuts for the page.
     *
     * @return array
     */
    public function elements()
    {
        return [
            '@login' => 'a.authButton',
            '@logout' => 'button.logout'
        ];
    }
}
