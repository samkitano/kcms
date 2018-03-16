<?php

namespace App\Kcms\Image;

use App\Kcms\Image\Fit;
use App\Kcms\Image\Blur;
use App\Kcms\Image\Flip;
use App\Kcms\Image\Crop;
use App\Kcms\Image\Gamma;
use App\Kcms\Image\Filter;
use App\Kcms\Image\Invert;
use App\Kcms\Image\Rotate;
use App\Kcms\Image\Resize;
use App\Kcms\Image\Sharpen;
use App\Kcms\Image\Colorize;
use App\Kcms\Image\Contrast;
use App\Kcms\Image\Greyscale;
use App\Kcms\Image\Brightness;
use Intervention\Image\ImageManagerStatic as Image;

trait Manipulator
{
    /** @var array */
    protected static $manipulators = [
        'blur' => Blur::class,
        'brightness' => Brightness::class,
        'colorize' => Colorize::class,
        'contrast' => Contrast::class,
        'crop' => Crop::class,
        'fit' => Fit::class,
        'filter' => Filter::class,
        'flip' => Flip::class,
        'gamma' => Gamma::class,
        'greyscale' => Greyscale::class,
        'invert' => Invert::class,
        'resize' => Resize::class,
        'rotate' => Rotate::class,
        'sharpen' => Sharpen::class,
    ];

    public static function manipulate(Image $img, string $command, array $args): Image
    {
        $manipulator = new static::$manipulators[$command];
        $manipulator->setParams([$command => $args]);

        return $manipulator->run($img);
    }
}
