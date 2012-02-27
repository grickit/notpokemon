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
	this.graphics[imageURL].on_finished = new Callback();
	this.graphics[imageURL].on_finished.subscribe(callback_object,callback_function,callback_arguments);
      }

      if(this.graphics[imageURL].loaded == true) { // Exists and is loaded
	game.terminal.write('Graphic "'+imageURL+'" already loaded.');
	this.graphics[imageURL].on_finished.subscribe(callback_object,callback_function,callback_arguments);
	this.loaded(imageURL);
      }
      else { // Exists but has not loaded yet
	var foo = this; // Ugly hack
	this.graphics[imageURL].onload = function() {
	  foo.graphics[imageURL].loaded = true;
	  game.terminal.write('Graphic "'+imageURL+'" finished loading.');
	  foo.loaded(imageURL);
	}

	this.graphics[imageURL].src = 'images/'+imageURL+'.png'; // Begin loading
      }
    }

    this.loaded = function loaded(imageURL) {
      this.unloaded--;
      this.graphics[imageURL].on_finished.fire();
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