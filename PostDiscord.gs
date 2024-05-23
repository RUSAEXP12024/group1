function takeScreenshotAndPostToDiscord() {
  // APIFLASHのAPIキー
  var apiFlashApiKey = '21a9ce258e78454ba90a40b8ea53a0e8';

  // Discord Webhook URL
  var discordWebhookUrl = 'https://discord.com/api/webhooks/1240183185846042714/MpLXcXfBf3K1I210TiC1I2SImy2KPzMBzTalyOxXgRQRnr5yBklJgI9a-z0zAix2-0PY';

  // スクリーンショットを取得したいウェブサイトのURL
  var websiteUrl = 'https://lookerstudio.google.com/embed/reporting/559def9a-4090-471e-8b7a-eebd6abc420e/page/lwSzD';

  var temp1=readBottomCellValue('B');
  var temp2=readBottomCellValue('C');

  var message = "現在の室内温度は"+temp1+"、室内湿度は"+temp2+"です。";
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
    
    // 取得した画像をDiscordに送信する
    postImageToDiscord(discordWebhookUrl, imageBlob,
    message);
  } else {
    // スクリーンショットの取得に失敗した場合
    Logger.log('Failed to take screenshot: ' + response.getContentText());
  }
}


// Discordに画像を送信する関数
// Discordに画像を送信する関数
function postImageToDiscord(webhookUrl, imageBlob,message) {
  var timestamp = new Date().getTime(); // 現在のタイムスタンプを取得
  var filename = 'screenshot_' + timestamp + '.png'; // 一意のファイル名を生成
  var data = {
    content:message,
        file: {
      "name": filename,
      "blob": imageBlob
    }
  };

  var options = {
    method: 'post',
    payload: data,
    muteHttpExceptions: true
  };

  var response = UrlFetchApp.fetch(webhookUrl, options);

  if (response.getResponseCode() === 200) {
    Logger.log('Screenshot sent to Discord successfully.');
  } else {
    Logger.log('Failed to send screenshot to Discord: ' + response.getContentText());
  }
}
function readBottomCellValue(a) {
  // スプレッドシートのIDを指定
  var spreadsheetId = '1dUyWo1v0lG_b7z260tWtZRClzfxEtDax1SBtPwfgVvw';
  
  // シート名を指定
  var sheetName = 'Remo';
  
  // スプレッドシートにアクセス
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  
  // シートにアクセス
  var sheet = spreadsheet.getSheetByName(sheetName);
  
  // 最終行を取得
  var lastRow = sheet.getLastRow();
  
  // 読み込みたい列の位置を指定 (例: A列)
  var column = a;
  
  // 最終行のセルの値を取得
  var cell = sheet.getRange(column + lastRow);
  var value = cell.getValue();
  
  // ログに出力（デバッグ用）
  Logger.log(value);
  
  return value;
}



