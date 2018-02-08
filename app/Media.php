<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Media
 *
 * @property array $custom_properties
 * @property array $manipulations
 * @property int $id
 * @property int $model_id
 * @property string $model_type
 * @property string $album
 * @property string $disk
 * @property string $name
 * @property string $file_name
 * @property string|null $mime
 * @property int $size
 * @property string $props
 * @property int|null $order
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Model $model
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Media whereAlbum($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Media whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Media whereDisk($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Media whereFileName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Media whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Media whereManipulations($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Media whereMime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Media whereModelId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Media whereModelType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Media whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Media whereOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Media whereProps($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Media whereSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Media whereUpdatedAt($value)
 * @mixin \Illuminate\Database\Eloquent\Model
 */
class Media extends Model
{
    protected $guarded = [];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'manipulations' => 'array',
        'custom_properties' => 'array',
    ];

    /**
     * Create the polymorphic relation.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function model()
    {
        return $this->morphTo();
    }

}
