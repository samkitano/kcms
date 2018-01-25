<?php

namespace App\Kcms\Html\ElementGenerator;

use Illuminate\Support\HtmlString;
use Illuminate\Contracts\Support\Htmlable;
use App\Kcms\Html\Exceptions\TagCanNotHaveContentException;

/**
 * Class Tag
 * @package App\Kcms\Html\ElementGenerator
 */
class Tag implements Htmlable
{
    use Tags;

    /**
     * @var string
     */
    protected $tag;
    protected $attributes;
    protected $content;

    /**
     * @var array
     */
    protected $void = [
        'area', 'base', 'br', 'col', 'embed', 'hr',
        'img', 'input', 'keygen', 'link', 'menuitem',
        'meta', 'param', 'source', 'track', 'wbr',
    ];

    /**
     * Tag constructor.
     *
     * @param                 $tag
     * @param                 $attributes
     * @param string|Tag $content
     */
    public function __construct($tag, $attributes, $content = '')
    {
        $this->tag = $tag;

        if (! is_array($attributes)) {
            $content = $attributes;
            $attributes = null;
        }

        $this->content = $content;
        $attrs = new Attributes($attributes);
        $this->attributes = $attrs->getAttributes();
    }

    /**
     * @return HtmlString
     * @throws TagCanNotHaveContentException
     */
    protected function render(): HtmlString
    {
        if ($this->isVoid() && (! empty($this->content))) {
            throw new TagCanNotHaveContentException("Tag {$this->tag} is void and can not have a content.");
        }

        $rendered = empty($this->attributes)
            ? "<{$this->tag}>"
            : "<{$this->tag} {$this->attributes}>";

        return new HtmlString($rendered.$this->content.$this->close());
    }

    /**
     * @return HtmlString
     */
    protected function close(): HtmlString
    {
        return new HtmlString(
            $this->isVoid()
                ? ''
                : "</{$this->tag}>"
        );
    }

    /**
     * @return bool
     */
    protected function isVoid(): bool
    {
        return in_array($this->tag, $this->void);
    }

    /**
     * @return string
     * @throws TagCanNotHaveContentException
     */
    public function toHtml(): string
    {
        return $this->render();
    }

    /**
     * @return string
     * @throws TagCanNotHaveContentException
     */
    public function __toString(): string
    {
        return $this->toHtml();
    }
}
