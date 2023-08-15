<?php

namespace App\MyDefined\UseCase\Taxi;

use App\MyDefined\Entity\General\UserEntity;
use App\MyDefined\Entity\Taxi\PostTeamsWebhookEntity;

use App\MyDefined\Repository\Taxi\GetRepoInterface;

/**
 * [Taxi]TeamsにWebhook通知をする
 */
final class PostTeamsWebhookUseCase
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
     * 1．ユーザー情報取得
     * 2. WebhookのURL、件名、本文を取得
     * 3. 投稿時のメンション先を取得
     * 4. Teamsへ投稿
     */
    public function execute(string $webhookCategory){
        $UserEntity = UserEntity::reconstructFromUseCase();
        $WebhookEntity = $this->getRepository->getWebhook($webhookCategory);
        $WebhookMentionerEntity = $this->getRepository->getWebhookMentioner($webhookCategory);
        $WebhookEntity->postWebhook($WebhookMentionerEntity);
        return;
    }
}
