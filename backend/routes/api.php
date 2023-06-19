<?php

use Illuminate\Support\Facades\Route;

use \App\Http\Controllers\Beauty\ImportController;
use \App\Http\Controllers\SuperMarket\SuperMarketController;

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
    Route::group(['prefix'=>'supermarket', 'as'=>'supermarket.'], function(){
        Route::post('/order', [SuperMarketController::class, 'createOrderData'])->name('createOrderDate');
        Route::put('/shipmentdate/{date}', [SuperMarketController::class, 'updateShipment'])->name('updateShipment');
        Route::get('/bizlogi/{date}', [SuperMarketController::class, 'getBizlogi'])->name('getBizlogi');
        Route::put('/inquiryno/{date}', [SuperMarketController::class, 'updateInquiryNo'])->name('updateInquiryNo');
        Route::put('/tsubushi/{date}', [SuperMarketController::class, 'updateTsubushi'])->name('updateTsubushi');
    });
    Route::get('/wkorders', [ImportController::class, 'getWKOrders']);
    Route::put('/wkorders', [ImportController::class, 'putWKOrders']);
});