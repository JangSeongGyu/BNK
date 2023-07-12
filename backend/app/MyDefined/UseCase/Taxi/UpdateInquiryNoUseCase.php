<?php

namespace App\MyDefined\UseCase\Taxi;

use App\MyDefined\Entity\General\UserEntity;
use App\MyDefined\Entity\Taxi\UpdateInquiryNoEntity;

use App\MyDefined\ValueObject\General\DateValueObject;
use App\MyDefined\ValueObject\General\SagawaInquiryNoValueObject;
use App\MyDefined\ValueObject\Taxi\ShipmentNoValueObject;

use App\MyDefined\Repository\Taxi\UpdateRepoInterface;

/**
 * [Taxi]指定出荷日で問い合わせ番号とつぶしをUpdate
 */
final class UpdateInquiryNoUseCase
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
     * 2. 問い合わせ番号、出荷番号をEntityに格納
     * 3. 指定出荷日で問い合わせ番号をUpdate
     */
    public function execute(
        DateValueObject $DateVO, 
        SagawaInquiryNoValueObject $InquiryNoVO, 
        ShipmentNoValueObject $ShipmentNoVO,
    ){
        $UserEntity = UserEntity::reconstructFromUseCase();
        $InquiryNoEntity = UpdateInquiryNoEntity::reconstructFromUseCase($InquiryNoVO, $ShipmentNoVO, $DateVO);
        $this->updateRepository->UpdateInquiryNo($UserEntity, $InquiryNoEntity);
        return;
    }
}
