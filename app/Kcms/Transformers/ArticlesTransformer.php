<?php

namespace App\Kcms\Transformers;

use App\Kcms\Html\Presenters\Articles;
use Illuminate\Database\Eloquent\Collection;

class ArticlesTransformer
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
     * @param $article
     * @return array
     */
    protected function transformSingle($article): array
    {
        $res = [];

        foreach ($this->transform as $transformable) {
            if (method_exists(Articles::class, $transformable)) {
                $res[$transformable] = Articles::$transformable($article);
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

        foreach ($collection as $article) {
            $transformed[] = $this->transformSingle($article);
        }

        return $transformed;
    }
}
