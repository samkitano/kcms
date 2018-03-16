<?php

namespace App\Kcms\Image;

use Intervention\Image\Image;

class Brightness extends BaseCommandRunner
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
            $image->brightness($level);
        }

        return $image;
    }

    /**
     * Get brightness level
     *
     * @return int
     */
    protected function getLevel(): int
    {
        return (int) $this->brightness[0];
    }
}
