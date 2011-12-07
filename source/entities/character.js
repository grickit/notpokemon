// ----- CLASS: character {
  function character(args) {
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
  }

  character.prototype.getImage = function() {
    if(this.sprite == undefined) {
      return this.image;
    }
    else {
      if(this.is_moving) {
	return this.sprite.images[game.directionWords[this.facing]+'2'];
      }
      else {
	return this.sprite.images[game.directionWords[this.facing]];
      }
    }
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

  character.prototype.tick = function() {
    var dist = manhattanDistance(this.x, this.y, entities['player'].x, entities['player'].y);
    if(dist > 1 && dist < 10) {
      this.path = findPath(this.x, this.y, entities['player'].x, entities['player'].y);
    }

    if(this.path != undefined && this.path.length > 0) {
      this.step(this.path.pop().direction);
      setTimeout(function(thisObj) { thisObj.tick(); }, game.framesPerSecond*(20/this.speed)*3, this);
    }
    else if(this != entities['player']) {
      this.stepRandom();
      setTimeout(function(thisObj) { thisObj.tick(); }, 1000, this);
    }
  }
// ----- }