<?php

namespace App\MyDefined\Entity\Taxi;

use Illuminate\Support\Collection;
use stdClass;

class MentionerTemplete{
    public $id;
    public $name;

    public function __construct(stdClass $record)
    {
        $this->id = $record->id;
        $this->name = $record->表示名;
    }
}

class MentionTemplete{
    public $type = "mention";
    public $text;
    public $mentioned;

    public function __construct(stdClass $record)
    {
        $this->text = $record->atタグ;
        $this->mentioned = new MentionerTemplete($record);
    }
}

final class PostTeamsWebhookMentionerEntity{
    public $entities = [];

    private function __construct()
    {

    }

    public static function reconstructFromRepository(Collection $rows): PostTeamsWebhookMentionerEntity 
    {
        $selfEntity = new self();
        foreach($rows as $record){
            array_push($selfEntity->entities, new MentionTemplete($record));
        }
        return $selfEntity;
    }
}
?>