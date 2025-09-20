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
        Schema::create('draw_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Category name (e.g., Mark Six, Lucky Numbers)');
            $table->string('slug')->unique()->comment('URL-friendly category identifier');
            $table->text('description')->nullable()->comment('Category description');
            $table->string('color', 7)->default('#3B82F6')->comment('Hex color for category display');
            $table->json('draw_schedule')->nullable()->comment('JSON schedule information');
            $table->boolean('is_active')->default(true)->comment('Whether category is currently active');
            $table->integer('sort_order')->default(0)->comment('Display order');
            $table->timestamps();
            
            // Indexes
            $table->index('slug');
            $table->index('is_active');
            $table->index('sort_order');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('draw_categories');
    }
};