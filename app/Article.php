<?php

namespace App;

use Exception;
use App\Kcms\Orderable\Orderable;
use Illuminate\Support\Collection;
use App\Kcms\Services\Tag\Taggable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Article
 *
 * @property int                                                      $id
 * @property int                                                      $draft
 * @property int                                                      $priority
 * @property int|null                                                 $parent_id
 * @property string                                                   $url
 * @property string                                                   $title
 * @property string|null                                              $name
 * @property string|null                                              $text
 * @property string|null                                              $slug
 * @property string|null                                              $seo
 * @property string|null                                              $published
 * @property mixed                                                    $children
 * @property mixed                                                    $parent
 * @property mixed                                                    $first_child
 * @property \Carbon\Carbon                                           $updated_at
 * @property \Carbon\Carbon                                           $created_at
 * @property \Illuminate\Database\Eloquent\Collection                 $siblings
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Tag[] $tags
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Article  whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Article  whereDraft($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Article  whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Article  whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Article  whereParentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Article  wherePublished($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Article  whereSeo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Article  whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Article  whereTag($tags, $type = 'slug')
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Article  whereText($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Article  whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Article  whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Article  withTag($tags, $type = 'slug')
 * @mixin \Eloquent
 */
class Article extends Model
{
    use Taggable, Orderable;

    /** @var array */
    protected $guarded = ['id'];

    /** @var string */
    public static $orderCol = 'priority';

    /**
     * @return Article
     */
    public function drafts(): self
    {
        return $this->where('draft', '!=', true);
    }

    /**
     * @return Article
     */
    public function published(): self
    {
        return $this->whereNotNull('published');
    }

    /**
     * Return only parent articles
     *
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public static function parents()
    {
        return static::whereNull('parent_id')->get();
    }

    /**
     * Downwards relationship
     *
     * @return HasMany
     */
    public function children(): HasMany
    {
        return $this->hasMany(self::class, 'parent_id')
                    ->orderBy(static::$orderCol);
    }

    /**
     * Check if model has children
     *
     * @return bool
     */
    public function hasChildren(): bool
    {
        return count($this->children);
    }

    /**
     * Model's First child, if any
     *
     * @return Article
     * @throws Exception
     */
    public function getFirstChildAttribute(): self
    {
        if (! $this->hasChildren()) {
            throw new Exception("Article `{$this->id}` does not have children");
        }

        return $this->children
                    ->sortBy(static::$orderCol)
                    ->first();
    }

    /**
     * Model's siblings
     *
     * @return Collection
     */
    public function getSiblingsAttribute(): Collection
    {
        return self::where('parent_id', $this->parent_id)
                   ->orderBy(static::$orderCol)
                   ->get();
    }

    /**
     * Upwards relationship
     *
     * @return BelongsTo
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    /**
     * Check if model has a parent
     *
     * @return bool
     */
    public function hasParent(): bool
    {
        return ! is_null($this->parent_id);
    }

    /**
     * Return the URL for the article
     *
     * @return string
     */
    public function getUrlAttribute(): string
    {
        $parentSlug = $this->hasParent() ? $this->parent->slug.'/' : '';

        return "{$parentSlug}{$this->slug}";
    }
}
