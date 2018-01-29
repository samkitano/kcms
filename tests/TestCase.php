<?php

namespace Tests;

use Tests\Concerns\UsesDatabase;
use Tests\Concerns\CreatesApplication;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication, UsesDatabase;

    public function setUp()
    {
        parent::setUp();
    }
}
