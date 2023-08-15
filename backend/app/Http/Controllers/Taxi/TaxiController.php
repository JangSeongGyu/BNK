<?php

namespace App\Http\Controllers\Taxi;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

use Illuminate\Http\Request;
use App\Http\Requests\Taxi\UpdateInquiryNoFormRequest;
use App\Http\Requests\Taxi\CreateMonthlyNumberFormRequest;

use App\MyDefined\ValueObject\General\DateValueObject;
use App\MyDefined\ValueObject\Taxi\PouchTypeValueObject;
use App\MyDefined\ValueObject\General\SagawaInquiryNoValueObject;
use App\MyDefined\ValueObject\Taxi\ShipmentNoValueObject;
use App\MyDefined\ValueObject\Taxi\CheckInquiryNoValueObject;
use App\MyDefined\ValueObject\Taxi\CheckingTypeValueObject;
use App\MyDefined\ValueObject\General\YearMonthValueObject;
use App\MyDefined\ValueObject\General\OrderNoValueObject;

use App\MyDefined\UseCase\Taxi\GetOrderDataUseCase;
use App\MyDefined\UseCase\Taxi\CreateOrderDataUseCase;
use App\MyDefined\UseCase\Taxi\UpdateShipmentUseCase;
use App\MyDefined\UseCase\Taxi\GetBacklogDataUseCase;
use App\MyDefined\UseCase\Taxi\GetBizlogiUseCase;
use App\MyDefined\UseCase\Taxi\GetDailyShipmentDataUseCase;
use App\MyDefined\UseCase\Taxi\UpdateShipmentDataUseCase;
use App\MyDefined\UseCase\Taxi\GetBetweenShipmentDataUseCase;
use App\MyDefined\UseCase\Taxi\GetBetweenShipmentCountUseCase;
use App\MyDefined\UseCase\Taxi\GetQRDataUseCase;
use App\MyDefined\UseCase\Taxi\GetJobTicketUseCase;
use App\MyDefined\UseCase\Taxi\GetTotalPickUseCase;
use App\MyDefined\UseCase\Taxi\UpdateInquiryNoUseCase;
use App\MyDefined\UseCase\Taxi\UpdateTsubushiUseCase;
use App\MyDefined\UseCase\Taxi\GetDataByInquiryNoUseCase;
use App\MyDefined\UseCase\Taxi\UpdateFirstPackingUseCase;
use App\MyDefined\UseCase\Taxi\CreateMonthlyNumberUseCase;
use App\MyDefined\UseCase\Taxi\GetMonthlyNumberUseCase;
use App\MyDefined\UseCase\Taxi\GetAllDataUseCase;
use App\MyDefined\UseCase\Taxi\PostTeamsWebhookUseCase;

/**
 * 楽天スーパーコントローラー
 */

class TaxiController extends Controller
{
    /**
     * [GET]SFOrderデータ取得
     *
     * @param GetOrderDataUseCase $GetOrderDataUseCase
     */

