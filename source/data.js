var data = new Array();
var unloaded_data = 0;
function preloadData(url) {
  request = new ajaxGetRequest(url)

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status != 404) {
      data[url] = this.responseText;
      unloaded_data--;
    }
  }
}