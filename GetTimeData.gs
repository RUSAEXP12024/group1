/**
 * タイムゾーンごとの時刻情報を Google スプレッドシートに書き込む
 */
function writeTimeInfoToSheet() {
  // TimeAPI の URL と API キー
  const TIME_API_URL = "https://timeapi.io/api/Time/current/zone?timeZone=Asia/Tokyo";
  
  // 対象スプレッドシートとシート
  const spreadsheetId = "1dUyWo1v0lG_b7z260tWtZRClzfxEtDax1SBtPwfgVvw";
  const sheetName = "Time";
  const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  
  // API コールを実行
  const response = UrlFetchApp.fetch(TIME_API_URL, {
    method: "get",
    muteHttpExceptions: true
  });
  
  // JSON 形式でデータを取得
  const timeData = JSON.parse(response.getContentText());
  
  // 日付を分割して年、月、日を取得
  const dateTime = new Date (timeData.dateTime);
  const year = dateTime.getFullYear();
  const month = ("0" + (dateTime.getMonth() + 1)).slice(-2);
  const day = ("0" + dateTime.getDate()).slice(-2);
  const monthDay = `${month}/${day}`;
  
  // 現在のシートの最後の行の次にデータを書き込む
  const lastRow = sheet.getLastRow() + 1;
  
  // 年、月、日、時刻、タイムゾーンをシートに書き込む
  sheet.getRange(lastRow,1).setValue(year);
  sheet.getRange(lastRow,2).setValue(monthDay);
}