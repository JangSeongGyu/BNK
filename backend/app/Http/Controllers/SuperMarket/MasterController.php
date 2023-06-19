<?php

namespace App\Http\Controllers\SuperMarket;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

use App\Http\Requests\SuperMarket\CreateMonthlyNumberFormRequest;

use App\MyDefined\ValueObject\General\YearMonthValueObject;
use App\MyDefined\ValueObject\General\OrderNoValueObject;

use App\MyDefined\UseCase\SuperMarket\CreateMonthlyNumberUseCase;

/**
 * 楽天スーパーマスタ管理コントローラー
 */

class MasterController extends Controller
{
    /**
     * [POST]月次番号登録
     *
     * @param CreateMonthlyNumberUseCase $CreateMonthlyNumberUseCase
     */

    public function createMonthlyNumber(
        CreateMonthlyNumberFormRequest $request,
        CreateMonthlyNumberUseCase $CreateMonthlyNumberUseCase
    ){
        $YearMonthVO = YearMonthValueObject::create($request['year_month']);
        $OrderNoVO = OrderNoValueObject::create($request['order_no']);
        $CreateMonthlyNumberUseCase->execute($YearMonthVO, $OrderNoVO);
        return new JsonResponse();
    }

}
