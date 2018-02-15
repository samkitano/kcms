<?php

namespace Tests\Feature;

use Tests\Concerns\UsesDatabase;
use Tests\Concerns\CreatesApplication;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication, UsesDatabase;

    /**
     * @inheritdoc
     */
    public function setUp()
    {
        parent::setUp();

        $this->setUpDatabase(function () {
            $this->artisan('migrate:refresh', [
                '--seed' => '1'
            ]);
        });

        $this->beginDatabaseTransaction();
    }
}
