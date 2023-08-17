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
        Route::get('order', [SuperMarketController::class, 'getOrderData'])->name('sm.getOrderData');
        Route::post('order', [SuperMarketController::class, 'createOrderData'])->name('sm.createOrderData');
        Route::get('backlogdata', [SuperMarketController::class, 'getBacklogData'])->name('sm.getBacklogData');
        Route::put('shipment/{date}', [SuperMarketController::class, 'updateShipment'])->name('sm.updateShipment');
        Route::put('dailydata/{date}', [SuperMarketController::class, 'updateDailyShipmentDate'])->name('sm.updateShipmentDate');
        Route::get('dailydata/{date}', [SuperMarketController::class, 'getDailyShipmentData'])->name('sm.getDailyShipmentData');
        Route::get('betweendata/{startdate}/{enddate}', [SuperMarketController::class, 'getBetweenShipmentData'])->name('sm.getBetweenShipmentData');
        Route::get('betweencount/{startdate}/{enddate}', [SuperMarketController::class, 'getBetweenShipmentCount'])->name('sm.getBetweenShipmentCount');
        Route::get('bizlogi/{date}', [SuperMarketController::class, 'getBizlogi'])->name('sm.getBizlogi');
        Route::get('qrdata/{date}', [SuperMarketController::class, 'getQRData'])->name('sm.getQRData');
        Route::get('label/{date}', [SuperMarketController::class, 'getLabel'])->name('sm.getLabel');
        Route::get('totalpick/{date}', [SuperMarketController::class, 'getTotalPick'])->name('sm.getTotalPick');
        Route::get('jobticket/{date}', [SuperMarketController::class, 'getJobTicket'])->name('sm.getJobTicket');
        Route::put('inquiryno/{date}', [SuperMarketController::class, 'updateInquiryNo'])->name('sm.updateInquiryNo');
        Route::put('tsubushi/{date}', [SuperMarketController::class, 'updateTsubushi'])->name('sm.updateTsubushi');
        Route::get('checkingdata/{date}/{inquiryno}', [SuperMarketController::class, 'getDataByInquiryNo'])->name('sm.getDataByInquiryNo');
        Route::put('firstpacking/{date}/{barcode}', [SuperMarketController::class, 'updateFirstPacking'])->name('sm.updateFirstPacking');
        Route::put('secondpacking/{date}/{barcode}', [SuperMarketController::class, 'updateSecondPacking'])->name('sm.updateSecondPacking');
        Route::put('monthlynumber', [SuperMarketController::class, 'createMonthlyNumber'])->name('sm.createMonthlyNumber');
        Route::get('monthlynumber', [SuperMarketController::class, 'getMonthlyNumber'])->name('sm.getMonthlyNumber');
        Route::get('alldata', [SuperMarketController::class, 'getAllData'])->name('sm.getAllData');
        Route::post('webhook/{date}', [SuperMarketController::class, 'postWebhook'])->name('sm.postWebhook');
    });
    Route::group(['prefix'=>'taxi', 'as'=>'taxi.'], function(){
        Route::get('order', [TaxiController::class, 'getOrderData'])->name('tx.getOrderData');
        Route::post('order', [TaxiController::class, 'createOrderData'])->name('tx.createOrderData');
        Route::get('backlogdata', [TaxiController::class, 'getBacklogData'])->name('tx.getBacklogData');
        Route::put('shipment/{date}', [TaxiController::class, 'updateShipment'])->name('tx.updateShipment');
        Route::put('dailydata/{date}', [TaxiController::class, 'updateDailyShipmentDate'])->name('tx.updateDailyShipmentDate');
        Route::get('dailydata/{date}', [TaxiController::class, 'getDailyShipmentData'])->name('tx.getDailyShipmentData');
        Route::get('betweendata/{startdate}/{enddate}', [TaxiController::class, 'getBetweenShipmentData'])->name('tx.getBetweenShipmentData');
        Route::get('betweencount/{startdate}/{enddate}', [TaxiController::class, 'getBetweenShipmentCount'])->name('tx.getBetweenShipmentCount');
        Route::get('bizlogi/{date}', [TaxiController::class, 'getBizlogi'])->name('tx.getBizlogi');
        Route::get('qrdata/{date}', [TaxiController::class, 'getQRData'])->name('tx.getQRData');
        Route::get('totalpick/{date}', [TaxiController::class, 'getTotalPick'])->name('tx.getTotalPick');
        Route::get('jobticket/{date}', [TaxiController::class, 'getJobTicket'])->name('tx.getJobTicket');
        Route::put('inquiryno/{date}', [TaxiController::class, 'updateInquiryNo'])->name('tx.updateInquiryNo');
        Route::put('tsubushi/{date}', [TaxiController::class, 'updateTsubushi'])->name('tx.updateTsubushi');
        Route::get('checkingdata/{date}/{inquiryno}', [TaxiController::class, 'getDataByInquiryNo'])->name('tx.getDataByInquiryNo');
        Route::put('firstpacking/{date}/{barcode}', [TaxiController::class, 'updateFirstPacking'])->name('tx.updateFirstPacking');
        Route::put('monthlynumber', [TaxiController::class, 'createMonthlyNumber'])->name('tx.createMonthlyNumber');
        Route::get('monthlynumber', [TaxiController::class, 'getMonthlyNumber'])->name('tx.getMonthlyNumber');
        Route::get('alldata', [TaxiController::class, 'getAllData'])->name('tx.getAllData');
        Route::post('webhook/{date}', [TaxiController::class, 'postWebhook'])->name('tx.postWebhook');
    });
    // Route::get('/wkorders', [ImportController::class, 'getWKOrders']);
    // Route::put('/wkorders', [ImportController::class, 'putWKOrders']);
});