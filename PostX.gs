// 必要なライブラリを有効にする
// Twitter用のOAuthライブラリを追加
// 「Resources」 -> 「Advanced Google Services」から「Twitter API Library」を有効にする

function takeScreenshotAndPostToTwitter() {
  // APIFLASHのAPIキー
  var apiFlashApiKey = '21a9ce258e78454ba90a40b8ea53a0e8';

  // Twitter APIの認証情報
  var twitterApiKey = 'wvQw2IY8hsVLbbYUjesOLM8UV';
  var twitterApiSecretKey = 'CWssTc3PUMI2a8e69aMFJGMC4OV8EcrRNiM6uIGkp2uMB6vbYj';
  var twitterAccessToken = '1773258817209573377-imk38o2OdcDJpsnoLBME1eqnmtHrt4';
  var twitterAccessTokenSecret = 'pNI6vwTAMBXRnGVImv7pEn57HVliQhKu2tlHPxrGxmqbx';

  // スクリーンショットを取得したいウェブサイトのURL
  var websiteUrl = 'https://lookerstudio.google.com/embed/reporting/559def9a-4090-471e-8b7a-eebd6abc420e/page/lwSzD';

  // APIFLASHのスクリーンショットAPIのエンドポイント
  var apiUrl = 'https://api.apiflash.com/v1/urltoimage';

  // パラメータの設定
  var payload = {
    access_key: apiFlashApiKey,
    url: websiteUrl,
    full_page: true, // ページ全体をキャプチャする場合はtrueに設定
    format: 'png',   // 画像の形式を指定
    viewport: '1440x900' // ウェブページのサイズを指定
  };

  // APIFLASHにリクエストを送信
  var response = UrlFetchApp.fetch(apiUrl, {
    method: 'get',
    muteHttpExceptions: true,
    payload: payload
  });

  if (response.getResponseCode() == 200) {
    // スクリーンショットの取得に成功した場合
    var imageBlob = response.getBlob().setName('screenshot.png');

    // 取得した画像をTwitterに送信する
    postImageToTwitter(imageBlob, twitterApiKey, twitterApiSecretKey, twitterAccessToken, twitterAccessTokenSecret);
  } else {
    // スクリーンショットの取得に失敗した場合
    Logger.log('Failed to take screenshot: ' + response.getContentText());
  }
}

// Twitterに画像を送信する関数
function postImageToTwitter(imageBlob, apiKey, apiSecretKey, accessToken, accessTokenSecret) {
  var oauthConfig = UrlFetchApp.addOAuthService('twitter');
  oauthConfig.setRequestTokenUrl('https://api.twitter.com/oauth/request_token');
  oauthConfig.setAuthorizationUrl('https://api.twitter.com/oauth/authorize');
  oauthConfig.setAccessTokenUrl('https://api.twitter.com/oauth/access_token');
  oauthConfig.setConsumerKey(apiKey);
  oauthConfig.setConsumerSecret(apiSecretKey);
  oauthConfig.setAccessToken(accessToken);
  oauthConfig.setAccessTokenSecret(accessTokenSecret);

  var imageUrl = 'https://upload.twitter.com/1.1/media/upload.json';
  var payload = {
    method: 'post',
    contentType: 'multipart/form-data',
    payload: {
      media: imageBlob
    },
    oauthServiceName: 'twitter',
    muteHttpExceptions: true
  };

  var response = UrlFetchApp.fetch(imageUrl, payload);

  if (response.getResponseCode() == 200) {
    var mediaId = JSON.parse(response.getContentText()).media_id_string;

    var tweetUrl = 'https://api.twitter.com/1.1/statuses/update.json';
    var tweetPayload = {
      status: 'Here is the screenshot of the website.',
      media_ids: mediaId
    };

    var tweetResponse = UrlFetchApp.fetch(tweetUrl, {
      method: 'post',
      contentType: 'application/x-www-form-urlencoded',
      payload: tweetPayload,
      oauthServiceName: 'twitter',
      muteHttpExceptions: true
    });

    if (tweetResponse.getResponseCode() == 200) {
      Logger.log('Screenshot posted to Twitter successfully.');
    } else {
      Logger.log('Failed to post tweet: ' + tweetResponse.getContentText());
    }
  } else {
    Logger.log('Failed to upload media to Twitter: ' + response.getContentText());
  }
}

function getService() {
  pkceChallengeVerifier();
  const userProps = PropertiesService.getUserProperties();
  const scriptProps = PropertiesService.getScriptProperties();
  const clientId = 'ZTlQYXp2cTVKRDU2WUs1ZkpnOVk6MTpjaQ'
  const clientSecret = 'D5rzDdh_M8G4NxHuOXkMtnYtZC2kRPfeeWoPdip2Bd_TiyEQxS'
  return OAuth2.createService('twitter')
    .setAuthorizationBaseUrl('https://twitter.com/i/oauth2/authorize')
    .setTokenUrl('https://api.twitter.com/2/oauth2/token?code_verifier=' + userProps.getProperty("code_verifier"))
    .setClientId(clientId)
    .setClientSecret(clientSecret)
    .setCallbackFunction('authCallback')
    .setPropertyStore(userProps)
    .setScope('users.read tweet.read tweet.write offline.access')
    .setParam('response_type', 'code')
    .setParam('code_challenge_method', 'S256')
    .setParam('code_challenge', userProps.getProperty("code_challenge"))
    .setTokenHeaders({
      'Authorization': 'Basic ' + Utilities.base64Encode(clientId + ':' + clientSecret),
      'Content-Type': 'application/x-www-form-urlencoded'
    })
}

function main() {
  const service = getService();
  if (service.hasAccess()) {
    Logger.log("Already authorized");
  } else {
    const authorizationUrl = service.getAuthorizationUrl();
    Logger.log('Open the following URL and re-run the script: %s', authorizationUrl);
  }
}

function authCallback(request) {
  const service = getService();
  const authorized = service.handleCallback(request);
  if (authorized) {
    return HtmlService.createHtmlOutput('Success!');
  } else {
    return HtmlService.createHtmlOutput('Denied.');
  }
}

function pkceChallengeVerifier() {
  var userProps = PropertiesService.getUserProperties();
  if (!userProps.getProperty("code_verifier")) {
    var verifier = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";

    for (var i = 0; i < 128; i++) {
      verifier += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    var sha256Hash = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, verifier)

    var challenge = Utilities.base64Encode(sha256Hash)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')
    userProps.setProperty("code_verifier", verifier)
    userProps.setProperty("code_challenge", challenge)
  }
}

function logRedirectUri() {
  var service = getService();
  Logger.log(service.getRedirectUri());
}
