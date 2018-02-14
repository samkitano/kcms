<?php

namespace Tests\Concerns;

use Illuminate\Contracts\Console\Kernel;

trait UsesDatabase
{
    /**
     * @param callable|null $afterMigrations
     */
    public function setUpDatabase(callable $afterMigrations = null)
    {
        $this->app[Kernel::class]->setArtisan(null);

        if ($afterMigrations) {
            $afterMigrations();
        }
    }

    public function beginDatabaseTransaction()
    {
        $database = $this->app->make('db');

        foreach ($this->connectionsToTransact() as $name) {
            $database->connection($name)->beginTransaction();
        }

        $this->beforeApplicationDestroyed(function () use ($database) {
            foreach ($this->connectionsToTransact() as $name) {
                $database->connection($name)->rollBack();
            }
        });
    }

    /**
     * @return array
     */
    protected function connectionsToTransact(): array
    {
        return property_exists($this, 'connectionsToTransact')
            ? $this->connectionsToTransact : [null];
    }
}
