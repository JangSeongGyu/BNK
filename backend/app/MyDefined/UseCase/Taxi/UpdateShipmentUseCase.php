<?php

namespace App\MyDefined\UseCase\Taxi;

use App\MyDefined\ValueObject\General\DateValueObject;
use App\MyDefined\ValueObject\Taxi\PouchTypeValueObject;
use App\MyDefined\Entity\General\UserEntity;
use App\MyDefined\Entity\Taxi\UpdateShipmentEntity;
use App\MyDefined\Repository\Taxi\UpdateRepoInterface;

/**
 * [Taxi]指定出荷日でUpdate
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
    public function execute(DateValueObject $DateVO, PouchTypeValueObject $PouchTypeVO){
        $UserEntity = UserEntity::reconstructFromUseCase();
        $ShipmentEntity = UpdateShipmentEntity::reconstructFromUseCase($DateVO, $PouchTypeVO);
        $this->updateRepository->UpdateShipment($UserEntity, $ShipmentEntity);
        return;
    }
}
