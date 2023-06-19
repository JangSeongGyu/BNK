<?php

namespace App\MyDefined\UseCase\SuperMarket;

use App\MyDefined\Entity\General\UserEntity;
use App\MyDefined\Repository\SuperMarket\CreateRepoInterface;

/**
 * [SuperMarket]注文データを取得する
 */
final class CreateOrderDataUseCase
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
     * 2. 注文データ取得
     * 
     */
    public function execute(){
        $UserEntity = UserEntity::reconstructFromUseCase();
        $this->createRepository->createOrderData($UserEntity);
        return;
    }
}
