function GetDeviceId(){
    var url = BASE_URL + "appliances"
    var options = {
      "method" : "get",
      "headers" : {"Authorization" : "Bearer NATURE_API_ACCESS_TOKEN_RYOGA"}
    };
    var reply = UrlFetchApp.fetch(url, options);
    Logger.log(reply)
}

/* curl -X GET -H "authorization: Bearer C4mDoyGo3RLoN_RJf-jn1GIpDgDBNEbTHOjGU1YxTcg.xiVYXKWKbN8RhXJsIpqtOJ_g4z-cCl-f45XzhwRRllU" "https://api.nature.global/1/appliances"



*/