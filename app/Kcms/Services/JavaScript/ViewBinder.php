<?php

namespace App\Kcms\Services\JavaScript;

use Illuminate\Contracts\Events\Dispatcher;

class ViewBinder
{
    /**
     * @var Dispatcher
     */
    protected $event;

    /** @var mixed */
    protected $view = 'layouts.admin-master';

    /**
     * Create a new Laravel view binder instance.
     *
     * @param Dispatcher $event
     */
    public function __construct(Dispatcher $event)
    {
        $this->event = $event;
    }

    /**
     * Bind the given JavaScript to the view.
     *
     * @param string $js
     */
    public function bind($js)
    {
        $this->event->listen("composing: {$this->view}", function () use ($js) {
            echo '<script>'.$js.'</script>';
        });
    }
}
