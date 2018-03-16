<?php

namespace App\Kcms\Image;

use Intervention\Image\Image;

class Flip extends BaseCommandRunner
{
    /** @var array */
    protected $flips = ['h', 'v', 'b'];

    /**
     * Execute the command.
     *
     * @param  Image $image The source image.
     *
     * @return Image
     */
    public function run(Image $image): Image
    {
        $flip = $this->getFlip();

        if ($flip) {
            if ($flip === 'b') {
                return $image->flip('h')->flip('v');
            }

            $image->flip($flip);
        }

        return $image;
    }

    /**
     * Get flip parameters
     *
     * @return string|false
     */
    protected function getFlip()
    {
        $flip = implode($this->flip);

        if (in_array($flip, $this->flips, true)) {
            return $flip;
        }

        return false;
    }
}
