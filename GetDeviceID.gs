function GetDeviceId(){
    var url = BASE_URL + "appliances"
    var options = {
      "method" : "get",
      "headers" : {"Authorization" : "Bearer NATURE_API_ACCESS_TOKEN_RYOGA"}
    };
    var reply = UrlFetchApp.fetch(url, options);
    Logger.log(reply)
}