<?php

namespace App\Kcms\Image;

use Intervention\Image\Image;

class Rotate extends BaseCommandRunner
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
        $rotation = $this->getRotation();

        if ($rotation) {
            $image->rotate($rotation);
        }

        return $image;
    }

    /**
     * Get the rotation angle
     *
     * @return int
     */
    protected function getRotation(): int
    {
        $rotate = implode($this->rotate);

        return (int) $rotate;
    }
}
