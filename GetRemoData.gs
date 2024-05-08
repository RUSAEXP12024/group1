function recordSensorData() { // センサデータ記録用関数
  const deviceData = getNatureRemoData("devices"); // Remo3からデータ取得
  const lastSensorData = getLastData("Remo"); // シートの最終行を取得

  var arg = {
    te:deviceData[0].newest_events.te.val, // 温度
    hu:deviceData[0].newest_events.hu.val, // 湿度
    il:deviceData[0].newest_events.il.val, // 照度
  }

  setSensorData(arg, lastSensorData + 1); // スプレッドシートに記録
}

function setSensorData(data, row) { // スプレッドシートへの記録を行う関数
  getSheet('Remo').getRange(row, 1, 1, 4).setValues([[new Date(), data.te, data.hu, data.il]])
}

function getNatureRemoData(endpoint) { // Remo3からのデータ取得を行う関数
  const REMO_ACCESS_TOKEN = 'BYjnCu7se9WR5VHvCCYsnCt01_C4biaDwj98J3O0s8I.68K6Wf2IK6KJVsdhgNU9qBmlj8V4ZuMhAPHFU7KdgtE'
  const headers = {
    "Content-Type" : "application/json;",
    'Authorization': 'Bearer ' + REMO_ACCESS_TOKEN,
  };

  const options = {
    "method" : "get",
    "headers" : headers,
  };

  return JSON.parse(UrlFetchApp.fetch("https://api.nature.global/1/" + endpoint, options));
}

function getSheet(name) { // スプレッドシート取得用関数
  const SPREADSHEET_ID = '1dUyWo1v0lG_b7z260tWtZRClzfxEtDax1SBtPwfgVvw'
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(name);

  if (!sheet) {
    throw new Error('シートが見つかりません');
  }

  return sheet;
}

function getLastData(name) { // 最終行取得用関数
  return getSheet(name).getDataRange().getValues().length;
}
