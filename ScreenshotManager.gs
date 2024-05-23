function saveScreenShot() {
  // スクリーンショットを取得したいウェブページのURL
  const url = 'https://lookerstudio.google.com/embed/reporting/559def9a-4090-471e-8b7a-eebd6abc420e/page/lwSzD';
  // s.wordpress.com/mshots の URL, w/hでサイズ指定
  const requestUrl = 
      'https://s.wordpress.com/mshots/v1/' 
      + url
      + '?w=' + 800
      + '&h=' + 600;

  const responseBlob = UrlFetchApp.fetch(requestUrl).getBlob();
  Utilities.sleep(6000* 10); // 画像出来上がるまで待機

  // 保存先GoogleドライブID 
  const folderId = '1QeYaJk_KZ5Qmt4MKfzqJdqoYU_tFJhaJ'; 
  // 保存ファイル名
  const fileName = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'YYYY-MM-dd-hhmmss') + '.png';
  DriveApp.getFolderById(folderId).createFile(responseBlob).setName(fileName);
}



