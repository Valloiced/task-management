<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\TaskController;

// Example API route
Route::get('/ping', function () {
    return response()->json(['message' => 'API is working fine na po.']);
});

// Task API routes
Route::apiResource('tasks', TaskController::class);
