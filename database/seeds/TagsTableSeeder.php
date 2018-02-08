<?php

use Illuminate\Database\Seeder;

class TagsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('taggable_tags')->truncate();

        factory(App\Tag::class, 8)->create();

        \DB::table('taggable_taggables')->truncate();

        $this->seedTaggableTaggables();
    }

    protected function seedTaggableTaggables()
    {
        $allTags = App\Tag::all()->toArray();
        $allArticles = App\Article::all();

        foreach ($allTags as $tag) {
            $randomArticle = rand(1, $allArticles->count());

            \DB::table('taggable_taggables')->insert([
                'tag_id' => $tag['tag_id'],
                'taggable_id' => $allArticles->find($randomArticle)->id,
                'taggable_type' => 'App\\Article::class',
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ]);
        }
    }
}
