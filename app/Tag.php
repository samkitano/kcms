<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;

/**
 * App\Tag
 *
 * @property int                                                           $id
 * @property string                                                        $model
 * @property string                                                        $slug
 * @property string                                                        $name
 * @property int                                                           $count
 * @property-read   \Illuminate\Database\Eloquent\Model                    $taggable
 * @property-read   \Illuminate\Database\Eloquent\Collection|\App\Tagged[] $tagged
 * @method static   \Illuminate\Database\Eloquent\Builder|\App\Tag         name($name)
 * @method static   \Illuminate\Database\Eloquent\Builder|\App\Tag         slug($slug)
 * @method static   \Illuminate\Database\Eloquent\Builder|\App\Tag         whereCount($value)
 * @method static   \Illuminate\Database\Eloquent\Builder|\App\Tag         whereId($value)
 * @method static   \Illuminate\Database\Eloquent\Builder|\App\Tag         whereModel($value)
 * @method static   \Illuminate\Database\Eloquent\Builder|\App\Tag         whereName($value)
 * @method static   \Illuminate\Database\Eloquent\Builder|\App\Tag         whereSlug($value)
 * @mixin           \Illuminate\Database\Eloquent\Model
 */
class Tag extends Model
{
    /** {@inheritdoc} */
    protected $table = 'tags';

    /** {@inheritdoc} */
    public $timestamps = false;

    /** {@inheritdoc} */
    protected $fillable = [
        'name',
        'slug',
        'count',
        'model',
    ];

    /** {@inheritdoc} */
    public function delete()
    {
        if ($this->exists) {
            $this->tagged()->delete();
        }

        return parent::delete();
    }

    /**
     * Return the relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function taggable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Return tagged entities
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function tagged(): HasMany
    {
        return $this->hasMany(Tagged::class, 'tag_id');
    }

    /**
     * Find tag by name.
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @param  string                                $name
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeName(Builder $query, string $name): Builder
    {
        return $query->where('name', '=', $name);
    }

    /**
     * Find tag by slug
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @param  string                                $slug
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSlug(Builder $query, string $slug): Builder
    {
        return $query->where('slug', '=', $slug);
    }
}
