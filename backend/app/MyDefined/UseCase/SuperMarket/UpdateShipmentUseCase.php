<?php

namespace App\MyDefined\UseCase\SuperMarket;

use App\MyDefined\ValueObject\General\DateValueObject;
use App\MyDefined\Entity\General\UserEntity;
use App\MyDefined\Entity\SuperMarket\UpdateShipmentEntity;
use App\MyDefined\Repository\SuperMarket\UpdateRepoInterface;

/**
 * [SuperMarket]指定出荷日でUpdate
 */
final class UpdateShipmentUseCase
{
    /**
     * リポジトリインターフェースをプロパティに設定
     */
    private $updateRepository;

    /**
     * リポジトリの実体化(DI)
     * 内容はAppServiceProviderにて設定
     */
    public function __construct(
        UpdateRepoInterface $updateRepository,
    ){
        $this->updateRepository = $updateRepository;
    }

    /**
     * メイン処理
     * 1．ユーザー情報取得
     * 2. 指定出荷日でUpdate
     */
    public function execute(DateValueObject $DateVO){
        $UserEntity = UserEntity::reconstructFromUseCase();
        $ShipmentEntity = UpdateShipmentEntity::reconstructFromUseCase($DateVO);
        $this->updateRepository->UpdateShipment($UserEntity, $ShipmentEntity);
        return;
    }
}
