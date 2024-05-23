function calculateDiscomfortIndex() {
  try {
    const sensorData = getLastSensorData(); // 最終行のセンサデータを取得
    const temperature = sensorData.te;
    const humidity = sensorData.hu;
    Logger.log("Temperature: " + temperature); // 温度をログに出力
    Logger.log("Humidity: " + humidity); // 湿度をログに出力
    // 不快指数を計算
    if (temperature !== undefined && humidity !== undefined) {
      var discomfortIndex = 0.81 * temperature + 0.01 * humidity * (0.99 * temperature - 14.3) + 46.3;
      Logger.log("Discomfort Index: " + discomfortIndex);
      // 閾値
      var temperatureThreshold = 30; // 高い温度の閾値
      var temperatureCold = 10;      // 低い温度の閾値
      var humidityThreshold = 70;    // 高い湿度の閾値
      var humidityDry = 40;          // 低い湿度の閾値
      var discomfortThreshold = 80;  // 不快指数の閾値
      // 閾値を超えた場合に通知
      var exceededMessage = [];
      if (discomfortIndex > discomfortThreshold) {
        exceededMessage.push("不快指数が閾値を超えました！気をつけてください。");
      }
      if (temperature > temperatureThreshold) {
        exceededMessage.push(" 今めっちゃ暑いです！ ");
      }
      if (temperature < temperatureCold) {
        exceededMessage.push(" 今めっちゃ寒いです！ ");
      }
      if (humidity > humidityThreshold) {
        exceededMessage.push(" 今ジメジメしてます！ ");
      }
      if (humidity < humidityDry) {
        exceededMessage.push(" 今乾燥してます！ ");
      }
      if (exceededMessage.length > 0) {
        sendNotificationToSpreadsheet(discomfortIndex, temperature, humidity, exceededMessage.join(" "));
      } else {
        sendNotificationToSpreadsheet(discomfortIndex, temperature, humidity, null);
      }
    } else {
      Logger.log("Temperature or Humidity data is missing.");
    }
  } catch (e) {
    Logger.log("Error calculating discomfort index: " + e.message);
  }
}
function getLastSensorData() { // 最終行のセンサデータを取得する関数
  try {
    const sheet = getSheet('Remo');
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) { // ヘッダー行があることを前提
      const dataRange = sheet.getRange(lastRow, 1, 1, 4);
      const lastData = dataRange.getValues()[0];
      Logger.log("Last Data: " + lastData);
      return {
        te: lastData[1], // 温度
        hu: lastData[2], // 湿度
        il: lastData[3]  // 照度
      };
    } else {
      throw new Error('No data available in the sheet.');
    }
  } catch (e) {
    Logger.log("Error getting last sensor data: " + e.message);
    throw e;
  }
}
function sendNotificationToSpreadsheet(discomfortIndex, temperature, humidity, exceededMessage) {
  var spreadsheetId = '1dUyWo1v0lG_b7z260tWtZRClzfxEtDax1SBtPwfgVvw'; // 通知を送信するスプレッドシートのID
  var sheetName = 'Notifications'; // 通知を保存するシート名
  try {
    Logger.log("Attempting to open spreadsheet with ID: " + spreadsheetId);
    var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    Logger.log("Spreadsheet opened successfully.");
    var sheet = spreadsheet.getSheetByName(sheetName);
    Logger.log("Attempting to open sheet with name: " + sheetName);
    if (sheet) {
      Logger.log("Sheet opened successfully.");
      let lastRow = sheet.getLastRow();
      if (lastRow === 0) {
        // 最初の行にヘッダーを書き込み
        sheet.getRange(1, 1).setValue('日時');
        sheet.getRange(1, 2).setValue('メッセージ');
        lastRow = 1; // ヘッダー行を考慮して最初のデータ行
      }
      var message;
      if (exceededMessage) {
        message = exceededMessage;
      } else {
        var messages = [
          "不快指数が閾値を超えていません。気持ちの良い日です！",
          "今日は快適です。異常ありません。",
          "快適な環境です。不快指数は正常範囲内です。"
        ];
        message = messages[Math.floor(Math.random() * messages.length)];
      }
      var notificationData = [
        new Date(), // 日時
        message     // メッセージ
      ];
      // 次の行にデータを書き込む
      sheet.getRange(lastRow + 1, 1, 1, 2).setValues([notificationData]);
      Logger.log("Notification data written to sheet.");
    } else {
      Logger.log("Sheet named 'Notifications' not found in the spreadsheet.");
    }
  } catch (e) {
    Logger.log("Error accessing the spreadsheet: " + e.message);
  }
}
function getSheet(name) { // スプレッドシート取得用関数
  const SPREADSHEET_ID = '1dUyWo1v0lG_b7z260tWtZRClzfxEtDax1SBtPwfgVvw';
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(name);
  if (!sheet) {
    throw new Error('シートが見つかりません');
  }
  return sheet;
}
function getNatureRemoData(endpoint) { // Remo3からのデータ取得を行う関数
  const REMO_ACCESS_TOKEN = 'BYjnCu7se9WR5VHvCCYsnCt01_C4biaDwj98J3O0s8I.68K6Wf2IK6KJVsdhgNU9qBmlj8V4ZuMhAPHFU7KdgtE';
  const headers = {
    "Content-Type": "application/json;",
    'Authorization': 'Bearer ' + REMO_ACCESS_TOKEN,
  };
  const options = {
    "method": "get",
    "headers": headers,
  };
  return JSON.parse(UrlFetchApp.fetch("https://api.nature.global/1/" + endpoint, options));
}
function getLastData(name) { // 最終行取得用関数
  return getSheet(name).getDataRange().getValues().length;
}