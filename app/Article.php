<?php

namespace App;

use App\Kcms\Services\Tag\Taggable;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Article
 *
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon $created_at
 * @property int            $id
 * @mixin \Eloquent
 * @property string $title
 * @property string|null $name
 * @property string|null $text
 * @property string|null $slug
 * @property string|null $seo
 * @property int $draft
 * @property string|null $published
 * @property int|null $parent_id
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Tag[] $tags
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Article whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Article whereDraft($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Article whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Article whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Article whereParentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Article wherePublished($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Article whereSeo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Article whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Article whereTag($tags, $type = 'slug')
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Article whereText($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Article whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Article whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Article withTag($tags, $type = 'slug')
 */
class Article extends Model
{
    use Taggable;

    protected $guarded = ['id'];

    public function drafts()
    {
        return $this->where('draft', '!=', true);
    }

    public function published()
    {
        return $this->whereNotNull('published');
    }
}
