<?php

namespace App\Http\Controllers\Admin;

use App\Article;
use App\Kcms\Transformers\ArticlesTransformer;
use App\Http\Controllers\Contracts\NamingContract;
use App\Kcms\Html\Presenters\Articles as Presenter;

/**
 * Class ArticlesController
 *
 * @property $transformer
 */
class ArticlesController extends ContentController implements NamingContract
{
    /** @var ArticlesTransformer*/
    protected $transformer;

    /**
     * ArticlesController constructor.
     *
     * @param ArticlesTransformer $transformer
     */
    public function __construct(ArticlesTransformer $transformer)
    {
        parent::__construct();

        $this->transformer = $transformer;
    }

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

    public function index()
    {
        $data = [
            'items' => $this->transformer->transform(
                Article::all(),
                $this->presentableKeys()
            ),
            'fields' => $this->presentable(),
        ];

        return $this->respond($data, __FUNCTION__);
    }

    protected function validationRules()
    {
        return [
            'title' => 'required|max:150|unique:articles,title',
        ];
    }

    protected function updateValidationRules($id)
    {
        return [
            'title' => "required|max:150|unique:articles,title,{$id}"
        ];
    }
}
