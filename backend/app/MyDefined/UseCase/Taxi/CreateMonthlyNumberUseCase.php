<?php

namespace App\MyDefined\UseCase\Taxi;

use App\MyDefined\Entity\General\UserEntity;
use App\MyDefined\Entity\Taxi\CreateMonthlyNumberEntity;

use App\MyDefined\ValueObject\General\YearMonthValueObject;
use App\MyDefined\ValueObject\General\OrderNoValueObject;

use App\MyDefined\Repository\Taxi\CreateRepoInterface;

/**
 * [Taxi]月次番号を登録する
 */
final class CreateMonthlyNumberUseCase
{
    /**
     * リポジトリインターフェースをプロパティに設定
     */
    private $createRepository;

    /**
     * リポジトリの実体化(DI)
     * 内容はAppServiceProviderにて設定
     */
    public function __construct(
        CreateRepoInterface $createRepository,
    ){
        $this->createRepository = $createRepository;
    }

    /**
     * メイン処理
     * 1．ユーザー情報取得
     * 2. 月次番号登録
     * 
     */
    public function execute(YearMonthValueObject $YearMonthVO, OrderNoValueObject $OrderNoVO){
        $UserEntity = UserEntity::reconstructFromUseCase();
        $MonthlyNumberEntity = CreateMonthlyNumberEntity::reconstructFromUseCase($YearMonthVO, $OrderNoVO);
        $this->createRepository->createMonthlyNumber($UserEntity, $MonthlyNumberEntity);
        return;
    }
}
