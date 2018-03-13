<?php

namespace App\Kcms\Observers;

use App\Media;
use App\Kcms\Orderable\Orderable;
use App\Kcms\Media\Manipulations;

class MediaObserver
{
    use Orderable, Manipulations;

    /**
     * Ops to perform when a medium is being created
     *
     * @param Media $media
     */
    public function creating(Media $media)
    {
        //
    }

    /**
     * Ops to perform immediately after a medium was created
     *
     * @param Media $media
     */
    public function created(Media $media)
    {
        $data = $this->makeThumbs($media);

        $media->props = $data['props'];
        $media->manipulations = $data['manipulations'];
        $media->thumbs = $data['thumbs'];

        $media->save();
    }
}
