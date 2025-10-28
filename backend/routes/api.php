<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\TaskController;

// Example API route
Route::get('/ping', function () {
    return response()->json(['message' => 'API is working fine na po.']);
});

// Task API routes
Route::apiResource('tasks', TaskController::class);

// Database connection test route
Route::get('/test-db', function () {
    try {
        DB::connection()->getPdo();
        return response()->json(['status' => 'connected', 'database' => DB::connection()->getDatabaseName()]);
    } catch (\Exception $e) {
        return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
    }
});