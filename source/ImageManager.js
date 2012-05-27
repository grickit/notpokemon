// ----- CLASS: ImageManager {
  function ImageManager() {
    var self = this;
    // ----- Properties
    self.unloaded = 0;
    self.graphics = new Array();

    // ----- Methods
    self.load = function(imageURL,callback_function) {
      if(!isset(imageURL)) { throw "Tried to load an image with an undefined imageURL"; }

      if(!isset(self.graphics[imageURL])) { // Doesn't exist
	self.graphics[imageURL] = new Image();
	self.graphics[imageURL].loaded = false;
	self.graphics[imageURL].on_finished = new Callback();
      }

      self.unloaded++;
      self.graphics[imageURL].on_finished.subscribe(callback_function,true);
      if(self.graphics[imageURL].loaded == true) { // Exists and is loaded
	game.stdout.write('Graphic "'+imageURL+'" already loaded.');
      }
      else { // Exists but has not loaded yet
	addEventListener(self.graphics[imageURL],'load',function() {
	  game.stdout.write('Graphic "'+imageURL+'" finished loading.');
	  self.graphics[imageURL].loaded = true;
	  self.unloaded--;
	  self.graphics[imageURL].on_finished.fire();
	});
	self.graphics[imageURL].src = 'images/'+imageURL+'.png'; // Begin loading
      }
    }

    self.get = function(imageURL) {
      if(!isset(self.graphics[imageURL]) || self.graphics[imageURL].loaded == false) { return false; }
      else { return self.graphics[imageURL]; }
    }
  }
// ----- }