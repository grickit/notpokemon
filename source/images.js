// ----- CLASS: sprite {
  function sprite(args) {
    if(args.imageURL == undefined) { throw "New sprite has undefined imageURL"; }
    this.loaded = false;
    this.imageURL = args.imageURL;
    this.x = (args.x == undefined)? 0 : args.x;
    this.y = (args.y == undefined)? 0 : args.y;
    this.width = (args.width == undefined)? 16 : args.width;
    this.height = (args.height == undefined)? 16 : args.height;
    this.xoffset = (args.xoffset == undefined)? 0 : args.xoffset;
    this.yoffset = (args.yoffset == undefined)? 0 : args.yoffset;

    // For characters
    this.trackxoffset = (args.trackxoffset == undefined)? 0 : args.trackxoffset;
    this.trackyoffset = (args.trackyoffset == undefined)? 0 : args.trackyoffset;

    // For tiles
    this.condition = (args.condition == undefined)? '(.+),(.+),(.+),(.+),(.+),(.+),(.+),(.+),(.+)' : args.condition;

    // For animations
    this.duration = (args.duration == undefined)? 100 : args.duration;
  }
// ----- }

// ----- CLASS: animation {
  function animation(frames,loop) {
    this.frames = frames;
    this.index = 0;
    this.current = this.frames[this.index];
    this.paused = true;
    this.loop = (loop == undefined)? false : loop;

    this.next = function() {
      this.index++;
      if(this.index >= this.frames.length) {
	this.index = 0;
      }
      this.current = this.frames[this.index];
      this.timeout = setTimeout(function(thisObj) { thisObj.next(); },this.current.duration, this);
      this.paused = false;
      if (this.index == 0 && this.loop != true) {
	this.stop();
      }
    }

    this.stop = function() {
      clearTimeout(this.timeout);
      this.paused = true;
      this.index = 0;
      this.current = this.frames[this.index];
    }

    this.restart = function() {
      clearTimeout(this.timeout);
      this.paused = false;
      this.index = 0;
      this.current = this.frames[this.index];
      this.timeout = setTimeout(function(thisObj) { thisObj.next(); },this.current.duration, this);
    }

    this.reset = function() {
      clearTimeout(this.timeout);
      this.paused = true;
      this.index = 0;
      this.current = this.frames[this.index];
    }
  }
// ----- }

// ----- OBJECT: images {
  var images = {
    unloaded: 0,
    graphics: new Array(),
  };

  images.load = function(imageURL,callback_object,callback_function,callback_arguments) {
    if(imageURL == undefined) { throw "New sprite has undefined imageURL"; }
    images.unloaded++;
    if(images.graphics[imageURL] == undefined) {
      images.graphics[imageURL] = new Image();
      images.graphics[imageURL].loaded = false;
    }
    if(images.graphics[imageURL].loaded) {
      game.terminal.write('Graphic "'+imageURL+'" already loaded.');
      images.unloaded--;
      if(callback_object != undefined) { callback_object[callback_function](callback_arguments); }
      return;
    }
    else {
      images.graphics[imageURL].addEventListener('load',function() {
	images.unloaded--;
	images.graphics[imageURL].loaded = true;
	game.terminal.write('Graphic "'+imageURL+'" finished loading.');
	if(callback_object != undefined) { callback_object[callback_function](callback_arguments); }
      });
      images.graphics[imageURL].src = 'images/'+imageURL+'.png';
    }
  }

  images.get = function(imageURL) {
    if(images.graphics[imageURL] == undefined || images.graphics[imageURL].loaded == false) {
      return images.graphics['404'];
    }
    else {
      return images.graphics[imageURL];
    }
  }
// ----- }