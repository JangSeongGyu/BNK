<?php

namespace App\MyDefined\UseCase\SuperMarket;

use App\MyDefined\ValueObject\General\DateValueObject;
use App\MyDefined\Repository\SuperMarket\GetRepoInterface;

/**
 * [SuperMarket]指定出荷日でDTF連携用データ取得
 */
final class GetDTFUseCase
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
     * 1．DTF連携データ取得
     */
    public function execute(DateValueObject $DateVO){
        $result = $this->getRepository->getAllDataByShipmentDate($DateVO);
        return $result;
    }
}
