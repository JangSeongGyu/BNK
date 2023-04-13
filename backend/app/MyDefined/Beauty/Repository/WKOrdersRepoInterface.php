<?php

namespace App\MyDefined\Beauty\Repository;

use App\MyDefined\Beauty\Entity\WKOrdersEntity;

interface WKOrdersRepoInterface{
    public function getWKOrders();
    public function putWKOrders(WKOrdersEntity $WKOrdersEntity);
}
?>