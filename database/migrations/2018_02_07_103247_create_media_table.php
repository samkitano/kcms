<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMediaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('media', function (Blueprint $table) {
            $table->increments('id');
            $table->string('description')
                  ->nullable();
            $table->string('album')
                  ->index();
            $table->string('name');
            $table->string('file_name');
            $table->string('uri');
            $table->string('location');
            $table->string('mime')
                  ->nullable();
            $table->integer('size')
                  ->unsigned();
            $table->json('manipulations')
                  ->nullable();
            $table->json('thumbs')
                  ->nullable();
            $table->json('props')->nullable();
            $table->integer('order')
                  ->unsigned()
                  ->nullable();

            $table->nullableTimestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('media');
    }
}
