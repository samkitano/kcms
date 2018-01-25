<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class HomePageTest extends TestCase
{
    /**
     * It displays front home page
     *
     * @return void
     */
    public function testDisplayHomePage()
    {
        $response = $this->get('/');

        $response->assertStatus(200)->assertSee('K-CMS');
    }
}
