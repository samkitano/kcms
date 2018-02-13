<?php

namespace App\Http\Controllers\Admin;

abstract class ContentController extends AdminBaseController
{
    /**
     * Get the current content model
     *
     * @return string
     */
    public abstract function getContentModel(): string;

    /**
     * Get the proper member model class
     *
     * @return string
     */
    public function getModelClass()
    {
        return $this->getContentModel();
    }

    /**
     * @return \Illuminate\Http\RedirectResponse
     */
    public function up()
    {
        $this->model::find(request()->id_up)->up();

        return back();
    }

    /**
     * @return \Illuminate\Http\RedirectResponse
     */
    public function down()
    {
        $this->model::find(request()->id_down)->down();

        return back();
    }

    /**
     * @return \Illuminate\Http\RedirectResponse
     */
    public function top()
    {
        $this->model::find(request()->id_top)->toTop();

        return back();
    }

    /**
     * @return \Illuminate\Http\RedirectResponse
     */
    public function bottom()
    {
        $this->model::find(request()->id_bottom)->toBottom();

        return back();
    }

    /**
     * @return $this|\Illuminate\Database\Eloquent\Model
     */
    protected function make()
    {
        return $this->model::create();
    }
}
