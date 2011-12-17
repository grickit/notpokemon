function ajaxGetRequest(url) {
  //Not IE?
  try { var request = new XMLHttpRequest(); }
  catch(e1) {
    //IE6+?
    try { request = new ActiveXObject('Msxml2.XMLHTTP'); }
    catch(e2) {
      //IE5?
      try { request = new ActiveXObject('"Microsoft.XMLHTTP'); }
      catch(e3) {
	//No AJAX for you
	request = false;
      }
    }
  }
  request.open('GET',url,true);
  request.send(null);
  return request;
}
