<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('draws', function (Blueprint $table) {
            $table->id();
            $table->string('draw_number', 50)->unique()->comment('Unique draw number identifier');
            $table->string('draw_type', 50)->default('regular')->comment('Type of draw (regular, special, etc.)');
            $table->json('winning_numbers')->comment('JSON array of winning numbers');
            $table->json('special_numbers')->nullable()->comment('JSON array of special/bonus numbers');
            $table->dateTime('draw_date')->comment('Official draw date and time');
            $table->string('status', 20)->default('pending')->comment('Draw status: pending, live, completed, cancelled');
            $table->decimal('prize_pool', 15, 2)->nullable()->comment('Total prize pool amount');
            $table->integer('total_winners')->default(0)->comment('Total number of winners');
            $table->json('prize_breakdown')->nullable()->comment('JSON breakdown of prizes by category');
            $table->text('notes')->nullable()->comment('Additional notes about the draw');
            $table->boolean('is_featured')->default(false)->comment('Whether this draw should be featured');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('draw_number');
            $table->index('draw_date');
            $table->index('status');
            $table->index('draw_type');
            $table->index(['status', 'draw_date']);
            $table->index(['is_featured', 'draw_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('draws');
    }
};