// ----- CLASS: ImageManager {
  function ImageManager {
    this.unloaded = 0;
    this.graphics = new Array();

    this.load = function(imageURL,callback_object,callback_function,callback_arguments) {
      if(imageURL == undefined) { throw "Tried to load an image with an undefined imageURL"; }
      this.unloaded++;

      if(this.graphics[imageURL] == undefined) { // Doesn't exist
	this.graphics[imageURL] = new Image();
	this.graphics[imageURL].loaded = false;
      }
      else if(this.graphics[imageURL].loaded = true) { // Exists and is loaded
	console.log('Graphic "'+imageURL+'" already loaded.');
	this.loaded(callback_object,callback_function,callback_arguments);
      }
      else {
	this.graphics[imageURL].addEventListener('load',function(thisObj) { // Exists but has not loaded yet
	  this.loaded = true;
	  console.log('Graphic "'+imageURL+'" finished loading.');
	  thisObj.loaded(callback_object,callback_function,callback_arguments);
	},this);
	this.graphics[imageURL].src = 'images/'+imageURL+'.png';
      }
    }

    this.loaded = function loaded(callback_object,callback_function,callback_arguments) {
      this.unloaded--;
      if(callback_object != undefined) { callback_object[callback_function](callback_arguments); }
    }

    this.get = function(imageURL) {
      if(this.graphics[imageURL] == undefined || this.graphics[imageURL].loaded == false) {
	return false;
      }
      else {
	return this.graphics[imageURL];
      }
    }
  }
// ----- }