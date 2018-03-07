<?php

namespace App\Http\Controllers\Admin;

use App\Article;
use App\Kcms\Transformers\ArticlesTransformer;
use App\Http\Controllers\Contracts\NamingContract;

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

    /** @inheritdoc */
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

    /**
     * Validation rules for creation
     *
     * @return array
     */
    protected function validationRules()
    {
        return [
            'title' => 'required|max:150|unique:articles,title',
        ];
    }

    /**
     * Validation rules for updates
     *
     * @param $id
     * @return array
     */
    protected function updateValidationRules($id)
    {
        return [
            'title' => "required|max:150|unique:articles,title,{$id}"
        ];
    }
}
