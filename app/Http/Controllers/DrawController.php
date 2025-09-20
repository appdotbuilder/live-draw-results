<?php

namespace App\Http\Controllers;

use App\Models\Draw;
use App\Models\DrawCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DrawController extends Controller
{
    /**
     * Display the main draws page.
     */
    public function index(Request $request)
    {
        $query = Draw::with('category')->recent();

        // Apply filters
        if ($request->filled('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('draw_number')) {
            $query->where('draw_number', 'like', '%' . $request->draw_number . '%');
        }

        if ($request->filled('date_from')) {
            $query->whereDate('draw_date', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('draw_date', '<=', $request->date_to);
        }

        $draws = $query->paginate(20)->withQueryString();

        $categories = DrawCategory::active()
            ->orderBy('sort_order')
            ->get(['id', 'name', 'slug', 'color']);

        $liveDraws = Draw::with('category')
            ->live()
            ->orderBy('draw_date')
            ->limit(5)
            ->get();

        $featuredDraws = Draw::with('category')
            ->featured()
            ->completed()
            ->recent()
            ->limit(3)
            ->get();

        return Inertia::render('welcome', [
            'draws' => $draws,
            'categories' => $categories,
            'liveDraws' => $liveDraws,
            'featuredDraws' => $featuredDraws,
            'filters' => $request->only(['category', 'status', 'draw_number', 'date_from', 'date_to']),
        ]);
    }

    /**
     * Display the specified draw.
     */
    public function show(Draw $draw)
    {
        $draw->load('category');

        $relatedDraws = Draw::with('category')
            ->where('draw_category_id', $draw->draw_category_id)
            ->where('id', '!=', $draw->id)
            ->completed()
            ->recent()
            ->limit(5)
            ->get();

        return Inertia::render('draws/show', [
            'draw' => $draw,
            'relatedDraws' => $relatedDraws,
        ]);
    }
}