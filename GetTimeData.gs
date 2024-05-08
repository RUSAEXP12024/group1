function myFunction() {

  var now = new Date();

  var formattedDate =
  Utilities.formatDate(now,"JST","yyyy/MM/dd HH:mm:ss");

  console.log(formattedDate);
}
