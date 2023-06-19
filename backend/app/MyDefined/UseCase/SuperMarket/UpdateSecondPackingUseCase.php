<?php

namespace App\MyDefined\UseCase\SuperMarket;

use App\MyDefined\Entity\General\UserEntity;
use App\MyDefined\Entity\SuperMarket\UpdateSecondPackingEntity;

use App\MyDefined\ValueObject\General\DateValueObject;
use App\MyDefined\ValueObject\SuperMarket\CheckInquiryNoValueObject;

use App\MyDefined\Repository\SuperMarket\UpdateRepoInterface;

/**
 * [SuperMarket]指定出荷日で一次梱包完了処理
 */
final class UpdateSecondPackingUseCase
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
     * 2. 指定出荷日で一次梱包フラグUpdate
     */
    public function execute(DateValueObject $DateVO, CheckInquiryNoValueObject $InquiryNoVO){
        $UserEntity = UserEntity::reconstructFromUseCase();
        $SecondPackingEntity = UpdateSecondPackingEntity::reconstructFromUseCase($DateVO, $InquiryNoVO);
        $this->updateRepository->UpdateSecondPacking($UserEntity, $SecondPackingEntity);
        return;
    }
}
