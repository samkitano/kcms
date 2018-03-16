<?php

namespace App\Kcms\Image;

use Intervention\Image\Image;

class Gamma extends BaseCommandRunner
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
        $level = $this->getLevel();

        if ($level) {
            $image->gamma($level);
        }

        return $image;
    }

    /**
     * Get the gamma correction level
     *
     * @return float
     */
    protected function getLevel(): float
    {
        return (float) $this->gamma[0];
    }
}
