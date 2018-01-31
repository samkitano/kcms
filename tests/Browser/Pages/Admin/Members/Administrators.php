<?php

namespace Tests\Browser\Pages\Admin\Members;

use Laravel\Dusk\Browser;
use Laravel\Dusk\Page as BasePage;

class Administrators extends BasePage
{
    /**
     * Get the URL for the page.
     *
     * @return string
     */
    public function url()
    {
        return '/admin/administrators';
    }

    /**
     * Assert that the browser is on the page.
     *
     * @param  Browser  $browser
     * @return void
     */
    public function assert(Browser $browser)
    {
        $browser->assertPathIs($this->url());
    }

    /**
     * Get the element shortcuts for the page.
     *
     * @return array
     */
    public function elements()
    {
        return [
            '@create' => 'a.create-user',
            '@menu-users' => 'a.menu-users',
            '@menu-administrators' => 'a.menu-administrators',
        ];
    }
}
