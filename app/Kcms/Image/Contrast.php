<?php

namespace App\Kcms\Image;

use Intervention\Image\Image;

class Contrast extends BaseCommandRunner
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
            $image->contrast($level);
        }

        return $image;
    }

    /**
     * Get contrast level
     *
     * @return int
     */
    protected function getLevel(): int
    {
        return (int) $this->contrast[0];
    }
}
