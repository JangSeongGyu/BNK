<?php

namespace App\Http\Controllers\Beauty;

use App\Http\Controllers\Controller;

use App\Http\Requests\Beauty\PutWKOrdersFormRequest;

use App\MyDefined\Beauty\UseCase\PutWKOrdersUseCase;

use App\MyDefined\Beauty\ValueObject\WKOrdersValueObject;

use Throwable;

/**
 * 見積作成画面のコントローラー
 */

class ImportController extends Controller
{
    /**
     * [PUT]WKテーブルにインポート
     *
     * @param PutWKOrdersFormRequest $request
     * @param PutWKOrdersUseCase $useCase
     */

    public function putWKOrders(
        PutWKOrdersFormRequest $request,
        PutWKOrdersUseCase $putWKOrdersUseCase,
    ){
        $inputArray = $request->sorts();
        $input = WKOrdersValueObject::create($inputArray);
        $putWKOrdersUseCase->execute($input);
        session()->flash('flash_message', '取込が完了しました。');
        return response()->json([
            'return' => $input
        ]);
    }
}
