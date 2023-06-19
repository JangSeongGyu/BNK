<?php

namespace App\MyDefined\Beauty\Repository;

use App\MyDefined\Beauty\Entity\WKOrdersEntity;

use Illuminate\Support\Facades\DB;
use PDO;

final class WKOrdersRepository implements WKOrdersRepoInterface{
    public function getWKOrders()
    {
        $wkOrm = DB::connection('beauty')->select('SELECT * from VT_入稿 ORDER BY ID');
        if (!$wkOrm) {
            $wkOrm = [null];
        }
        return WKOrdersEntity::reconstructGetWKFromRepository($wkOrm);
    }
    public function putWKOrders(
        WKOrdersEntity $WKOrdersEntity
    ){  
        $keys = array();
        $values = array();
        foreach(get_object_vars($WKOrdersEntity) as $key => $valueArray){
            if($valueArray){
                foreach($valueArray as $index => $value){
                    $valueArray[$index] = str_replace("''", "Null", "'".$value."'");
                }
                $keys[] = $key;
                $values[] = $valueArray;
            }
        }
        $columns = implode(',', $keys);
        $rows = array_map(null, ...$values);
        try{
            DB::transaction(function() use($columns, $rows){
                DB::table('TW02_入稿')->delete();
                foreach($rows as $row){
                    $values = implode(',', $row);

                    // 全て半角に変換
                    $values = mb_convert_kana($values, 'ask');
                    DB::insert('INSERT INTO TW02_入稿('.$columns.') VALUES ('.$values.')');
                }
                $dbh = DB::getpdo();
                $stmt = $dbh->prepare("{CALL dbo.usp_ShapingNyuko1(?,?,?,?)}"); 
                $stmt->bindParam(1, $msgCD, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 50);
                $stmt->bindParam(2, $msgParam1, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 2500);
                $stmt->bindParam(3, $msgParam2, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 2500);
                $stmt->bindParam(4, $msgParam3, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 2500);
                $stmt->execute();
                if($msgCD == 'E0000'){
                    throw new \Exception($msgParam1 . $msgParam2 . $msgParam3, 500);
                }
                $stmt = $dbh->prepare("{CALL dbo.usp_CheckNyuko1(?,?,?,?)}"); 
                $stmt->bindParam(1, $msgCD, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 50);
                $stmt->bindParam(2, $msgParam1, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 2500);
                $stmt->bindParam(3, $msgParam2, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 2500);
                $stmt->bindParam(4, $msgParam3, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 2500);
                $stmt->execute();
                if($msgCD == 'E0000'){
                    throw new \Exception($msgParam1 . $msgParam2 . $msgParam3, 500);
                }
            });
            DB::commit();
        }
        catch (\Exception $e) {
            DB::rollback();
            throw new \Exception($e->getMessage(), 500);
        }

        return;
    }
}
?>