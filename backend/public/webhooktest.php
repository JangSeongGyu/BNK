<?php
$data = array(
            'text' => 'Hellow Teams'
          );

$url = "https://micp.webhook.office.com/webhookb2/b1e704da-56de-46e2-b287-6fe28a3f4a8f@d129adab-e2e3-4e5d-951e-0cafe6fb1744/IncomingWebhook/82f6ec2fc34e4a02bf0a8e564cb98da9/5dc9a728-2c54-4503-9ee9-ccdd7e4abe71";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type:application/json',
  ]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch,CURLOPT_SSL_VERIFYPEER, FALSE);  // オレオレ証明書対策
curl_setopt($ch,CURLOPT_SSL_VERIFYHOST, FALSE);  // 
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$out = curl_exec($ch);
var_dump($out);
curl_close($ch);