<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ProductController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/api/test', function () {
    return response()->json([
        'message' => 'API working!',
    ]);
});

Route::get('/api/products', [ProductController::class, 'index']);

