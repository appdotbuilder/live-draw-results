<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\DrawCategory
 *
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property string|null $description
 * @property string $color
 * @property array|null $draw_schedule
 * @property bool $is_active
 * @property int $sort_order
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Draw> $draws
 * @property-read int|null $draws_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|DrawCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DrawCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DrawCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|DrawCategory whereColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DrawCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DrawCategory whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DrawCategory whereDrawSchedule($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DrawCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DrawCategory whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DrawCategory whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DrawCategory whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DrawCategory whereSortOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DrawCategory whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DrawCategory active()
 * @method static \Database\Factories\DrawCategoryFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class DrawCategory extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'color',
        'draw_schedule',
        'is_active',
        'sort_order',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'draw_schedule' => 'array',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    /**
     * Get the draws for this category.
     */
    public function draws(): HasMany
    {
        return $this->hasMany(Draw::class);
    }

    /**
     * Scope a query to only include active categories.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}