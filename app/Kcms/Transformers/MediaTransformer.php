<?php

namespace App\Kcms\Transformers;

use App\Kcms\Html\Presenters\Media;
use Illuminate\Database\Eloquent\Collection;

class MediaTransformer
{
    /**
     * @var array
     */
    protected $transform = [];

    /**
     * @param $data
     * @param $transform
     * @return array
     */
    public function transform($data, $transform)
    {
        $this->transform = $transform;

        if ($data instanceof Collection) {
            return static::transformCollection($data);
        }

        return static::transformSingle($data);
    }

    /**
     * @param $media
     * @return array
     */
    protected function transformSingle($media): array
    {
        $res = [];

        foreach ($this->transform as $transformable) {
            if (method_exists(Media::class, $transformable)) {
                $res[$transformable] = Media::$transformable($media);
            }
        }

        return $res;
    }

    /**
     * @param $collection
     * @return array
     */
    protected function transformCollection($collection): array
    {
        $transformed = [];

        foreach ($collection as $media) {
            $transformed[] = $this->transformSingle($media);
        }

        return $transformed;
    }
}
