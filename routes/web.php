<?php

use App\Http\Controllers\Admin\DrawController as AdminDrawController;
use App\Http\Controllers\DrawController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Main draws page on home route
Route::get('/', [DrawController::class, 'index'])->name('home');

// Individual draw details
Route::get('/draws/{draw}', [DrawController::class, 'show'])->name('draws.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Admin routes for managing draws
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('draws', AdminDrawController::class);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
