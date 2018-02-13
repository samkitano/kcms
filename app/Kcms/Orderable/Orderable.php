<?php

namespace App\Kcms\Orderable;

use ArrayAccess;
use InvalidArgumentException;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Database\Eloquent\Builder as Builder;

trait Orderable
{
    /** @var string */
    public static $orderCol = 'priority';

    /**
     * Determine the max available order value
     *
     * @param null|int $parent_id
     *
     * @return int
     */
    public static function maxOrder($parent_id = null): int
    {
        return is_null($parent_id)
            ? (int) static::max(static::$orderCol)
            : (int) static::where('parent_id', $parent_id)
                          ->max(static::$orderCol);
    }

    /**
     * Swap order between models
     *
     * @param Model $model
     * @param Model $otherModel
     */
    public static function swap(Model $model, Model $otherModel)
    {
        $model->swapWith($otherModel);
    }

    /**
     * Set a new ordering sequence
     *
     * @param array|ArrayAccess $ids
     * @param int               $start
     */
    public static function setNewOrder($ids, int $start = 1)
    {
        if (! is_array($ids) && ! $ids instanceof ArrayAccess) {
            throw new InvalidArgumentException('setNewOrder requires an array or an ArrayAccess object as a parameter');
        }

        $model = new static;
        $primaryKey = $model->getKeyName();

        foreach ($ids as $id) {
            static::withoutGlobalScope(SoftDeletingScope::class)
                  ->where($primaryKey, $id)
                  ->update([static::$orderCol => $start++]);
        }
    }

    /**
     * The model will have the maximum order value
     */
    public function setMaxOrder()
    {
        $this->{static::$orderCol} = static::maxOrder($this->parent_id) + 1;
    }

    /**
     * Return the maximum assigned order value
     *
     * @return int
     */
    public function getMaxOrder(): int
    {
        return (int) static::query()
                           ->max(static::$orderCol);
    }

    /**
     * Set the scope for the odered model
     *
     * @param Builder $query
     * @param string  $direction
     *
     * @return Builder
     */
    public function scopeOrdered(Builder $query, string $direction = 'asc'): Builder
    {
        return $query->orderBy(static::$orderCol, $direction);
    }

    /**
     * Move the current model down by 1 position
     *
     * @return self
     */
    public function down(): self
    {
        $model = static::query()
                       ->limit(1)
                       ->ordered()
                       ->where(static::$orderCol, '>', $this->{static::$orderCol})
                       ->first();

        if (! $model) {
            return $this;
        }

        return $this->swapWith($model);
    }

    /**
     * Move the current model up by 1 position
     *
     * @return self
     */
    public function up(): self
    {
        $model = static::query()
                       ->limit(1)
                       ->ordered('desc')
                       ->where(static::$orderCol, '<', $this->{static::$orderCol})
                       ->first();

        if (! $model) {
            return $this;
        }

        return $this->swapWith($model);
    }

    /**
     * Swap current model with a provided one
     *
     * @param Model $model
     *
     * @return self
     */
    public function swapWith(Model $model): self
    {
        $old = $model->{static::$orderCol};

        $model->{static::$orderCol} = $this->{static::$orderCol};
        $model->save();

        $this->{static::$orderCol} = $old;
        $this->save();

        return $this;
    }

    /**
     * Move current model to the first order position (1)
     *
     * @return self
     */
    public function toTop(): self
    {
        $firstModel = static::query()
                            ->limit(1)
                            ->ordered()
                            ->first();

        if ($firstModel->id === $this->id) {
            return $this;
        }

        $this->priority = $firstModel->{static::$orderCol};
        $this->save();

        static::query()
              ->where($this->getKeyName(), '!=', $this->id)
              ->increment(static::$orderCol);

        return $this;
    }

    /**
     * Move current model to the last order position
     *
     * @return self
     */
    public function toBottom(): self
    {
        $max = $this->getMaxOrder();

        if ($this->{static::$orderCol} === $max) {
            return $this;
        }

        $this->{static::$orderCol} = $max;
        $this->save();

        static::query()
              ->where($this->getKeyName(), '!=', $this->id)
              ->decrement(static::$orderCol);

        return $this;
    }
}
