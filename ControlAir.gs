/* エアコンの電源を入れる */
function TurnOn_AirCon() {
  var AIRCON_ID = '3c78c0a8-7f90-4e91-be6b-bbd181865b86'
  var REMO_ACCESS_TOKEN = 'BYjnCu7se9WR5VHvCCYsnCt01_C4biaDwj98J3O0s8I.68K6Wf2IK6KJVsdhgNU9qBmlj8V4ZuMhAPHFU7KdgtE'

  var url = 'https://api.nature.global/1/appliances/' + AIRCON_ID + '/aircon_settings';
  var headers = {
    'Authorization': 'Bearer ' + REMO_ACCESS_TOKEN,
  };


  var postData = {
    'button' : ''
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

/* エアコンの電源を切る */
function TurnOff_AirCon() {
  var AIRCON_ID = '3c78c0a8-7f90-4e91-be6b-bbd181865b86'
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

/* エアコンのモードを暖房にする */
function Warm_AirCon() {
  var AIRCON_ID = '3c78c0a8-7f90-4e91-be6b-bbd181865b86'
  var REMO_ACCESS_TOKEN = 'BYjnCu7se9WR5VHvCCYsnCt01_C4biaDwj98J3O0s8I.68K6Wf2IK6KJVsdhgNU9qBmlj8V4ZuMhAPHFU7KdgtE'

  var url = 'https://api.nature.global/1/appliances/' + AIRCON_ID + '/aircon_settings';
  var headers = {
    'Authorization': 'Bearer ' + REMO_ACCESS_TOKEN,
  };


  var postData = {
    'operation_mode' : 'warm'
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

/* エアコンのモードを冷房にする */
function Cool_AirCon() {
  var AIRCON_ID = '3c78c0a8-7f90-4e91-be6b-bbd181865b86'
  var REMO_ACCESS_TOKEN = 'BYjnCu7se9WR5VHvCCYsnCt01_C4biaDwj98J3O0s8I.68K6Wf2IK6KJVsdhgNU9qBmlj8V4ZuMhAPHFU7KdgtE'

  var url = 'https://api.nature.global/1/appliances/' + AIRCON_ID + '/aircon_settings';
  var headers = {
    'Authorization': 'Bearer ' + REMO_ACCESS_TOKEN,
  };


  var postData = {
    'operation_mode' : 'cool'
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