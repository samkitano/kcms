<?php

namespace App\Kcms\Image;

use Intervention\Image\Image;

class Crop extends BaseCommandRunner
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
        $params = $this->getCoordinates();

        if (empty($params)) {
            return $image;
        }

        $image->crop($params[0], $params[1], $params[2], $params[3]);

        return $image;
    }

    /**
     * Get the crop w,h|x,y dimensions|coordinates
     *
     * @return array
     */
    protected function getCoordinates(): array
    {
        $args = $this->crop;
        $res = [];

        if (empty($args) || sizeof($args) < 2) {
            return [];
        }

        if (sizeof($args) === 2) {
            $args[] = 0; /* x */
            $args[] = 0; /* y */
        }

        foreach ($args as $arg) {
            $res[] = (int) $arg;
        }

        return $res;
    }
}
