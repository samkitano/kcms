<?php

use Faker\Generator as Faker;

$factory->define(App\Article::class, function (Faker $faker) {
    $title = $faker->sentence;
    $draft = $faker->boolean();
    $rand1 = rand(1, 5);
    $rand2 = rand(8, 16);
    $seo = [
        'title' => $title,
        'description' => $faker->text(120),
    ];

    return [
        'title' => $title,
        'name' => $faker->word,
        'text' => $faker->paragraphs(5, true),
        'slug' => str_slug($title),
        'seo' => json_encode($seo),
        'draft' => $draft,
        'published' => $draft ? null : Carbon\Carbon::now(),
        'parent_id' => null,
        'created_at' => \Carbon\Carbon::now()->subDays($rand2),
        'updated_at' => $draft ? \Carbon\Carbon::now() : \Carbon\Carbon::now()->subDays($rand1),
    ];
});
