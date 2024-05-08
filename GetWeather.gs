const sheet_id = '1dUyWo1v0lG_b7z260tWtZRClzfxEtDax1SBtPwfgVvw'
const sheet_name = 'Weather'
const sheet = SpreadsheetApp.openById(sheet_id).getSheetByName(sheet_name);

function getForecast() {
//Open Weather MapのAPIキーを定義する(各自APIキーで書き換え)
let apiKey = '12aade27d646d6777f511d738217b6c8';
let apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=';
let apiUrl2 = 'https://api.openweathermap.org/data/2.5/weather?q=';
//天気予報を取得する都市を定義する(今回は東京を設定)
let city = 'Ibaraki,Osaka,Japan';
//APIリクエストするURLにAPIキーと取得都市のパラメータをセット
let requestUrl = apiUrl + city + '&appid=' + apiKey + '&lang=ja&units=metric';
let requestUrl2 = apiUrl2 + city + '&appid=' + apiKey + '&lang=ja&units=metric';
//UrlFetchAppでOpen Weather MapのAPIから天気予報を取得する
let response = UrlFetchApp.fetch(requestUrl).getContentText();
let response2 = UrlFetchApp.fetch(requestUrl2).getContentText();
//取得したデータはJSON形式のため、JSONとして変換する
let json = JSON.parse(response);
let json2 = JSON.parse(response2);
//スプレッドシートに書き込むための配列を初期化する
let weatherInfo = [];
let weatherInfo2=[];
let new_weatherInfo=[];
new_weatherInfo[0]=[];
new_weatherInfo[0][0]='現在の天気';
new_weatherInfo[0][1] = json2['weather'][0]['description'];
new_weatherInfo[0][2] = json2['main']['temp'];
new_weatherInfo[0][3] = json2['main']['temp_min'];
new_weatherInfo[0][4] = json2['main']['temp_max'];
new_weatherInfo[0][5] = json2['rain'];
new_weatherInfo[0][6] = json2['main']['humidity'];
for (let i = 0; i < json['list'].length-3; i++) {
weatherInfo[i] = [];
//Open Weather Mapから取得した天気予報の中から必要な情報を2次元配列に書き込み
weatherInfo[i][0] = json['list'][i+2]['dt_txt'];
weatherInfo[i][1] = json['list'][i]['weather'][0]['description'];
weatherInfo[i][2] = json['list'][i]['main']['temp'];
weatherInfo[i][3] = json['list'][i]['main']['temp_min'];
weatherInfo[i][4] = json['list'][i]['main']['temp_max'];
weatherInfo[i][5] = json['list'][i]['rain'];
weatherInfo[i][6] = json['list'][i]['main']['humidity'];

}
//スプレッドシートにOpen Weather Mapから取得した天気予報を書き込み
sheet.getRange(1,1).setValue(city);
sheet.getRange(1,2).setValue('天気');
sheet.getRange(1,3).setValue('気温');
sheet.getRange(1,4).setValue('最低気温');
sheet.getRange(1,5).setValue('最高気温');
sheet.getRange(1,6).setValue('降水量(3h)');
sheet.getRange(1,7).setValue('湿度');
sheet.getRange(2, 1, new_weatherInfo.length, new_weatherInfo[0].length).setValues(new_weatherInfo);
sheet.getRange(3, 1, weatherInfo2.length, weatherInfo2[0].length).setValues(weatherInfo2);
}
