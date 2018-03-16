<?php

namespace App\Kcms\Image;

use Intervention\Image\Image;

class Resize extends BaseCommandRunner
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
        $params = $this->getDimensions();

        if (empty($params)) {
            return $image;
        }

        $image->resize($params[0], $params[1]);

        return $image;
    }

    /**
     * Get the resize w,h dimensions
     *
     * @return array
     */
    protected function getDimensions(): array
    {
        $args = $this->resize;
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
