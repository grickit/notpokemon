// ----- CLASS: character {
  function character(args) {
    this.prototype = new entity(args);
    entity.call(this, args);

    this.is_moving = false;
    this.speed = 11;
    this.behavior = (args.behavior == undefined)? {style: undefined} : args.behavior;

    setTimeout(function(thisObj){ thisObj.tick(); },randRange(0,1000),this);
  }

  character.prototype.step = function(direction) {
    var newx = this.x + game.directionChanges[direction].x;
    var newy = this.y + game.directionChanges[direction].y;
    this.facing = game.directionNumbers[direction];
    if(game.getTile(this.x, this.y).clipfrom[game.directionNumbers[direction]] && game.getTile(newx,newy).clipto[game.directionNumbers[direction]]) {
      this.is_moving = true;
      this.frame = game.directionWords[this.facing]+'2';
      setTimeout(function(thisObj) { thisObj.frame = game.directionWords[thisObj.facing]+'3'; },game.framesPerSecond,this);
      setTimeout(function(thisObj) { thisObj.frame = game.directionWords[thisObj.facing]+'4'; },game.framesPerSecond*2,this);
      setTimeout(function(thisObj) { thisObj.frame = game.directionWords[thisObj.facing]+'1'; thisObj.setPosition(newx,newy); thisObj.is_moving = false; },game.framesPerSecond*3,this);
    }
  }

  character.prototype.stepRandom = function() {
    var what = randRange(0,2);
    switch(what) {
      case 0:
	this.step(game.directionWords[randRange(0,3)]); break;
      case 1:
	this.facing = randRange(0,3); break;
    }
  }

  character.prototype.pathTo = function(x, y) {
    if(this.path == undefined || this.path.length == 0) {
      this.path = findPath(this.x, this.y, x, y);
    }
    else if(this.path[0].x == x && this.path[0].y == y) { }
    else {
      this.path = findPath(this.x, this.y, x, y);
    }
  }

  character.prototype.followPath = function () {
    if(this.path != undefined && this.path.length > 0) {
      this.step(this.path.pop().direction);
      return true;
    }
    return false;
  }

  character.prototype.updateListing = function() {
    if(document.getElementById('entity'+this.name+'icon')) {
      this.canvas = document.getElementById('entity'+this.name+'icon');
      this.context = this.canvas.getContext('2d');
      this.context.width = 32;
      this.context.height = 32;
      clearCanvas(this.context,'#CFCFCF');
      var sprite = this.sprite.images['south1'];
      this.context.drawImage(this.sprite.image, sprite.x, sprite.y, sprite.width, sprite.height, 0, 0, sprite.width, sprite.height);
      document.getElementById('entity'+this.name+'listing').innerHTML = '<span id="entity'+this.name+'coords">'+this.name+': '+this.x+','+this.y+'</span>';
      document.getElementById('entity'+this.name+'listing').setAttribute('class','entity_listing_'+this.aggro);
    }
  }

  character.prototype.tick = function() {
    if (game.paused) { setTimeout(function(thisObj) { thisObj.tick(); }, 1000, this); return; }
    switch(this.behavior.style) {
      case 'follow':
	if(this.behavior.target == undefined || this.behavior.target == undefined) { // Target invalid?
	  this.behavior = {style: undefined};
	}
	else {
	  var dist = manhattanDistance(this.x, this.y, this.behavior.target.x, this.behavior.target.y);
	  if(this.behavior.min == undefined) { this.behavior.min = 2; }
	  if(this.behavior.max == undefined) { this.behavior.max = 8; }
	  if(dist >= this.behavior.min && dist <= this.behavior.max) {
	    this.pathTo(this.behavior.target.x, this.behavior.target.y);
	  }
	}
	break;

      case 'patrol':
	if(this.behavior.first == undefined || this.behavior.second == undefined) { // Either target invalid?
	  this.behavior = {style: undefined};
	}
	else if (this.behavior.next == undefined) { // Just starting?
	  this.behavior.next = this.behavior.first;
	}
	else if (this.path == undefined || this.path.length == 0) { // Finished the last path?
	  if(this.behavior.next == this.behavior.second) { this.behavior.next = this.behavior.first; }
	  else if(this.behavior.next == this.behavior.first) { this.behavior.next = this.behavior.second; }
	  this.pathTo(this.behavior.next.x, this.behavior.next.y);
	}
	else if(this.path[0].x != this.behavior.next.x || this.path[0].y != this.behavior.next.y) { // Have they moved since we started moving to them?
	  this.pathTo(this.behavior.next.x, this.behavior.next.y);
	}
	break;
    }

    if(this.followPath()) {
      setTimeout(function(thisObj) { thisObj.tick(); }, game.framesPerSecond*4, this);
    }
    else {
      this.stepRandom();
      setTimeout(function(thisObj) { thisObj.tick(); }, 1000, this);
    }
    this.updateListing();
  }
