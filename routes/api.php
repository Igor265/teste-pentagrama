<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [\App\Http\Controllers\AuthController::class, 'logout']);
    Route::apiResource('cidade', \App\Http\Controllers\CityController::class);
    Route::get('/user', [\App\Http\Controllers\AuthController::class, 'returnUser']);
    Route::get('/list', [\App\Http\Controllers\CityController::class, 'listCitys']);
    Route::post('/cadastrar/bairro', [\App\Http\Controllers\CityController::class, 'storeNeighborhood']);
});
Route::post('/cadastrar/usuario', [\App\Http\Controllers\AuthController::class, 'cadastrar']);
Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login']);

