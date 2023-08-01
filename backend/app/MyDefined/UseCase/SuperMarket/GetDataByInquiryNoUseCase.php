<?php

namespace App\MyDefined\UseCase\SuperMarket;

use App\MyDefined\ValueObject\General\DateValueObject;
use App\MyDefined\ValueObject\SuperMarket\CheckInquiryNoValueObject;
use App\MyDefined\Repository\SuperMarket\GetRepoInterface;
use App\MyDefined\ValueObject\SuperMarket\CheckingTypeValueObject;

/**
 * [SuperMarket]問い合わせ番号別データ取得
 */
final class GetDataByInquiryNoUseCase
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
     * 1．問い合わせ番号別データ取得
     */
    public function execute(DateValueObject $DateVO
        , CheckInquiryNoValueObject $InquiryNoVO
        , CheckingTypeValueObject $CheckingTypeVO
    ){
        $result = $this->getRepository->getAllDataByInquiryNo($DateVO, $InquiryNoVO, $CheckingTypeVO);
        return $result->rows;
    }
}
