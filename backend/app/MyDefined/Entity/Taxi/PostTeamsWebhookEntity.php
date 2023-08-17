<?php

namespace App\MyDefined\Entity\Taxi;

use App\Exceptions\WebhookErrorResponseException;
use App\MyDefined\ValueObject\General\DateValueObject;
use Illuminate\Support\Collection;

class SubjectTemplete{
    public $type = "TextBlock";
    public $text;
    public $size = "extraLarge";
    public $weight = "bolder";

    public function __construct(string $subject){$this->text = "楽天ペイタクシーQR ".$subject;}
}

class BodyTemplete{
    public $type = "TextBlock";
    public $text;

    public function __construct(string $body, PostTeamsWebhookMentionerEntity $MentionerEntity)
    {
        //改行がすごくめんどくさいやり方になってしまった
        $body = <<<BODY
                $body\n

                BODY;
        foreach($MentionerEntity->entities as $mention){
            $body = $body . $mention->text . 'さん ';
        }
        $this->text = $body;
    }
}

class ActionSetTemplete{
    public $type = "ActionSet";
    public $actions = [];

    public function __construct(string $shipmentDate)
    {
        // 下にもう一個クラス作ってもいいかな
        array_push($this->actions, array("type"=>"Action.OpenUrl", "title"=>"確認", "url"=>config('app.url')."taxi/".$shipmentDate));
    }
}

class ContentTemplete{
    public $type = "AdaptiveCard";
    public $body = [];
    public $schema = "http://adaptivecards.io/schemas/adaptive-card.json";
    public $version = "1.2";
    public $msteams;

    public function __construct(PostTeamsWebhookEntity $WebhookEntity, PostTeamsWebhookMentionerEntity $MentionerEntity) {
        array_push($this->body, new SubjectTemplete($WebhookEntity->subject));
        array_push($this->body, new BodyTemplete($WebhookEntity->body, $MentionerEntity));
        if($WebhookEntity->shipmentDate){
            array_push($this->body, new ActionSetTemplete($WebhookEntity->shipmentDate));
        }
        $this->msteams = $MentionerEntity;
    }
}

class AttachmentsTemplete{
    public $contentType = "application/vnd.microsoft.card.adaptive";
    public $contentUrl = null;
    public $content;

    public function __construct(
        PostTeamsWebhookEntity $WebhookEntity,
        PostTeamsWebhookMentionerEntity $MentionerEntity
    ){$this->content = new ContentTemplete($WebhookEntity, $MentionerEntity);}
}

class SendJsonTemplete{
    public $type = "message";
    public $attachments = [];

    public function __construct(
        PostTeamsWebhookEntity $WebhookEntity,
        PostTeamsWebhookMentionerEntity $MentionerEntity, 
    ){array_push($this->attachments, new AttachmentsTemplete($WebhookEntity, $MentionerEntity));}
}

final class PostTeamsWebhookEntity{
    public $webhookURL;
    public $subject;
    public $body;
    public $sendJson;
    public $shipmentDate = null;

    private function __construct(){}

    public static function reconstructFromRepository(Collection $rows): PostTeamsWebhookEntity 
    {
        $selfEntity = new self();
        $selfEntity->validate($rows);
        $selfEntity->webhookURL = $rows[0]->WebhookURL;
        $selfEntity->subject = $rows[0]->件名;
        $selfEntity->body = $rows[0]->本文;
        return $selfEntity;
    }

    private function validate(Collection $rows)
    {
        if(array_key_exists(1, $rows->toArray())){
            throw new WebhookErrorResponseException();
        }
    }

    public function postWebhook(PostTeamsWebhookMentionerEntity $MentionerEntity, DateValueObject $DateVO = null)
    {
        if($DateVO){
            $this->shipmentDate = $DateVO->value;
            $this->subject = $DateVO->value . '出荷';
        }
        $this->sendJson = new SendJsonTemplete(
            $this, 
            $MentionerEntity
        );
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->webhookURL);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type:application/json',]);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($this->sendJson, JSON_UNESCAPED_UNICODE));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $http_str = curl_exec($ch);
        curl_close($ch);
        if($http_str != "1"){
            throw new WebhookErrorResponseException($http_str);
        }
        return;
    }

}
?>