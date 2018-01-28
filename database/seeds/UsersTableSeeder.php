<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if(app()->environment() === 'testing') {
            DB::table('users')->truncate();

            factory(App\Kcms\Services\Auth\Users\User::class, 10)->create();
        }
    }
}
