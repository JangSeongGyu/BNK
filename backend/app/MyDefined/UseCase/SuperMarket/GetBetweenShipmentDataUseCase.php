<?php

namespace App\MyDefined\UseCase\SuperMarket;

use App\MyDefined\ValueObject\General\DateValueObject;
use App\MyDefined\Repository\SuperMarket\GetRepoInterface;

/**
 * [SuperMarket]期間別データ取得
 */
final class GetBetweenShipmentDataUseCase
{
    /**
     * リポジトリインターフェースをプロパティに設定
     */
    private $getRepository;

    /**
     * リポジトリの実体化(DI)
     * 内容はAppServiceProviderにて設定
     */
    public function __construct(
        GetRepoInterface $getRepository,
    ){
        $this->getRepository = $getRepository;
    }

    /**
     * メイン処理
     * 1．期間別データ取得
     */
    public function execute(DateValueObject $StartDateVO, DateValueObject $EndDateVO){
        $result = $this->getRepository->getAllDataByBetween($StartDateVO, $EndDateVO);
        return $result;
    }
}
