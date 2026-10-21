<?php

// use Illuminate\Http\Request;

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\MataKuliahController;
use App\Http\Controllers\Api\V1\ProgramStudiController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::prefix('v1')->name('api.v1.')->group(function ()  {
    Route::post('/login', [AuthController::class, 'login']);

    Route::get('/program-studi', [ProgramStudiController::class, 'index']);

    Route::apiResource('/mata-kuliah', MataKuliahController::class);

    Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    });
});
