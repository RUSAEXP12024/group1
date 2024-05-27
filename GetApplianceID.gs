/*get Appliances Data*/
function getAppliancesData() {
  var REMO_ACCESS_TOKEN = 'BYjnCu7se9WR5VHvCCYsnCt01_C4biaDwj98J3O0s8I.68K6Wf2IK6KJVsdhgNU9qBmlj8V4ZuMhAPHFU7KdgtE'
  var url = 'https://api.nature.global/1/appliances';
  var headers = {
    'Content-Type' : 'application/json;',
    'Authorization': 'Bearer ' + REMO_ACCESS_TOKEN,
  };

  var options = {
    'method' : 'get',
    'headers' : headers,
  };

  var data = JSON.parse(UrlFetchApp.fetch(url, options));

  console.log(data);
}