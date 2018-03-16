<?php

namespace App\Kcms\Image;

use Intervention\Image\Image;

class Sharpen extends BaseCommandRunner
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
        return $image->sharpen($this->getAmmount());
    }

    protected function getAmmount(): int
    {
        return (int) $this->sharpen[0];
    }
}
