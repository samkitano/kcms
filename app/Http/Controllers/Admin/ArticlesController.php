<?php

namespace App\Http\Controllers\Admin;

use App\Article;
use App\Http\Controllers\Contracts\NamingContract;

class ArticlesController extends ContentController implements NamingContract
{
    /** @inheritdoc */
    public static function getMenuGroup(): string
    {
        return __t('menu.content');
    }

    /** @inheritdoc */
    public static function getTitle($singular = false): string
    {
        return $singular
            ? __t('menu.article')
            : __t('menu.articles');
    }

    /** @inheritdoc */
    public function getContentModel(): string
    {
        return Article::class;
    }

    /**
     * @return $this
     */
    public function index()
    {
        return view('admin.articles.index')
            ->with('articles', Article::parents());
    }

    /**
     * @return $this
     */
    public function create()
    {
        $model = $this->make();

        return view('admin.articles.edit')->with('id', $model->id);
    }

    public function store()
    {

    }

    public function edit($id)
    {
        return view('admin.articles.edit')
            ->with('article', Article::findOrFail($id));
    }

    public function update($id)
    {

    }

    public function destroy($id)
    {

    }


}
