// ----- CLASS: character {
  function character(args) {
    this.prototype = new entity(args);
    entity.call(this, args);

    this.sprite = sprites[args.imageURL];
    this.is_moving = false;
    this.can_move = true;
    this.speed = 11;
    if(this.sprite == undefined) {
      this.image = images[imageURL];
      this.sprite = this.image;
    }
    else {
      this.image = this.sprite.image;
    }

    mapone.entities[this.y][this.x] = this;
    this.tick();
  }

  character.prototype.step = function(direction) {
    if(this.can_move) {
      var newx = this.x + game.directionChanges[direction].x;
      var newy = this.y + game.directionChanges[direction].y;
      this.facing = game.directionNumbers[direction];
      if(mapone.entities[newy][newx] == undefined && baseTileSet.tilesByColor[mapone.tiles[newy][newx]].clip[game.directionNumbers[direction]]) {
	mapone.entities[this.y][this.x] = undefined;
	this.x = newx;
	this.y = newy;
	mapone.entities[this.y][this.x] = this;
	this.is_moving = true;
	this.can_move = false;
	setTimeout(function(thisObj) { thisObj.is_moving = false; },game.framesPerSecond*(20/this.speed),this);
	setTimeout(function(thisObj) { thisObj.can_move = true; },game.framesPerSecond*(20/this.speed)*2,this);
      }
    }
  }

  character.prototype.stepRandom = function() {
    if(randRange(0,2) == 0) {
      this.facing = randRange(0,3);
    }
    else {
      this.step(game.directionWords[this.facing])
    }
  }

  character.prototype.pathTo = function(x, y) {
    if(this.path == undefined || this.path.length == 0 || (this.path[0].x != x && this.path[0].y != y)) {
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
      this.context.drawImage(this.image, sprite.x, sprite.y, sprite.width, sprite.height, 0, 0, sprite.width, sprite.height);
    }
  }

  character.prototype.tick = function() {
    if(this != entities['player']) {
      var dist = manhattanDistance(this.x, this.y, entities['player'].x, entities['player'].y);
      if(dist > 1 && dist < 10) {
	this.pathTo(entities['player'].x, entities['player'].y);
      }
    }
    if(this.followPath()) {
      setTimeout(function(thisObj) { thisObj.tick(); }, game.framesPerSecond*(20/this.speed)*3, this);
    }
    else if(this != entities['player']) {
      this.stepRandom();
      setTimeout(function(thisObj) { thisObj.tick(); }, 1000, this);
    }
    else {
      setTimeout(function(thisObj) { thisObj.tick(); }, game.framesPerSecond*(20/this.speed)*3, this);
    }
    this.updateIcon();
  }
// ----- }
