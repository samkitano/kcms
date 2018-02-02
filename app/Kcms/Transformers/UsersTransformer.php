<?php

namespace App\Kcms\Transformers;

use App\Kcms\Html\Presenters\Users;
use Illuminate\Database\Eloquent\Collection;

class UsersTransformer
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
     * @param $user
     * @return array
     */
    protected function transformSingle($user): array
    {
        $res = [];

        foreach ($this->transform as $transformable) {
            if (method_exists(Users::class, $transformable)) {
                $res[$transformable] = Users::$transformable($user);
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

        foreach ($collection as $user) {
            $transformed[] = $this->transformSingle($user);
        }

        return $transformed;
    }
}
