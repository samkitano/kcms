<?php

namespace App\Kcms\Traits;

use Illuminate\Support\Str;

trait Sluggable
{
    /**
     * @param string $str
     *
     * @return string
     */
    public function slug(string $str): string
    {
        return $this->generateTagSlug($str);
    }

    /**
     * Generate the tag slug
     *
     * @param  string $name
     *
     * @return string
     */
    protected function generateTagSlug($name): string
    {
        return Str::slug($name);
    }
}
