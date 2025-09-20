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
        Schema::table('draws', function (Blueprint $table) {
            $table->foreignId('draw_category_id')->after('id')->constrained()->onDelete('cascade');
            $table->index('draw_category_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('draws', function (Blueprint $table) {
            $table->dropForeign(['draw_category_id']);
            $table->dropColumn('draw_category_id');
        });
    }
};