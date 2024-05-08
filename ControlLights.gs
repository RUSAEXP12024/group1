// 全灯ボタン
function Light_On(){
    var url = "https://api.nature.global/1/signals/[ここに操作したいsignalsのIDを入力]/send"
    var options = {
      "method" : "post",
      "headers" : {"Authorization" : "Bearer [C4mDoyGo3RLoN_RJf-jn1GIpDgDBNEbTHOjGU1YxTcg.xiVYXKWKbN8RhXJsIpqtOJ_g4z-cCl-f45XzhwRRllU]"}
    };
    var reply = UrlFetchApp.fetch(url, options);
}

function Light_Off(){
  
}