// ----- }


// ----- CLASS characterSheet {
  function characterSheet(imageURL, x, y, width, height) {
    this.imageURL = imageURL;
    this.image = images[this.imageURL];
    this.x = (x == undefined)? 0 : x;
    this.y = (y == undefined)? 0 : y;
    this.width = (width == undefined)? 64 : width;
    this.height = (height == undefined)? 128 : height;

    this.images = new Array();

    this.images['north1'] = {
      x: this.x,
      y: this.y,
      width: this.width/2,
      height: this.height/4,
      xoffset: -8,
      yoffset: -16,
      trackxoffset: 0,
      trackyoffset: 0
    }
    this.images['north2'] = {
      x: this.x,
      y: this.y,
      width: this.width/2,
      height: this.height/4,
      xoffset: -8,
      yoffset: -20,
      trackxoffset: 0,
      trackyoffset: 4
    }
    this.images['north3'] = {
      x: this.x,
      y: this.y + (this.height/4),
      width: this.width/2,
      height: this.height/4,
      xoffset: -8,
      yoffset: -24,
      trackxoffset: 0,
      trackyoffset: 8
    }
    this.images['north4'] = {
      x: this.x,
      y: this.y + (this.height/4),
      width: this.width/2,
      height: this.height/4,
      xoffset: -8,
      yoffset: -28,
      trackxoffset: 0,
      trackyoffset: 12
    }


    this.images['south1'] = {
      x: this.x,
      y: this.y + (this.height/4)*2,
      width: this.width/2,
      height: this.height/4,
      xoffset: -8,
      yoffset: -16,
      trackxoffset: 0,
      trackyoffset: 0
    }
    this.images['south2'] = {
      x: this.x,
      y: this.y + (this.height/4)*2,
      width: this.width/2,
      height: this.height/4,
      xoffset: -8,
      yoffset: -12,
      trackxoffset: 0,
      trackyoffset: -4
    }
    this.images['south3'] = {
      x: this.x,
      y: this.y + (this.height/4)*2 + (this.height/4),
      width: this.width/2,
      height: this.height/4,
      xoffset: -8,
      yoffset: -8,
      trackxoffset: 0,
      trackyoffset: -8
    }
    this.images['south4'] = {
      x: this.x,
      y: this.y + (this.height/4)*2 + (this.height/4),
      width: this.width/2,
      height: this.height/4,
      xoffset: -8,
      yoffset: -4,
      trackxoffset: 0,
      trackyoffset: -12
    }


    this.images['east1'] = {
      x: this.x + (this.width/2),
      y: this.y + (this.height/4)*2,
      width: this.width/2,
      height: this.height/4,
      xoffset: -8,
      yoffset: -16,
      trackxoffset: 0,
      trackyoffset: 0
    }
    this.images['east2'] = {
      x: this.x + (this.width/2),
      y: this.y + (this.height/4)*2,
      width: this.width/2,
      height: this.height/4,
      xoffset: -4,
      yoffset: -16,
      trackxoffset: -4,
      trackyoffset: 0
    }
    this.images['east3'] = {
      x: this.x + (this.width/2),
      y: this.y + (this.height/4)*2 + (this.height/4),
      width: this.width/2,
      height: this.height/4,
      xoffset: 0,
      yoffset: -16,
      trackxoffset: -8,
      trackyoffset: 0
    }
    this.images['east4'] = {
      x: this.x + (this.width/2),
      y: this.y + (this.height/4)*2 + (this.height/4),
      width: this.width/2,
      height: this.height/4,
      xoffset: 4,
      yoffset: -16,
      trackxoffset: -12,
      trackyoffset: 0
    }


    this.images['west1'] = {
      x: this.x + (this.width/2),
      y: this.y,
      width: this.width/2,
      height: this.height/4,
      xoffset: -8,
      yoffset: -16,
      trackxoffset: 0,
      trackyoffset: 0
    }
    this.images['west2'] = {
      x: this.x + (this.width/2),
      y: this.y,
      width: this.width/2,
      height: this.height/4,
      xoffset: -12,
      yoffset: -16,
      trackxoffset: 4,
      trackyoffset: 0
    }
    this.images['west3'] = {
      x: this.x + (this.width/2),
      y: this.y + (this.height/4),
      width: this.width/2,
      height: this.height/4,
      xoffset: -16,
      yoffset: -16,
      trackxoffset: 8,
      trackyoffset: 0
    }
    this.images['west4'] = {
      x: this.x + (this.width/2),
      y: this.y + (this.height/4),
      width: this.width/2,
      height: this.height/4,
      xoffset: -20,
      yoffset: -16,
      trackxoffset: 12,
      trackyoffset: 0
    }
  }
// ----- }