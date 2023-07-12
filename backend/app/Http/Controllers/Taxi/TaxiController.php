<?php

namespace App\Http\Controllers\Taxi;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

use App\Http\Requests\Taxi\UpdateInquiryNoFormRequest;
use App\Http\Requests\Taxi\CreateMonthlyNumberFormRequest;

use App\MyDefined\ValueObject\General\DateValueObject;
use App\MyDefined\ValueObject\General\SagawaInquiryNoValueObject;
use App\MyDefined\ValueObject\Taxi\ShipmentNoValueObject;
use App\MyDefined\ValueObject\Taxi\CheckInquiryNoValueObject;
use App\MyDefined\ValueObject\General\YearMonthValueObject;
use App\MyDefined\ValueObject\General\OrderNoValueObject;

use App\MyDefined\UseCase\Taxi\CreateOrderDataUseCase;
use App\MyDefined\UseCase\Taxi\GetBacklogDataUseCase;
use App\MyDefined\UseCase\Taxi\UpdateShipmentUseCase;
use App\MyDefined\UseCase\Taxi\GetDailyShipmentDataUseCase;
use App\MyDefined\UseCase\Taxi\GetBizlogiUseCase;
use App\MyDefined\UseCase\Taxi\GetDTFUseCase;
use App\MyDefined\UseCase\Taxi\GetLabelUseCase;
use App\MyDefined\UseCase\Taxi\GetJobTicketUseCase;
use App\MyDefined\UseCase\Taxi\GetTotalPickUseCase;
use App\MyDefined\UseCase\Taxi\UpdateInquiryNoUseCase;
use App\MyDefined\UseCase\Taxi\UpdateTsubushiUseCase;
use App\MyDefined\UseCase\Taxi\UpdateFirstPackingUseCase;
use App\MyDefined\UseCase\Taxi\CreateMonthlyNumberUseCase;
use App\MyDefined\UseCase\Taxi\GetMonthlyDataUseCase;
use App\MyDefined\UseCase\Taxi\GetAllDataUseCase;

/**
 * 楽天スーパーコントローラー
 */

class TaxiController extends Controller
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
     * [GET]未処理データ取得
     *
     * @param GetBacklogDataUseCase $GetBacklogDataUseCase
     */

    public function getBacklogData(
        GetBacklogDataUseCase $GetBacklogDataUseCase,
    ){
        $backlogData = $GetBacklogDataUseCase->execute();
        return new JsonResponse($backlogData);
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
     * [GET]出荷日別データ出力
     * @param GetDailyShipmentDataUseCase $GetDailyShipmentDataUseCase
     */

    public function getDailyShipmentData(
        GetDailyShipmentDataUseCase $GetDailyShipmentDataUseCase,
        $shipmentDate
    ){
        $DateVO = DateValueObject::create($shipmentDate);
        $bizlogiData = $GetDailyShipmentDataUseCase->execute($DateVO);
        return new JsonResponse($bizlogiData);
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
     * [GET]DTF連携データ出力
     * @param GetDTFUseCase $GetDTFUseCase
     */

    public function getDTF(
        GetDTFUseCase $GetDTFUseCase,
        $shipmentDate
    ){
        $DateVO = DateValueObject::create($shipmentDate);
        $dtfData = $GetDTFUseCase->execute($DateVO);
        return new JsonResponse($dtfData);
    }

    /**
     * [GET]梱包ラベル用データ出力
     * @param GetLabelUseCase $GetLabelUseCase
     */

    public function getLabel(
        GetLabelUseCase $GetLabelUseCase,
        $shipmentDate
    ){
        $DateVO = DateValueObject::create($shipmentDate);
        $labelData = $GetLabelUseCase->execute($DateVO);
        return new JsonResponse($labelData);
    }

    /**
     * [GET]山出し用データ出力
     * @param GetTotalPickUseCase $GetTotalPickUseCase
     */

    public function getTotalPick(
        GetTotalPickUseCase $GetTotalPickUseCase,
        $shipmentDate
    ){
        $DateVO = DateValueObject::create($shipmentDate);
        $totalPickData = $GetTotalPickUseCase->execute($DateVO);
        return new JsonResponse($totalPickData);
    }

    
    /**
     * [GET]JOBチケット用データ出力
     * @param GetJobTicketUseCase $GetJobTicketUseCase
     */

    public function getJobTicket(
        GetJobTicketUseCase $GetJobTicketUseCase,
        $shipmentDate
    ){
        $DateVO = DateValueObject::create($shipmentDate);
        $jobTicketData = $GetJobTicketUseCase->execute($DateVO);
        return new JsonResponse($jobTicketData);
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

    /**
     * [GET]月次集計
     *
     * @param GetMonthlyDataUseCase $GetMonthlyDataUseCase
     */

    public function getMonthlyData(
        GetMonthlyDataUseCase $GetMonthlyDataUseCase,
        $yearMonth
    ){
        $YearMonthVO = YearMonthValueObject::create($yearMonth);
        $monthlyData = $GetMonthlyDataUseCase->execute($YearMonthVO);
        return new JsonResponse($monthlyData);
    }

    /**
     * [GET]全データ取得
     *
     * @param GetAllDataUseCase $GetAllDataUseCase
     */

    public function getAllData(
        GetAllDataUseCase $GetAllDataUseCase,
    ){
        $allData = $GetAllDataUseCase->execute();
        return new JsonResponse($allData);
    }
}
