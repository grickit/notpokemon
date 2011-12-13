// ----- CLASS: character {
  function character(args) {
    this.prototype = new entity(args);
    entity.call(this, args);

    this.is_moving = false;
    this.can_move = true;
    this.speed = 11;
    this.behavior = (args.behavior == undefined)? {style: undefined} : args.behavior;

    this.tick();
  }

  character.prototype.step = function(direction) {
    if(this.can_move) {
      var newx = this.x + game.directionChanges[direction].x;
      var newy = this.y + game.directionChanges[direction].y;
      this.facing = game.directionNumbers[direction];
      if(baseTileSet.tilesByColor[mapone.tiles[newy][newx]].clip[game.directionNumbers[direction]]) {
	this.setPosition(newx,newy);
	this.is_moving = true;
	this.can_move = false;
	setTimeout(function(thisObj) { thisObj.is_moving = false; },game.framesPerSecond*(20/this.speed),this);
	setTimeout(function(thisObj) { thisObj.can_move = true; },game.framesPerSecond*(20/this.speed)*2,this);
      }
    }
  }

  character.prototype.stepRandom = function() {
    if(randRange(0,2) == 0) {
      this.step(game.directionWords[randRange(0,3)]);
    }
    else {
      this.facing = randRange(0,3);
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

  character.prototype.updateIcon = function() {
    if(document.getElementById('entity'+this.name+'icon')) {
      this.canvas = document.getElementById('entity'+this.name+'icon');
      this.context = this.canvas.getContext('2d');
      this.context.width = 32;
      this.context.height = 32;
      clearCanvas(this.context,'#CFCFCF');
      var sprite = this.sprite.images['south'];
      this.context.drawImage(this.sprite.image, sprite.x, sprite.y, sprite.width, sprite.height, 0, 0, sprite.width, sprite.height);
      document.getElementById('entity'+this.name+'coords').innerHTML = this.x+','+this.y;
    }
  }

  character.prototype.tick = function() {
    if (game.paused) { setTimeout(function(thisObj) { thisObj.tick(); }, 1000, this); return; }
    switch(this.behavior.style) {
      case 'follow':
	if(this.behavior.target == undefined || entities[this.behavior.target] == undefined) { // Target invalid?
	  this.behavior = {style: undefined};
	}
	else {
	  var dist = manhattanDistance(this.x, this.y, entities[this.behavior.target].x, entities[this.behavior.target].y);
	  if(this.behavior.min == undefined) { this.behavior.min = 0; }
	  if(this.behavior.max == undefined) { this.behavior.max = 9999; }
	  if(dist >= this.behavior.min && dist <= this.behavior.max) {
	    this.pathTo(entities[this.behavior.target].x, entities[this.behavior.target].y);
	  }
	}
	break;

      case 'patrol':
	if(entities[this.behavior.first] == undefined || entities[this.behavior.second] == undefined) { // Either target invalid?
	  this.behavior = {style: undefined};
	}
	else if (this.behavior.next == undefined) { // Just starting?
	  this.behavior.next = this.behavior.first;
	}
	else if (this.path == undefined || this.path.length == 0) { // Finished the last path?
	  if(this.behavior.next == this.behavior.second) { this.behavior.next = this.behavior.first; }
	  else if(this.behavior.next == this.behavior.first) { this.behavior.next = this.behavior.second; }
	  this.pathTo(entities[this.behavior.next].x, entities[this.behavior.next].y);
	}
	else if(this.path[0].x != entities[this.behavior.next].x || this.path[0].y != entities[this.behavior.next].y) { // Have they moved since we started moving to them?
	  this.pathTo(entities[this.behavior.next].x, entities[this.behavior.next].y);
	}
	break;
    }

    if(this.followPath()) {
      setTimeout(function(thisObj) { thisObj.tick(); }, game.framesPerSecond*(20/this.speed)*3, this);
    }
    else {
      this.stepRandom();
      setTimeout(function(thisObj) { thisObj.tick(); }, 1000, this);
    }
    this.updateIcon();
  }
// ----- }
