<?php

namespace App\Kcms\Image;

use Intervention\Image\Image;

interface CommandRunner
{
    /**
     * Set the command parameters.
     *
     * @param array $params The manipulation params.
     *
     * @return CommandRunner
     */
    public function setParams(array $params): CommandRunner;

    /**
     * Execute the command.
     *
     * @param  Image $image The source image.
     *
     * @return Image
     */
    public function run(Image $image): Image;
}
