// ----- CLASS: entity {
  function entity(x, y, imageURL) {
    this.x = (x == undefined)? 0 : x;
    this.y = (y == undefined)? 0 : y;
    this.imageURL = imageURL;
    this.facing = 1; //North: 0, South: 1, East: 2, West: 3;
  }

  entity.prototype.getImage = function() {
    return images[this.imageURL];
  }

  entity.prototype.visible = function() {
    return ((this.x > game.viewport.x) && (this.y > game.viewport.y) && (this.x < game.viewport.x + game.viewport.tilesX) && (this.y < game.viewport.y + game.viewport.tilesY));
  }
// ----- }


// ----- CLASS: character {
  character.prototype = new entity();
  function character(x, y, imageURL) {
    this.x = (x == undefined)? 0 : x;
    this.y = (y == undefined)? 0 : y;
    this.imageURL = imageURL;
    this.facing = 1; //North: 0, South: 1, East: 2, West: 3;
    this.sprite = sprites[imageURL];
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

  character.prototype.step = function(direction, ignore_facing) {
    if(this.can_move) {
      var newx = this.x + game.directionChanges[direction].x;
      var newy = this.y + game.directionChanges[direction].y;
      if(ignore_facing || direction == game.directionWords[this.facing]) {
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
      else {
	this.facing = game.directionNumbers[direction];
      }
    }
  }

  character.prototype.stepRandom = function() {
    if(randRange(0,1) == 0) {
      this.step(game.directionWords[randRange(0,3)]);
    }
    else {
      this.step(game.directionWords[this.facing])
    }
  }

  character.prototype.stepToPlayer = function() {
    var path = findPath(this.x, this.y, entities['player'].x, entities['player'].y);
    var first = path.shift();
    //console.log(last);
    if(first.direction != undefined) {
      this.step(first.direction);
    }
  }
// ----- }