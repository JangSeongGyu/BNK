<?php

namespace App\MyDefined\UseCase\SuperMarket;

use App\MyDefined\Repository\SuperMarket\GetRepoInterface;

/**
 * [SuperMarket]全データ取得
 */
final class GetAllDataUseCase
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
     * 1．全データ取得
     */
    public function execute(){
        $result = $this->getRepository->getAllData();
        return $result;
    }
}
