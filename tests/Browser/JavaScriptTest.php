<?php

namespace Tests\Browser;

use Laravel\Dusk\Browser;
use Tests\Browser\Pages\Admin\Members\AdminUsers;

class JavaScriptTest extends DuskTestCase
{
    /**
     * @test
     * @throws \Exception
     * @throws \Throwable
     */
    public function testJavaScriptIsWrittenToDom()
    {
        $admin = static::$normalAdmin;

        $this->browse(function (Browser $brw) use ($admin) {
            $brw->loginAs($admin->id, 'admin')
                ->visit(new AdminUsers)
                ->assertSourceHas('window.kitano = window.kitano || {};');
        });
    }
}
