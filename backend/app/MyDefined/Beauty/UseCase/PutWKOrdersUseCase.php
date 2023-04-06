<?php

namespace App\MyDefined\Beauty\UseCase;

use App\MyDefined\Beauty\Repository\WKOrdersRepoInterface;
use App\MyDefined\Beauty\Entity\WKOrdersEntity;
use App\MyDefined\Beauty\ValueObject\WKOrdersValueObject;

/**
 * 見積作成の内容を保存する処理
 */
final class PutWKOrdersUseCase
{
    /**
     * リポジトリインターフェースをプロパティに設定
     */
    private $putWKOrdersRepository;

    /**
     * リポジトリの実体化(DI)
     * 内容はAppServiceProviderにて設定
     */
    public function __construct(
        WKOrdersRepoInterface $WKOrdersRepository,
    ){
        $this->putWKOrdersRepository = $WKOrdersRepository;
    }

    /**
     * メイン処理
     * 1．WKOrdersEntityにインポート内容を格納
     * 2. Entityを永続化
     * 
     * @param WKOrdersValueObject
     * @return self
     */
    public function execute(
        WKOrdersValueObject $wkOrdersVO
    ){
        $WKOrdersEntity = WKOrdersEntity::reconstructPutWKOrdersFromUseCase($wkOrdersVO);
        return $this->putWKOrdersRepository->putWKOrders($WKOrdersEntity);
    }
}
