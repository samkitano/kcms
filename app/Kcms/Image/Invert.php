<?php

namespace App\Kcms\Image;

use Intervention\Image\Image;

class Invert extends BaseCommandRunner
{
    /**
     * Execute the command.
     *
     * @param  Image $image The source image.
     *
     * @return Image
     */
    public function run(Image $image): Image
    {
        return $image->invert();
    }
}
