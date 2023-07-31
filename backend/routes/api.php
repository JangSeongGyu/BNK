<?php

use Illuminate\Support\Facades\Route;

use \App\Http\Controllers\Beauty\ImportController;
use \App\Http\Controllers\SuperMarket\SuperMarketController;
use \App\Http\Controllers\Taxi\TaxiController;

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
        Route::get('/order', [SuperMarketController::class, 'getOrderData'])->name('getOrderData');
        Route::post('/order', [SuperMarketController::class, 'createOrderData'])->name('createOrderData');
        Route::get('/backlogdata', [SuperMarketController::class, 'getBacklogData'])->name('getBacklogData');
        Route::put('/shipment/{date}', [SuperMarketController::class, 'updateShipment'])->name('updateShipment');
        Route::get('/dailydata/{date}', [SuperMarketController::class, 'getDailyShipmentData'])->name('getDailyShipmentData');
        Route::get('/betweendata/{startdate}/{enddate}', [SuperMarketController::class, 'getBetweenShipmentData'])->name('getBetweenShipmentData');
        Route::get('/betweencount/{startdate}/{enddate}', [SuperMarketController::class, 'getBetweenShipmentCount'])->name('getBetweenShipmentCount');
        Route::get('/bizlogi/{date}', [SuperMarketController::class, 'getBizlogi'])->name('getBizlogi');
        Route::get('/qrdata/{date}', [SuperMarketController::class, 'getQRData'])->name('getQRData');
        Route::get('/label/{date}', [SuperMarketController::class, 'getLabel'])->name('getLabel');
        Route::get('/totalpick/{date}', [SuperMarketController::class, 'getTotalPick'])->name('getTotalPick');
        Route::get('/jobticket/{date}', [SuperMarketController::class, 'getJobTicket'])->name('getJobTicket');
        Route::put('/inquiryno/{date}', [SuperMarketController::class, 'updateInquiryNo'])->name('updateInquiryNo');
        Route::put('/tsubushi/{date}', [SuperMarketController::class, 'updateTsubushi'])->name('updateTsubushi');
        Route::get('/checkingdata/{date}/{inquiryno}', [SuperMarketController::class, 'getDataByInquiryNo'])->name('getDataByInquiryNo');
        Route::put('/firstpacking/{date}/{barcode}', [SuperMarketController::class, 'updateFirstPacking'])->name('updateFirstPacking');
        Route::put('/secondpacking/{date}/{barcode}', [SuperMarketController::class, 'updateSecondPacking'])->name('updateSecondPacking');
        Route::put('/monthlynumber', [SuperMarketController::class, 'createMonthlyNumber'])->name('createMonthlyNumber');
        Route::get('/monthlynumber', [SuperMarketController::class, 'getMonthlyNumber'])->name('getMonthlyNumber');
        Route::get('/alldata', [SuperMarketController::class, 'getAllData'])->name('getAllData');
    });
    Route::group(['prefix'=>'taxi', 'as'=>'taxi.'], function(){
        Route::post('/order', [TaxiController::class, 'createOrderData'])->name('createOrderDate');
        Route::get('/backlogdata', [TaxiController::class, 'getBacklogData'])->name('getBacklogData');
        Route::put('/shipment/{date}', [TaxiController::class, 'updateShipment'])->name('updateShipment');
        Route::get('/dailydata/{date}', [TaxiController::class, 'getDailyShipmentData'])->name('getDailyShipmentData');
        Route::get('/betweendata/{startdate}/{enddate}', [TaxiController::class, 'getBetweenShipmentData'])->name('getBetweenShipmentData');
        Route::get('/bizlogi/{date}', [TaxiController::class, 'getBizlogi'])->name('getBizlogi');
        Route::get('/dtf/{date}', [TaxiController::class, 'getDTF'])->name('getDTF');
        Route::get('/label/{date}', [TaxiController::class, 'getLabel'])->name('getLabel');
        Route::get('/totalpick/{date}', [TaxiController::class, 'getTotalPick'])->name('getTotalPick');
        Route::get('/jobticket/{date}', [TaxiController::class, 'getJobTicket'])->name('getJobTicket');
        Route::put('/inquiryno/{date}', [TaxiController::class, 'updateInquiryNo'])->name('updateInquiryNo');
        Route::put('/tsubushi/{date}', [TaxiController::class, 'updateTsubushi'])->name('updateTsubushi');
        Route::put('/firstpacking/{date}', [TaxiController::class, 'updateFirstPacking'])->name('updateFirstPacking');
        Route::post('/monthlynumber', [TaxiController::class, 'createMonthlyNumber'])->name('createMonthlyNumber');
        Route::get('/monthlydata/{yearmonth}', [TaxiController::class, 'getMonthlyData'])->name('getMonthlyData');
        Route::get('/alldata', [TaxiController::class, 'getAllData'])->name('getAllData');
    });
    Route::get('/wkorders', [ImportController::class, 'getWKOrders']);
    Route::put('/wkorders', [ImportController::class, 'putWKOrders']);
});