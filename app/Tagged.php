<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Tagged
 *
 * @property int    $id
 * @property string $taggable_type
 * @property int    $taggable_id
 * @property int    $tag_id
 * @method static   \Illuminate\Database\Eloquent\Builder|\App\Tagged whereId($value)
 * @method static   \Illuminate\Database\Eloquent\Builder|\App\Tagged whereTagId($value)
 * @method static   \Illuminate\Database\Eloquent\Builder|\App\Tagged whereTaggableId($value)
 * @method static   \Illuminate\Database\Eloquent\Builder|\App\Tagged whereTaggableType($value)
 * @mixin \Eloquent
 */
class Tagged extends Model
{
    /**
     * {@inheritdoc}
     */
    protected $table = 'tagged';

    /**
     * {@inheritdoc}
     */
    public $timestamps = false;
}
