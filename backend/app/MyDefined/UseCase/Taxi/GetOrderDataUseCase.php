<?php

namespace App\MyDefined\UseCase\Taxi;

use App\MyDefined\Repository\Taxi\GetRepoInterface;

/**
 * [Taxi]SFOrderデータ取得
 */
final class GetOrderDataUseCase
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
     * 1．SFOrderデータ取得
     */
    public function execute(){
        $result = $this->getRepository->getOrderData();
        return $result;
    }
}
