<?php

namespace App\Kcms\Image;

use Intervention\Image\Image;

/**
 * Class BaseCommandRunner
 *
 * @property $flip
 * @property $rotate
 * @property $crop
 * @property $resize
 * @property $fit
 * @property $brightness
 * @property $contrast
 * @property $gamma
 * @property $colorize
 * @property $pixelate
 * @property $sharpen
 * @property $filter
 * @property $blur
 */
abstract class BaseCommandRunner implements CommandRunner
{
    public $params = [];

    /**
     * Set the command parameters.
     *
     * @param array $params The manipulation params.
     *
     * @return CommandRunner
     */
    public function setParams(array $params): CommandRunner
    {
        $this->params = $params;

        return $this;
    }

    /**
     * @param $name
     * @return mixed
     */
    public function __get($name)
    {
        if (array_key_exists($name, $this->params)) {
            return $this->params[$name];
        }
    }

    /**
     * Execute the command.
     *
     * @param  Image $image The source image.
     *
     * @return Image
     */
    abstract public function run(Image $image): Image;
}
