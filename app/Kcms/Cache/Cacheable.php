<?php

namespace App\Kcms\Cache;

trait Cacheable
{
    /**
     * @param $tag
     * @param $key
     * @param $value
     *
     * @return mixed
     * @throws \Exception
     */
    public function remember($tag, $key, $value)
    {
        if (config('cache.default') === 'redis' || config('cache.default') === 'memcache') {
            return cache()->tags($tag)
                ->rememberForever($key, $value);
        } else {
            return cache()->rememberForever($tag.'.'.$key, $value);
        }
    }

    /**
     * @param $tag
     * @param $key
     *
     * @throws \Exception
     */
    public function forget($tag, $key)
    {
        if (config('cache.default') === 'redis' || config('cache.default') === 'memcache') {
            cache()->tags($tag)->flush();
        } else {
            cache()->forget($tag.'.'.$key);
        }
    }
}
