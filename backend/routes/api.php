<?php

use Illuminate\Support\Facades\Route;

use \App\Http\Controllers\Beauty\ImportController;
use App\Http\Controllers\GameController;
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
    Route::group(['prefix'=>'game1', 'as'=>'game1.'], function(){
        // Route::get("/result/{current_game}/{table_id}",[GameController::class,"GetGameResult"]);
        Route::post("/save",[GameController::class,"PostGameResult"]);
    }); 
    Route::group(['prefix'=>'main', 'as'=>'main.'], function(){
        Route::post("/change-game",[GameController::class,"ChangeGame"]);
        Route::get("/answer/{current_game}",[GameController::class,"GetAnswer"]);
    });
});