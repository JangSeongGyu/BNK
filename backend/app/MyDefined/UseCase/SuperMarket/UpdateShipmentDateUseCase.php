<?php

namespace App\MyDefined\UseCase\SuperMarket;

use App\MyDefined\Entity\General\UserEntity;
use App\MyDefined\Entity\SuperMarket\UpdateShipmentDateEntity;

use App\MyDefined\ValueObject\General\DateValueObject;
use App\MyDefined\Repository\SuperMarket\GetRepoInterface;
use App\MyDefined\Repository\SuperMarket\UpdateRepoInterface;

/**
 * [SuperMarket]出荷日変更
 */
final class UpdateShipmentDateUseCase
{
    /**
     * リポジトリインターフェースをプロパティに設定
     */
    private $GetRepository;
    private $UpdateRepository;

    /**
     * リポジトリの実体化(DI)
     * 内容はAppServiceProviderにて設定
     */
    public function __construct(
        GetRepoInterface $GetRepository,
        UpdateRepoInterface $UpdateRepository,
    ){
        $this->GetRepository = $GetRepository;
        $this->UpdateRepository = $UpdateRepository;
    }

    /**
     * メイン処理
     * 1．出荷日変更
     */
    public function execute(DateValueObject $DateVO, DateValueObject $ChangeDateVO){
        $result = $this->GetRepository->getAllDataByShipmentDate($DateVO);
        $UserEntity = UserEntity::reconstructFromUseCase();
        $UpdateShipmentDateEntity = UpdateShipmentDateEntity::reconstructFromUseCase($result, $DateVO, $ChangeDateVO);
        $this->UpdateRepository->UpdateShipmentDate($UserEntity, $UpdateShipmentDateEntity);
        return;
    }
}
