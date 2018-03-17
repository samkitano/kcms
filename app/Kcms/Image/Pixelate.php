<?php

namespace App\Kcms\Image;

use Intervention\Image\Image;

class Pixelate extends BaseCommandRunner
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
        return $image->pixelate($this->getLevel());
    }

    /**
     * Get the pixelization level (pixel size)
     *
     * @return int
     */
    protected function getLevel():int
    {
        return (int) $this->pixelate[0];
    }
}
