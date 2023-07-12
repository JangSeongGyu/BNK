<?php

namespace App\MyDefined\UseCase\Taxi;

use App\MyDefined\ValueObject\General\DateValueObject;
use App\MyDefined\Repository\Taxi\GetRepoInterface;

/**
 * [Taxi]指定出荷日でBizlogi取込用データ取得
 */
final class GetBizlogiUseCase
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
     * 1．Bizlogi取込用データ取得
     */
    public function execute(DateValueObject $DateVO){
        $result = $this->getRepository->getBizlogi($DateVO);
        return $result;
    }
}
