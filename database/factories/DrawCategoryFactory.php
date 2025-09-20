<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DrawCategory>
 */
class DrawCategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->randomElement([
            'Mark Six',
            'Lucky Numbers',
            'Super Draw',
            'Dragon Draw',
            'Golden Balls',
            'Fortune Wheel'
        ]);

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => fake()->paragraph(),
            'color' => fake()->randomElement(['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899']),
            'draw_schedule' => [
                'days' => fake()->randomElements(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'], random_int(2, 4)),
                'time' => fake()->time('H:i'),
                'timezone' => 'Asia/Hong_Kong'
            ],
            'is_active' => fake()->boolean(90),
            'sort_order' => fake()->numberBetween(1, 10),
        ];
    }

    /**
     * Indicate that the category is featured.
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => true,
            'sort_order' => 1,
        ]);
    }

    /**
     * Indicate that the category is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}