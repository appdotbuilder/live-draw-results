<?php

namespace Database\Factories;

use App\Models\DrawCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Draw>
 */
class DrawFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $winningNumbers = collect(range(1, 49))
            ->shuffle()
            ->take(6)
            ->sort()
            ->values()
            ->toArray();

        $specialNumbers = collect(range(1, 49))
            ->diff($winningNumbers)
            ->shuffle()
            ->take(1)
            ->values()
            ->toArray();

        return [
            'draw_category_id' => DrawCategory::factory(),
            'draw_number' => fake()->unique()->numerify('####/##'),
            'draw_type' => fake()->randomElement(['regular', 'special', 'mega', 'bonus']),
            'winning_numbers' => $winningNumbers,
            'special_numbers' => $specialNumbers,
            'draw_date' => fake()->dateTimeBetween('-6 months', '+1 month'),
            'status' => fake()->randomElement(['completed', 'live', 'pending']),
            'prize_pool' => fake()->randomFloat(2, 1000000, 50000000),
            'total_winners' => fake()->numberBetween(0, 1000),
            'prize_breakdown' => [
                'first_prize' => [
                    'winners' => fake()->numberBetween(0, 5),
                    'amount' => fake()->randomFloat(2, 5000000, 20000000)
                ],
                'second_prize' => [
                    'winners' => fake()->numberBetween(0, 20),
                    'amount' => fake()->randomFloat(2, 500000, 2000000)
                ],
                'third_prize' => [
                    'winners' => fake()->numberBetween(0, 50),
                    'amount' => fake()->randomFloat(2, 100000, 500000)
                ]
            ],
            'notes' => fake()->optional()->sentence(),
            'is_featured' => fake()->boolean(20),
        ];
    }

    /**
     * Indicate that the draw is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
            'draw_date' => fake()->dateTimeBetween('-6 months', '-1 day'),
        ]);
    }

    /**
     * Indicate that the draw is live.
     */
    public function live(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'live',
            'draw_date' => fake()->dateTimeBetween('now', '+2 hours'),
        ]);
    }

    /**
     * Indicate that the draw is featured.
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
            'status' => 'completed',
        ]);
    }

    /**
     * Indicate that the draw is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'draw_date' => fake()->dateTimeBetween('+1 day', '+1 week'),
            'winning_numbers' => [],
            'special_numbers' => null,
            'total_winners' => 0,
            'prize_breakdown' => null,
        ]);
    }
}