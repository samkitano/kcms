<?php

use Illuminate\Database\Seeder;

class AdministratorsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('administrators')->truncate();

        DB::table('administrators')->insert(
            [
                'first_name' => 'Sam',
                'last_name' => 'Kitano',
                'email' => 'sam.kitano@gmail.com',
                'password' => bcrypt(env('ROOT_PW')),
                'role' => 'root',
                'verified' => true,
                'super_admin' => true,
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ]
        );
    }
}
