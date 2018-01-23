<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('email', 150)->unique();
            $table->string('password', 60)->nullable();
            $table->string('first_name', 50)->nullable();
            $table->string('last_name', 50)->nullable();
//            $table->string('address', 254)->nullable();
//            $table->string('postal')->nullable();
//            $table->string('city', 100)->nullable();
//            $table->string('country', 50)->nullable();
//            $table->string('telephone', 25)->nullable();
            $table->string('locale', 2)->default('en');
            $table->datetime('last_active_at')->nullable();
            $table->string('role', 15)->nullable();
            $table->boolean('verified')->nullable();

            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
