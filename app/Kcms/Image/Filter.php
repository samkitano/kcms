<?php

namespace App\Kcms\Image;

use Intervention\Image\Image;
use App\Kcms\Image\Filters\Sepia;
use Intervention\Image\Filters\FilterInterface;

class Filter extends BaseCommandRunner
{
    /** @var array */
    protected $availableFilters = [
        'sepia' => Sepia::class
    ];

    /**
     * Execute the command.
     *
     * @param  Image $image The source image.
     *
     * @return Image
     * @throws \Exception
     */
    public function run(Image $image): Image
    {
        $filter = $this->getFilter();

        if ($filter) {
            $image->filter($filter);
        }

        return $image->filter($filter);
    }

    /**
     * Get the filter instance
     *
     * @return FilterInterface
     * @throws \Exception
     */
    protected function getFilter(): FilterInterface
    {
        $filter = $this->filter[0];

        if (! isset($this->availableFilters[$filter])) {
            throw new \Exception("Filter {$filter} not available.");
        }

        return new $this->availableFilters[$filter];
    }
}