    public function getOrderData(
        GetOrderDataUseCase $GetOrderDataUseCase,
    ){
        $orderData = $GetOrderDataUseCase->execute();
        return new JsonResponse($orderData, 200, [], JSON_UNESCAPED_UNICODE);
    }

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
        return new JsonResponse($backlogData, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * [PUT]出荷日設定
     *
     * @param UpdateShipmentUseCase $UpdateShipmentUseCase
     */

    public function updateShipment(
        Request $request,
        UpdateShipmentUseCase $UpdateShipmentUseCase,
        $shipmentDate
    ){
        $DateVO = DateValueObject::create($shipmentDate);
        $PouchTypeVO = PouchTypeValueObject::create($request->input('pouch'));
        $UpdateShipmentUseCase->execute($DateVO, $PouchTypeVO);
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
        $dailyData = $GetDailyShipmentDataUseCase->execute($DateVO);
        return new JsonResponse($dailyData, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * [PUT]出荷日変更
     * @param UpdateDailyShipmentDataUseCase $UpdateDailyShipmentDataUseCase
     */

     public function updateDailyShipmentData(
        Request $request,
        UpdateShipmentDataUseCase $UpdateShipmentDataUseCase,
        $shipmentDate
    ){
        $DateVO = DateValueObject::create($shipmentDate);
        $ChangeDateVO = DateValueObject::create($request->input('change_date'));
        $UpdateShipmentDataUseCase->execute($DateVO, $ChangeDateVO);
        return new JsonResponse('200', 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * [GET]期間別データ出力
     * @param GetBetweenShipmentDataUseCase $GetBetweenShipmentDataUseCase
     */

    public function getBetweenShipmentData(
        GetBetweenShipmentDataUseCase $GetBetweenShipmentDataUseCase,
        $startDate,
        $endDate
    ){
        $StartDateVO = DateValueObject::create($startDate);
        $EndDateVO = DateValueObject::create($endDate);
        $dailyData = $GetBetweenShipmentDataUseCase->execute($StartDateVO, $EndDateVO);
        return new JsonResponse($dailyData, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * [GET]期間別出荷件数出力
     * @param GetBetweenShipmentCountUseCase $GetBetweenShipmentCountUseCase
     */

    public function getBetweenShipmentCount(
        GetBetweenShipmentCountUseCase $GetBetweenShipmentCountUseCase,
        $startDate,
        $endDate
    ){
        $StartDateVO = DateValueObject::create($startDate);
        $EndDateVO = DateValueObject::create($endDate);
        $countData = $GetBetweenShipmentCountUseCase->execute($StartDateVO, $EndDateVO);
        return new JsonResponse($countData, 200, [], JSON_UNESCAPED_UNICODE);
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
        return new JsonResponse($bizlogiData, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * [GET]QR用データ出力
     * @param GetQRDataUseCase $GetQRDataUseCase
     */

    public function getQRData(
        GetQRDataUseCase $GetQRDataUseCase,
        $shipmentDate
    ){
        $DateVO = DateValueObject::create($shipmentDate);
        $dtfData = $GetQRDataUseCase->execute($DateVO);
        return new JsonResponse($dtfData, 200, [], JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
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
        $TotalPick = $GetTotalPickUseCase->execute($DateVO);
        return new JsonResponse($TotalPick, 200, [], JSON_UNESCAPED_UNICODE);
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
        return new JsonResponse($jobTicketData, 200, [], JSON_UNESCAPED_UNICODE);
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
     * [GET]問合せ番号別データ出力
     * @param GetDataByInquiryNoUseCase $GetDataByInquiryNoUseCase
     */

    public function getDataByInquiryNo(
        Request $request,
        GetDataByInquiryNoUseCase $GetDataByInquiryNoUseCase,
        $shipmentDate,
        $inquiryNo
    ){
        $DateVO = DateValueObject::create($shipmentDate);
        $InquiryNoVO = CheckInquiryNoValueObject::create($inquiryNo);
        $CheckingTypeVO = CheckingTypeValueObject::create($request->input('type'));
        $data = $GetDataByInquiryNoUseCase->execute($DateVO, $InquiryNoVO, $CheckingTypeVO);
        return new JsonResponse($data, 200, [], JSON_UNESCAPED_UNICODE);
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
     * @param GetMonthlyNumberUseCase $GetMonthlyNumberUseCase
     */

    public function getMonthlyNumber(
        GetMonthlyNumberUseCase $GetMonthlyNumberUseCase
    ){
        $monthlyData = $GetMonthlyNumberUseCase->execute();
        return new JsonResponse($monthlyData, 200, [], JSON_UNESCAPED_UNICODE);
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
        return new JsonResponse($allData, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * [GET]TeamsにWebhook通知
     *
     * @param PostTeamsWebhookUseCase $PostTeamsWebhookUseCase
     */

    public function postWebhook(
        PostTeamsWebhookUseCase $WebhookUseCase
    ){
        $allData = $WebhookUseCase->execute('test');
        return new JsonResponse($allData, 200, [], JSON_UNESCAPED_UNICODE);
    }
}
