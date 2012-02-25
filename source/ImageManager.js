// ----- CLASS: ImageManager {
  function ImageManager() {
    this.unloaded = 0;
    this.graphics = new Array();

    this.load = function(imageURL,callback_object,callback_function,callback_arguments) {
      if(imageURL == undefined) { throw "Tried to load an image with an undefined imageURL"; }
      this.unloaded++;

      if(this.graphics[imageURL] == undefined) { // Doesn't exist
	this.graphics[imageURL] = new Image();
	this.graphics[imageURL].loaded = false;
      }

      if(this.graphics[imageURL].loaded == true) { // Exists and is loaded
	console.log('Graphic "'+imageURL+'" already loaded.');
	this.loaded(callback_object,callback_function,callback_arguments);
      }
      else { // Exists but has not loaded yet
	var foo = this; // Ugly hack
	this.graphics[imageURL].onload = function() {
	  foo.graphics[imageURL].loaded = true;
	  console.log('Graphic "'+imageURL+'" finished loading.');
	  foo.loaded(callback_object,callback_function,callback_arguments);
	}

	this.graphics[imageURL].src = 'images/'+imageURL+'.png'; // Begin loading
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