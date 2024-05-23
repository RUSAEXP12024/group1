// 全灯ボタン
function TurnOn_Light() {
  var AIRCON_ID = '6ae6183a-179f-48b8-844c-eb412448da8f'
  var REMO_ACCESS_TOKEN = 'BYjnCu7se9WR5VHvCCYsnCt01_C4biaDwj98J3O0s8I.68K6Wf2IK6KJVsdhgNU9qBmlj8V4ZuMhAPHFU7KdgtE'

  var url = 'https://api.nature.global/1/appliances/' + AIRCON_ID + '/aircon_settings';
  var headers = {
    'Authorization': 'Bearer ' + REMO_ACCESS_TOKEN,
  };


  var postData = {
    'button' : 'power-on'
  }

  var options = {
    muteHttpExceptions : true,
    'method' : 'post',
    'headers' : headers,
    'payload' : postData
  };

  var loging = UrlFetchApp.fetch(url, options);

  console.log(JSON.parse(loging));
}

function TurnOn_Light() {
  var AIRCON_ID = '6ae6183a-179f-48b8-844c-eb412448da8f'
  var REMO_ACCESS_TOKEN = 'BYjnCu7se9WR5VHvCCYsnCt01_C4biaDwj98J3O0s8I.68K6Wf2IK6KJVsdhgNU9qBmlj8V4ZuMhAPHFU7KdgtE'

  var url = 'https://api.nature.global/1/appliances/' + AIRCON_ID + '/aircon_settings';
  var headers = {
    'Authorization': 'Bearer ' + REMO_ACCESS_TOKEN,
  };


  var postData = {
    'button' : 'power-off'
  }

  var options = {
    muteHttpExceptions : true,
    'method' : 'post',
    'headers' : headers,
    'payload' : postData
  };

  var loging = UrlFetchApp.fetch(url, options);

  console.log(JSON.parse(loging));
}
