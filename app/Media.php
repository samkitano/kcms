<?php

namespace App;

use App\Kcms\Orderable\Orderable;
use Illuminate\Database\Eloquent\Model;
use App\Kcms\Contracts\KcmsModelContract;

/**
 * App\Media
 *
 * @property array $custom_properties
 * @property array $manipulations
 * @property int $id
 * @property int $model_id
 * @property string $model_type
 * @property string $thumbs
 * @property string $album
 * @property string $description
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
class Media extends Model implements KcmsModelContract
{
    use Orderable;
    
    protected $guarded = [];

    /** @inheritdoc */
    public static function presentable(): array
    {
        return [
            'name' => [
                'sortable' => true,
                'label' => __t('media.name')
            ],
            'description' => [
                'sortable' => true,
                'label' => __t('media.description')
            ],
            'album' => [
                'sortable' => false,
                'label' => __t('media.album')
            ],
//            'file_name' => [
//                'sortable' => true,
//                'label' => __t('media.file_name')
//            ],
            'mime' => [
                'sortable' => true,
                'label' => __t('media.mime')
            ],
            'size' => [
                'sortable' => true,
                'label' => __t('media.size')
            ],
//            'order' => [
//                'sortable' => false,
//                'label' => __t('media.order')
//            ],
        ];
    }

    /** @inheritdoc */
    public static function editable($id = null): array
    {
        return [
            'description' => [
                'editable' => true,
                'help' => '',
                'label' => __t('media.description'),
                'state' => '',
                'type' => 'text',
                'tag' => 'input',
                'value' => '',
                'required' => false
            ],
            'album' => [
                'editable' => true,
                'help' => '',
                'label' => __t('media.album'),
                'state' => '',
                'type' => 'choice',
                'tag' => 'select2',
                'multiple' => false,
                'allow_new' => true,
                'placeholder' => __t('media.select_album'),
                'default' => '',
                'value' => '',
                'options' => static::getAlbumList(),
            ],
            'name' => [
                'editable' => true,
                'help' => '',
                'label' => __t('media.name'),
                'state' => '',
                'type' => 'text',
                'tag' => 'input',
                'default' => '',
                'value' => '',
                'required' => true,
            ],
        ];
    }

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'manipulations' => 'array',
        'props' => 'array',
        'thumbs' => 'array',
    ];

    protected static function getAlbumList()
    {
        $res = [];
        $list = Media::get(['album']);

        foreach ($list as $item) {
            if (! in_array($item->album, $res) && $item->album !== config('kcms.default_media_album')) {
                $res[] = $item->album;
            }
        }

        return $res;
    }
}
