<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDrawRequest;
use App\Http\Requests\UpdateDrawRequest;
use App\Models\Draw;
use App\Models\DrawCategory;
use Inertia\Inertia;

class DrawController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $draws = Draw::with('category')
            ->recent()
            ->paginate(20);

        return Inertia::render('admin/draws/index', [
            'draws' => $draws
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = DrawCategory::active()
            ->orderBy('sort_order')
            ->get(['id', 'name']);

        return Inertia::render('admin/draws/create', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDrawRequest $request)
    {
        $draw = Draw::create($request->validated());

        return redirect()->route('admin.draws.show', $draw)
            ->with('success', 'Draw created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Draw $draw)
    {
        $draw->load('category');

        return Inertia::render('admin/draws/show', [
            'draw' => $draw
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Draw $draw)
    {
        $draw->load('category');

        $categories = DrawCategory::active()
            ->orderBy('sort_order')
            ->get(['id', 'name']);

        return Inertia::render('admin/draws/edit', [
            'draw' => $draw,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDrawRequest $request, Draw $draw)
    {
        $draw->update($request->validated());

        return redirect()->route('admin.draws.show', $draw)
            ->with('success', 'Draw updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Draw $draw)
    {
        $draw->delete();

        return redirect()->route('admin.draws.index')
            ->with('success', 'Draw deleted successfully.');
    }
}