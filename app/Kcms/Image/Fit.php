<?php

namespace App\Kcms\Image;

use Intervention\Image\Image;

class Fit extends BaseCommandRunner
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
        $coords = $this->getDimensions();

        if (empty($coords)) {
            return $image;
        }

        return $image->fit($coords[0], $coords[1]);
    }

    /**
     * Get the fit w,h dimensions
     *
     * @return array
     */
    protected function getDimensions(): array
    {
        $args = $this->fit;
        $res = [];

        if (empty($args) || sizeof($args) < 2) {
            return [];
        }

        foreach ($args as $arg) {
            $res[] = (int) $arg;
        }

        return $res;
    }
}
