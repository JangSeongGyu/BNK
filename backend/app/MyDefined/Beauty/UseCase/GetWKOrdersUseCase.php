<?php

namespace App\MyDefined\Beauty\UseCase;

use App\MyDefined\Beauty\Repository\WKOrdersRepoInterface;

/**
 * 見積作成の内容を保存する処理
 */
final class GetWKOrdersUseCase
{
    /**
     * リポジトリインターフェースをプロパティに設定
     */
    private $getWKOrdersRepository;

    /**
     * リポジトリの実体化(DI)
     * 内容はAppServiceProviderにて設定
     */
    public function __construct(
        WKOrdersRepoInterface $WKOrdersRepository,
    ){
        $this->getWKOrdersRepository = $WKOrdersRepository;
    }

    /**
     * メイン処理
     * 1．WKの内容をDBから取得しWKOrdersEntityに格納
     * 2. WKOrdersEntityのgetDataプロパティを返す
     * 
     */
    public function execute(){
        $WKOrdersEntity = $this->getWKOrdersRepository->getWKOrders();
        return $WKOrdersEntity->getData;
    }
}
