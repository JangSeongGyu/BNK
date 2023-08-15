<?php

namespace App\MyDefined\Entity\Taxi;

use App\Exceptions\WebhookErrorResponseException;
use Illuminate\Support\Collection;

class BodyTemplete{
    public $type = "TextBlock";
    public $text;

    public function __construct(string $body, PostTeamsWebhookMentionerEntity $MentionerEntity)
    {
        $this->text = $body . ' ' . $MentionerEntity->entities[0]->text . ' ' . $MentionerEntity->entities[1]->text;
    }
}

class ContentTemplete{
    public $type = "AdaptiveCard";
    public $body = [];
    public $schema = "http://adaptivecards.io/schemas/adaptive-card.json";
    public $version = "1.2";
    public $msteams;

    public function __construct(string $subject, string $body, PostTeamsWebhookMentionerEntity $MentionerEntity) {
        array_push($this->body, new BodyTemplete($body, $MentionerEntity));
        $this->msteams = $MentionerEntity;
    }
}

class AttachmentsTemplete{
    public $contentType = "application/vnd.microsoft.card.adaptive";
    public $contentUrl = null;
    public $content;

    public function __construct(string $subject, string $body, PostTeamsWebhookMentionerEntity $MentionerEntity) {
        $this->content = new ContentTemplete($subject, $body, $MentionerEntity);
    }
}

class SendJsonTemplete{
    public $type = "message";
    public $attachments = [];

    public function __construct(string $subject, string $body, PostTeamsWebhookMentionerEntity $MentionerEntity) 
    {
        array_push($this->attachments, new AttachmentsTemplete($subject, $body, $MentionerEntity));
    }
}

final class PostTeamsWebhookEntity{
    public $webhookURL;
    public $subject;
    public $body;
    public $sendJson;

    private function __construct()
    {

    }

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

    public function postWebhook(PostTeamsWebhookMentionerEntity $MentionerEntity)
    {
        $this->sendJson = new SendJsonTemplete($this->subject, $this->body, $MentionerEntity);
        $json = htmlspecialchars(str_replace('"schema"', '"$schema"', stripslashes(json_encode($this->sendJson, JSON_UNESCAPED_UNICODE))));
        
        var_dump($json);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->webhookURL);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type:application/json',]);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($json));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $http_str = curl_exec($ch);
        curl_close($ch);
        var_dump($http_str);
        return;
    }

}
?>