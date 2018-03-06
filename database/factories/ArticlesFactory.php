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
        'text' => $faker->paragraphs(5, true),
        'slug' => str_slug($title),
        'seo' => json_encode($seo),
        'published' => $draft ? null : Carbon\Carbon::now(),
        'created_at' => \Carbon\Carbon::now()->subDays($rand2),
        'updated_at' => $draft ? \Carbon\Carbon::now() : \Carbon\Carbon::now()->subDays($rand1),
    ];
});
