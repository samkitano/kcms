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
//        if(app()->environment() === 'testing') {
            DB::table('users')->truncate();

            // No more than 8 users, so browser tests can 'see' created users
            // Index views tables are set to 10 elements max per page
            factory(App\Kcms\Services\Auth\Users\User::class, 8)->create();
//        }
    }
}
