<?php

namespace App\MyDefined\UseCase\SuperMarket;

use App\MyDefined\ValueObject\General\YearMonthValueObject;
use App\MyDefined\Repository\SuperMarket\GetRepoInterface;

/**
 * [SuperMarket]月次集計用データ取得
 */
final class GetMonthlyDataUseCase
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
     * 1．月次集計用データ取得
     */
    public function execute(YearMonthValueObject $YearMonthVO){
        $result = $this->getRepository->getAllDataByMonth($YearMonthVO);
        return $result;
    }
}
