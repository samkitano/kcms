<?php

namespace App\Kcms\Html\ElementGenerator;

class Attributes
{
    /** @var array */
    protected $attributes;

    /** @var array */
    protected $items;

    /** @var string */
    protected $rendered;


    /**
     * Attributes constructor.
     *
     * @param $items
     */
    public function __construct($items)
    {
        $this->items = $items;
        $this->setAttributes();
        $this->rendered = $this->renderAttributes();
    }

    /**
     * @return string
     */
    public function getAttributes(): string
    {
        return $this->rendered;
    }

    /**
     * @return $this
     */
    protected function setAttributes(): self
    {
        if (is_null($this->items)) {
            return $this;
        }

        foreach ($this->items as $attribute => $value) {
            $this->setAttribute($attribute, (string) $value);
        }

        return $this;
    }

    /**
     * @param $attribute
     * @param null $value
     * @return $this
     */
    protected function setAttribute($attribute, $value = null): self
    {
        $this->attributes[$attribute] = $value;

        return $this;
    }

    /**
     * @return string
     */
    protected function renderAttributes(): string
    {
        if (empty($this->attributes)) {
            return '';
        }

        $res = [];

        foreach ($this->attributes as $attribute => $value) {
            if ($value === '') {
                $res[] = $attribute;
                continue;
            }

            $value = htmlentities($value, ENT_QUOTES, 'UTF-8', false);

            $res[] = "{$attribute}=\"{$value}\"";
        }

        return implode(' ', $res);
    }
}
