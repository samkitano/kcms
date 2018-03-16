<?php

namespace App\Kcms\Image;

use Intervention\Image\Image;

class Blur extends BaseCommandRunner
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
        return $image->blur($this->getAmmount());
    }

    /**
     * Get the blurring ammount
     *
     * @return int
     */
    protected function getAmmount()
    {
        return (int) $this->blur[0];
    }
}
