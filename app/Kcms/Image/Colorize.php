<?php

namespace App\Kcms\Image;

use Intervention\Image\Image;

class Colorize extends BaseCommandRunner
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
        $rgb = $this->getRGBvalues();

        return $image->colorize($rgb[0], $rgb[1], $rgb[2]);
    }

    /**
     * Get the rgb values for colorize
     *
     * @return array
     */
    protected function getRGBvalues(): array
    {
        $rgb = $this->colorize;

        return [(int) $rgb[0], (int) $rgb[1], (int) $rgb[2]];
    }
}
