<?php

namespace App;

use App\Kcms\Services\Tag\Taggable;
use Illuminate\Database\Eloquent\Model;
use App\Kcms\Contracts\KcmsModelContract;

/**
 * App\Article
 *
 * @property int                                                      $id
 * @property int                                                      $draft
 * @property string                                                   $title
 * @property string|null                                              $name
 * @property string|null                                              $text
 * @property string|null                                              $slug
 * @property string|null                                              $seo
 * @property \Carbon\Carbon|null                                      $published
 * @property \Carbon\Carbon                                           $updated_at
 * @property \Carbon\Carbon                                           $created_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Tag[] $tags
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Article  whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Article  whereDraft($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Article  whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Article  whereName($value)
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
class Article extends Model implements KcmsModelContract
{
    use Taggable;

    /** @var array */
    protected $guarded = ['id'];

    /** @inheritdoc */
    public static function presentable(): array
    {
        return [
            'title' => [
                'sortable' => true,
                'label' => __t('articles.title')
            ],
            'tags' => [
                'sortable' => false,
                'label' => __t('articles.tags')
            ],
            'status' => [
                'sortable' => true,
                'label' => __t('articles.state')
            ],
            'updated' => [
                'sortable' => true,
                'label' => __t('articles.updated')
            ],
        ];
    }

    /** @inheritdoc */
    public static function editable($id = null): array
    {
        return [
            'title' => [
                'editable' => true,
                'help' => '',
                'label' => __t('articles.title'),
                'state' => '',
                'type' => 'text',
                'tag' => 'input',
                'value' => '',
                'required' => true
            ],
            'tags' => [
                'editable' => true,
                'help' => '',
                'label' => __t('articles.tags'),
                'state' => '',
                'type' => 'choice',
                'tag' => 'select2',
                'multiple' => true,
                'allow_new' => true,
                'placeholder' => __t('articles.select_tags'),
                'default' => [],
                'value' => [],
                'options' => static::listTagOptions(),
            ],
            'published' => [
                'editable' => true,
                'help' => '',
                'label' => __t('articles.status'),
                'state' => '',
                'type' => 'confirm',
                'tag' => 'checkbox',
                'checkedTxt' => __t('articles.published'),
                'unckeckedTxt' => __t('articles.draft'),
                'value' => false,
            ],
            'text' => [
                'editable' => true,
                'help' => '',
                'label' => __t('articles.text'),
                'state' => '',
                'type' => 'text',
                'tag' => 'textarea',
                'default' => '',
                'value' => '',
            ]
        ];
    }

    /**
     * @return Article
     */
    public function drafts(): self
    {
        return $this->whereNull('published');
    }

    /**
     * @return Article
     */
    public function published(): self
    {
        return $this->whereNotNull('published');
    }

    /**
     * @return bool
     */
    public function getDraftAttribute(): bool
    {
        return null === $this->published;
    }

    public function gatStateAttribute()
    {
        return $this->draft ? __t('articles.draft') : __t('articles.published');
    }

    protected static function listTagOptions()
    {
        $tags = Tag::all();
        $res = [];

        foreach ($tags as $tag) {
            $res[$tag->id] = $tag->name;
        }

        return $res;
    }
}
