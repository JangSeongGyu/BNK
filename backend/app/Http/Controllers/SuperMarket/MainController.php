<?php

namespace App\Http\Controllers\SuperMarket;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

use App\Http\Requests\SuperMarket\UpdateInquiryNoFormRequest;

use App\MyDefined\ValueObject\General\DateValueObject;
use App\MyDefined\ValueObject\General\SagawaInquiryNoValueObject;
use App\MyDefined\ValueObject\SuperMarket\ShipmentNoValueObject;
use App\MyDefined\ValueObject\SuperMarket\CheckInquiryNoValueObject;

use App\MyDefined\UseCase\SuperMarket\CreateOrderDataUseCase;
use App\MyDefined\UseCase\SuperMarket\UpdateShipmentUseCase;
use App\MyDefined\UseCase\SuperMarket\GetBizlogiUseCase;
use App\MyDefined\UseCase\SuperMarket\UpdateInquiryNoUseCase;
use App\MyDefined\UseCase\SuperMarket\UpdateTsubushiUseCase;
use App\MyDefined\UseCase\SuperMarket\UpdateFirstPackingUseCase;
use App\MyDefined\UseCase\SuperMarket\UpdateSecondPackingUseCase;

/**
 * 楽天スーパーメイン処理コントローラー
 */

class MainController extends Controller
{
    /**
     * [POST]注文データインポート
     *
     * @param CreateOrderDataUseCase $CreateOrderDataUseCase
     */

    public function createOrderData(
        CreateOrderDataUseCase $CreateOrderDataUseCase
    ){
        $CreateOrderDataUseCase->execute();
        return new JsonResponse();
    }

    /**
     * [PUT]出荷日設定
     *
     * @param UpdateShipmentUseCase $UpdateShipmentUseCase
     */

    public function updateShipment(
        UpdateShipmentUseCase $UpdateShipmentUseCase,
        $shipmentDate
    ){
        $DateVO = DateValueObject::create($shipmentDate);
        $UpdateShipmentUseCase->execute($DateVO);
        return new JsonResponse();
    }

    /**
     * [GET]Bizlogiインポート用データ出力
     * @param GetBizlogiUseCase $GetBizlogiUseCase
     */

    public function getBizlogi(
        GetBizlogiUseCase $GetBizlogiUseCase,
        $shipmentDate
    ){
        $DateVO = DateValueObject::create($shipmentDate);
        $bizlogiData = $GetBizlogiUseCase->execute($DateVO);
        return new JsonResponse($bizlogiData);
    }

    /**
     * [PUT]問合せ番号を紐づけ
     *
     * @param UpdateInquiryNoUseCase $UpdateInquiryNoUseCase
     */

    public function updateInquiryNo(
        UpdateInquiryNoFormRequest $request,
        UpdateInquiryNoUseCase $UpdateInquiryNoUseCase,
        $shipmentDate
    ){
        $DateVO = DateValueObject::create($shipmentDate);
        $InquiryNoVO = SagawaInquiryNoValueObject::create($request->input('inquiry_no'));
        $ShipmentNoVO = ShipmentNoValueObject::create($request->input('shipment_no'));
        $UpdateInquiryNoUseCase->execute($DateVO, $InquiryNoVO, $ShipmentNoVO);
        return new JsonResponse();
    }

    /**
     * [PUT]つぶし作成
     *
     * @param UpdateTsubushiUseCase $UpdateTsubushiUseCase
     */

    public function updateTsubushi(
        UpdateTsubushiUseCase $UpdateTsubushiUseCase,
        $shipmentDate
    ){
        $DateVO = DateValueObject::create($shipmentDate);
        $UpdateTsubushiUseCase->execute($DateVO);
        return new JsonResponse();
    }

    /**
     * [PUT]一次梱包フラグUPDATE
     *
     * @param UpdateFirstPackingUseCase $UpdateFirstPackingUseCase
     */

    public function updateFirstPacking(
        UpdateFirstPackingUseCase $UpdateFirstPackingUseCase,
        $shipmentDate,
        $barcode
    ){
        $DateVO = DateValueObject::create($shipmentDate);
        $InquiryNoVO = CheckInquiryNoValueObject::create($barcode);
        $UpdateFirstPackingUseCase->execute($DateVO, $InquiryNoVO);
        return new JsonResponse();
    }

    /**
     * [PUT]二次梱包フラグUPDATE
     *
     * @param UpdateSecondPackingUseCase $UpdateSecondPackingUseCase
     */

    public function updateSecondPacking(
        UpdateSecondPackingUseCase $UpdateSecondPackingUseCase,
        $shipmentDate,
        $barcode
    ){
        $DateVO = DateValueObject::create($shipmentDate);
        $InquiryNoVO = CheckInquiryNoValueObject::create($barcode);
        $UpdateSecondPackingUseCase->execute($DateVO, $InquiryNoVO);
        return new JsonResponse();
    }
}
