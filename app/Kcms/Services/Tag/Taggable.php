<?php

namespace App\Kcms\Services\Tag;

use App\Tag;
use App\Kcms\Traits\Sluggable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

trait Taggable
{
    use Sluggable;

    /**
     * Return the entities for the given tags
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @param  string|array                          $tags
     * @param  string                                $type
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public static function scopeWhereTag(Builder $query, $tags, $type = 'slug'): Builder
    {
        $tags = (new static)->normalizeTags($tags);

        foreach ($tags as $tag) {
            $query->whereHas('tags', function ($query) use ($type, $tag) {
                $query->where($type, '=', $tag);
            });
        }

        return $query;
    }

    /**
     * Return the entities with one of the given tags
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @param  string|array                          $tags
     * @param  string                                $type
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public static function scopeWithTag(Builder $query, $tags, $type = 'slug'): Builder
    {
        $tags = (new static)->normalizeTags($tags);

        return $query->whereHas('tags', function ($query) use ($type, $tags) {
            $query->whereIn($type, $tags);
        });
    }

    /**
     * Attach the given tag
     *
     * @param string $name
     */
    public function addTag(string $name)
    {
        $tag = $this->createModel()->firstOrNew([
            'slug' => $this->slug($name),
            'model' => $this->getEntityClassName(),
        ]);

        if (! $tag->exists) {
            $tag->name = $name;
            $tag->save();
        }

        if (! $this->tags->contains($tag->id)) {
            $tag->increment('count');
            $this->tags()->attach($tag);
        }
    }

    /**
     * Return all the tags for the entity
     *
     * @return Tag
     */
    public static function allTags(): Tag
    {
        $instance = new static;

        return $instance->createModel()->where(
            'model',
            '=',
            $instance->getEntityClassName()
        );
    }

    /**
     * Create a model instance
     *
     * @return Tag
     */
    public static function createModel(): Tag
    {
        return new Tag;
    }

    /**
     * Normalize tags for saving
     *
     * @param string|array $tags
     *
     * @return array
     */
    public function normalizeTags($tags): array
    {
        if (is_null($tags)) {
            return [];
        }

        if (is_string($tags)) {
            $tags = $this->splitTags($tags);
        }

        return array_unique(array_filter($tags));
    }

    /**
     * Detach the given tag
     *
     * @param string $name
     */
    public function removeTag(string $name)
    {
        $namespace = $this->getEntityClassName();
        $tag = $this->createModel()
                    ->where('model', '=', $namespace)
                    ->where(
                        function ($query) use ($name) {
                            $query->orWhere('name', $name)
                                  ->orWhere('slug', $name);
                        })
                    ->first();

        if ($tag) {
            $tag->decrement('count');
            $this->tags()->detach($tag);
        }
    }

    /**
     * Attach/detach the given tags
     *
     * @param  string|array  $tags
     * @param  string        $type
     *
     * @return bool
     */
    public function setTags($tags, $type = 'name'): Bool
    {
        $tags = $this->normalizeTags($tags);
        $entityTags = $this->getEntityTags($type);

        $this->removeTagsFromEntity($tags, $entityTags)
             ->addTagsToEntity($tags, $entityTags);

        return true;
    }

    /**
     * Attach several tags to the entity
     *
     * @param  string|array $tags
     *
     * @return bool
     */
    public function tag($tags): Bool
    {
        foreach ($this->normalizeTags($tags) as $tag) {
            $this->addTag($tag);
        }

        return true;
    }

    /**
     * Return the tag entity object
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphToMany
     */
    public function tags(): MorphToMany
    {
        return $this->morphToMany(
            'App\Tag',
            'taggable',
            'tagged',
            'taggable_id',
            'tag_id'
        );
    }

    /**
     * Detach several/all tags from the entity
     *
     * @param  string|array|null $tags
     *
     * @return bool
     */
    public function untag($tags = null): Bool
    {
        $tags = $tags ?: $this->tags
                              ->pluck('name')
                              ->all();

        foreach ($this->normalizeTags($tags) as $tag) {
            $this->removeTag($tag);
        }

        return true;
    }

    /**
     * Add tags to entity, if any
     *
     * @param array $tags
     * @param $entityTags
     * @return self
     */
    protected function addTagsToEntity(array $tags, $entityTags): self
    {
        $add = array_diff($tags, $entityTags);

        if (! empty($add)) {
            $this->tag($add);
        }

        return $this;
    }

    /**
     * Return the entity class name
     *
     * @return string
     */
    protected function getEntityClassName(): string
    {
        return $this->tags()
                    ->getMorphClass();
    }

    /**
     * @param string $type
     *
     * @return mixed
     */
    protected function getEntityTags(string $type)
    {
        return $this->tags->pluck($type)->all();
    }

    /**
     * Remove tags from entity, if any
     *
     * @param array $tags
     * @param $entityTags
     *
     * @return $this
     */
    protected function removeTagsFromEntity(array $tags, $entityTags): self
    {
        $remove = array_diff($entityTags, $tags);

        if (! empty($remove)) {
            $this->untag($remove);
        }

        return $this;
    }

    /**
     * Split tags string into an array
     *
     * @param $tags
     *
     * @return array
     */
    protected function splitTags($tags): array
    {
        $delimiter = preg_quote(',;:|.', '#');

        return array_map('trim',
            preg_split(
                "#[{$delimiter}]#",
                $tags,
                null,
                PREG_SPLIT_NO_EMPTY
            )
        );
    }
}
