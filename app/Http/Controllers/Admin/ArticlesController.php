<?php

namespace App\Http\Controllers\Admin;

use App\Article;

class ArticlesController extends Controller implements NamingContract
{
    /** @inheritdoc */
    public static function getMenuGroup(): string
    {
        return __('kcms.menu.content');
    }

    /** @inheritdoc */
    public static function getTitle($singular = false): string
    {
        return $singular
            ? __('kcms.menu.article')
            : __('kcms.menu.articles');
    }

    /**
     * Return the model fully qualified class name for the resource
     *
     * @return string
     */
    public function getModelName(): string
    {
        return Article::class;
    }

    public function index()
    {
        return view('admin.articles.index')
            ->with('articles', Article::all());
    }

    public function create()
    {
        return view('admin.articles.edit');
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

    public function up($id)
    {

    }

    public function down($id)
    {

    }

}
