<?php

use Illuminate\Support\Facades\Route;

use \App\Http\Controllers\Beauty\ImportController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['middleware' => 'api'])->group(function () {
    Route::get('/wkorders', [ImportController::class, 'getWKOrders']);
    Route::put('/wkorders', [ImportController::class, 'putWKOrders']);
});