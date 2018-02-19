<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArticlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title')->unique();
            $table->string('name')
                  ->nullable();
            $table->mediumText('text')
                  ->nullable();
            $table->string('slug')
                  ->nullable();
            $table->json('seo')
                  ->nullable();
//            $table->boolean('draft')
//                  ->default(true);
            $table->dateTime('published')
                  ->nullable();
            $table->integer('parent_id')
                  ->unsigned()
                  ->nullable();
            $table->integer('priority')
                  ->unsigned()
                  ->nullable();

            $table->timestamps();
        });

        Schema::table('articles', function (Blueprint $table) {
            $table->foreign('parent_id')
                  ->references('id')
                  ->on('articles');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('articles');
    }
}
