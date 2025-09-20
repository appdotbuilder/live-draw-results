<?php

namespace Database\Seeders;

use App\Models\Draw;
use App\Models\DrawCategory;
use Illuminate\Database\Seeder;

class DrawSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create draw categories
        $categories = [
            [
                'name' => 'Mark Six',
                'slug' => 'mark-six',
                'description' => 'Hong Kong\'s premier lottery draw with 6 winning numbers plus 1 special number.',
                'color' => '#EF4444',
                'draw_schedule' => [
                    'days' => ['tuesday', 'thursday', 'saturday'],
                    'time' => '21:30',
                    'timezone' => 'Asia/Hong_Kong'
                ],
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Lucky Numbers',
                'slug' => 'lucky-numbers',
                'description' => 'Daily draw featuring 5 lucky numbers with bonus prizes.',
                'color' => '#F59E0B',
                'draw_schedule' => [
                    'days' => ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
                    'time' => '20:00',
                    'timezone' => 'Asia/Hong_Kong'
                ],
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Dragon Draw',
                'slug' => 'dragon-draw',
                'description' => 'Special weekly draw with enhanced prize pools and unique number combinations.',
                'color' => '#10B981',
                'draw_schedule' => [
                    'days' => ['sunday'],
                    'time' => '22:00',
                    'timezone' => 'Asia/Hong_Kong'
                ],
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Golden Balls',
                'slug' => 'golden-balls',
                'description' => 'Premium lottery with the highest jackpots and exclusive prizes.',
                'color' => '#8B5CF6',
                'draw_schedule' => [
                    'days' => ['wednesday', 'saturday'],
                    'time' => '21:00',
                    'timezone' => 'Asia/Hong_Kong'
                ],
                'is_active' => true,
                'sort_order' => 4,
            ]
        ];

        foreach ($categories as $categoryData) {
            $category = DrawCategory::create($categoryData);

            // Create historical completed draws
            Draw::factory()
                ->count(50)
                ->completed()
                ->for($category)
                ->create();

            // Create a few featured draws
            Draw::factory()
                ->count(3)
                ->featured()
                ->for($category)
                ->create();

            // Create some live draws
            Draw::factory()
                ->count(1)
                ->live()
                ->for($category)
                ->create();

            // Create upcoming pending draws
            Draw::factory()
                ->count(2)
                ->pending()
                ->for($category)
                ->create();
        }
    }
}