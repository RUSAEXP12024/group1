const sheet_id = '1dUyWo1v0lG_b7z260tWtZRClzfxEtDax1SBtPwfgVvw';
const sheet_name = 'Weather';
const sheet = SpreadsheetApp.openById(sheet_id).getSheetByName(sheet_name);

function getForecast() {
  // Open Weather MapのAPIキーを定義する（各自APIキーで書き換え）
  let apiKey = '12aade27d646d6777f511d738217b6c8';
  let apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=';
  let apiUrl2 = 'https://api.openweathermap.org/data/2.5/weather?q=';

  // 天気予報を取得する都市を定義する（今回は大阪を設定）
  let city = 'Ibaraki, Osaka, Japan';
  const date = new Date();

  // APIリクエストするURLにAPIキーと取得都市のパラメータをセット
  let requestUrl = apiUrl + city + '&appid=' + apiKey + '&lang=ja&units=metric';
  let requestUrl2 = apiUrl2 + city + '&appid=' + apiKey + '&lang=ja&units=metric';

  // UrlFetchAppでOpen Weather MapのAPIから天気予報を取得する
  let response = UrlFetchApp.fetch(requestUrl).getContentText();
  let response2 = UrlFetchApp.fetch(requestUrl2).getContentText();

  // 取得したデータはJSON形式のため、JSONとして変換する
  let json = JSON.parse(response);
  let json2 = JSON.parse(response2);

  // スプレッドシートに書き込むための配列を初期化する
  let new_weatherInfo = [];
  new_weatherInfo[0] = [
    date,
    json2['weather'][0]['description'],
    json2['main']['temp'],
    json2['main']['temp_min'],
    json2['main']['temp_max'],
    json2['rain'] || '0', // 降水量がない場合に0を設定
    json2['main']['humidity']
  ];

  // 最終行を取得し、その次の行からデータを書き込む
  let lastRow = sheet.getLastRow();
  if (lastRow === 0) {
    // 最初の行にヘッダーを書き込み
    sheet.getRange(1, 1).setValue('日時');
    sheet.getRange(1, 2).setValue('天気');
    sheet.getRange(1, 3).setValue('気温');
    sheet.getRange(1, 4).setValue('最低気温');
    sheet.getRange(1, 5).setValue('最高気温');
    sheet.getRange(1, 6).setValue('降水量(3h)');
    sheet.getRange(1, 7).setValue('湿度');
    lastRow = 1; // ヘッダー行を考慮して最初のデータ行
  }

  // 新しいデータを最終行に追加
  sheet.getRange(lastRow + 1, 1, new_weatherInfo.length, new_weatherInfo[0].length).setValues(new_weatherInfo);
}
