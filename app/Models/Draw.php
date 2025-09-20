<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Draw
 *
 * @property int $id
 * @property int $draw_category_id
 * @property string $draw_number
 * @property string $draw_type
 * @property array $winning_numbers
 * @property array|null $special_numbers
 * @property \Illuminate\Support\Carbon $draw_date
 * @property string $status
 * @property string|null $prize_pool
 * @property int $total_winners
 * @property array|null $prize_breakdown
 * @property string|null $notes
 * @property bool $is_featured
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\DrawCategory $category
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Draw newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Draw newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Draw query()
 * @method static \Illuminate\Database\Eloquent\Builder|Draw whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Draw whereDrawCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Draw whereDrawDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Draw whereDrawNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Draw whereDrawType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Draw whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Draw whereIsFeatured($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Draw whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Draw wherePrizeBreakdown($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Draw wherePrizePool($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Draw whereSpecialNumbers($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Draw whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Draw whereTotalWinners($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Draw whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Draw whereWinningNumbers($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Draw completed()
 * @method static \Illuminate\Database\Eloquent\Builder|Draw featured()
 * @method static \Illuminate\Database\Eloquent\Builder|Draw live()
 * @method static \Illuminate\Database\Eloquent\Builder|Draw recent()
 * @method static \Database\Factories\DrawFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Draw extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'draw_category_id',
        'draw_number',
        'draw_type',
        'winning_numbers',
        'special_numbers',
        'draw_date',
        'status',
        'prize_pool',
        'total_winners',
        'prize_breakdown',
        'notes',
        'is_featured',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'winning_numbers' => 'array',
        'special_numbers' => 'array',
        'prize_breakdown' => 'array',
        'draw_date' => 'datetime',
        'is_featured' => 'boolean',
        'total_winners' => 'integer',
    ];

    /**
     * Get the category for this draw.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(DrawCategory::class, 'draw_category_id');
    }

    /**
     * Scope a query to only include completed draws.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    /**
     * Scope a query to only include live draws.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeLive($query)
    {
        return $query->where('status', 'live');
    }

    /**
     * Scope a query to only include featured draws.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Scope a query to get recent draws.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeRecent($query)
    {
        return $query->orderBy('draw_date', 'desc');
    }
}