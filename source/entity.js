// ----- CLASS: entity {
  function entity(args,map_override) {
    this.x = (args.x == undefined)? 0 : args.x;
    this.y = (args.y == undefined)? 0 : args.y;
    this.z = (args.z == undefined)? 100 : args.z;
    this.ticks = (args.ticks == undefined)? true : args.ticks;
    this.facing = (args.facing == undefined)? 1 : args.facing; //North: 0, South: 1, East: 2, West: 3;
    this.name = (args.name == undefined)? uniqueEntityID() : args.name;
    this.map = (map_override == undefined)? game.currentMap : map_override;
    game.entities[this.name] = this;
    if(this.ticks == true) {
      game.ticking_entities[this.name] = this;
    }

    this.sprites = (args.sprites == undefined)? [new sprite({imageURL: 'characters/sign', yoffset: -1})] : args.sprites;

    this.setPosition = function(x,y) {
      delete this.map.entities[this.x][this.y][this.name];
      for(name in this.map.entities[this.x][this.y]) {
	this.map.entities[this.x][this.y][name].on_moved_from(this);
      }
      this.x = x;
      this.y = y;
      for(name in this.map.entities[this.x][this.y]) {
	this.map.entities[this.x][this.y][name].on_moved_to(this);
      }
      this.map.entities[this.x][this.y][this.name] = this;
    }

    this.getImage = function() {
      if(this.currentImage instanceof animation) {
	return this.currentImage.current;
      }
      else if(this.currentImage instanceof sprite) {
	return this.currentImage;
      }
      else { throw "Current image of entity \""+this.name+"\" is of unknown type."; }
    }

    this.purge = function() {
      delete this.map.entities[this.x][this.y][this.name];
      delete game.entities[this.name];
      delete game.ticking_entities[this.name];
      delete this;
    }

    this.step = function(direction) {
      var newx = this.x + game.directionChanges[direction].x;
      var newy = this.y + game.directionChanges[direction].y;
      this.facing = game.directionNumbers[direction];
      if(game.getTile(this.x, this.y).clipfrom[game.directionNumbers[direction]] && game.getTile(newx,newy).clipto[game.directionNumbers[direction]]) {
	this.currentImage = this.sprites[game.directionNumbers[direction]];
	this.currentImage.restart();
	this.z = 120;
	setTimeout(function(thisObj){ thisObj.setPosition(newx,newy); thisObj.currentImage.reset(); thisObj.z = 100; },400,this);
      }
    }

    this.on_render = (args.on_render == undefined)? function(){} : args.on_render;
    this.on_tick = (args.on_tick == undefined)? function(){} : args.on_tick;
    this.on_moved_to = (args.on_moved_to == undefined)? function(){} : args.on_moved_to;
    this.on_moved_from = (args.on_moved_from == undefined)? function(){} : args.on_moved_from;

    this.setPosition(this.x,this.y);
    this.currentImage = this.sprites[0];
  }
// ----- }

function characterSheet(imageURL, x, y, width, height) {
  imageURL = imageURL;
  x = (x == undefined)? 0 : x;
  y = (y == undefined)? 0 : y;
  width = (width == undefined)? 64 : width;
  height = (height == undefined)? 128 : height;

  north_anim = new animation([
    new sprite({
      imageURL: imageURL,
      x: x,
      y: y,
      width: width/2,
      height: height/4,
      xoffset: -8,
      yoffset: -16,
      trackxoffset: 0,
      trackyoffset: 0,
      duration: 100
    }),
    new sprite({
      imageURL: imageURL,
      x: x,
      y: y + (height/4),
      width: width/2,
      height: height/4,
      xoffset: -8,
      yoffset: -20,
      trackxoffset: 0,
      trackyoffset: 4,
      duration: 100
    }),
    new sprite({
      imageURL: imageURL,
      x: x,
      y: y,
      width: width/2,
      height: height/4,
      xoffset: -8,
      yoffset: -24,
      trackxoffset: 0,
      trackyoffset: 8,
      duration: 100
    }),
    new sprite({
      imageURL: imageURL,
      x: x,
      y: y + (height/4),
      width: width/2,
      height: height/4,
      xoffset: -8,
      yoffset: -28,
      trackxoffset: 0,
      trackyoffset: 12,
      duration: 100
    }),
  ]);

  south_anim = new animation([
    new sprite({
      imageURL: imageURL,
      x: x,
      y: y + (height/4)*2,
      width: width/2,
      height: height/4,
      xoffset: -8,
      yoffset: -16,
      trackxoffset: 0,
      trackyoffset: 0,
      duration: 100
    }),
    new sprite({
      imageURL: imageURL,
      x: x,
      y: y + (height/4)*2 + (height/4),
      width: width/2,
      height: height/4,
      xoffset: -8,
      yoffset: -12,
      trackxoffset: 0,
      trackyoffset: -4,
      duration: 100
    }),
    new sprite({
      imageURL: imageURL,
      x: x,
      y: y + (height/4)*2,
      width: width/2,
      height: height/4,
      xoffset: -8,
      yoffset: -8,
      trackxoffset: 0,
      trackyoffset: -8,
      duration: 100
    }),
    new sprite({
      imageURL: imageURL,
      x: x,
      y: y + (height/4)*2 + (height/4),
      width: width/2,
      height: height/4,
      xoffset: -8,
      yoffset: -4,
      trackxoffset: 0,
      trackyoffset: -12,
      duration: 100
    }),
  ]);

  east_anim = new animation([
    new sprite({
      imageURL: imageURL,
      x: x + (width/2),
      y: y + (height/4)*2,
      width: width/2,
      height: height/4,
      xoffset: -8,
      yoffset: -16,
      trackxoffset: 0,
      trackyoffset: 0,
      duration: 100
    }),
    new sprite({
      imageURL: imageURL,
      x: x + (width/2),
      y: y + (height/4)*2 + (height/4),
      width: width/2,
      height: height/4,
      xoffset: -4,
      yoffset: -16,
      trackxoffset: -4,
      trackyoffset: 0,
      duration: 100
    }),
    new sprite({
      imageURL: imageURL,
      x: x + (width/2),
      y: y + (height/4)*2,
      width: width/2,
      height: height/4,
      xoffset: 4,
      yoffset: -16,
      trackxoffset: -12,
      trackyoffset: 0,
      duration: 100
    }),
    new sprite({
      imageURL: imageURL,
      x: x + (width/2),
      y: y + (height/4)*2 + (height/4),
      width: width/2,
      height: height/4,
      xoffset: 4,
      yoffset: -16,
      trackxoffset: -12,
      trackyoffset: 0,
      duration: 100
    }),
  ]);

  west_anim = new animation([
    new sprite({
      imageURL: imageURL,
      x: x + (width/2),
      y: y,
      width: width/2,
      height: height/4,
      xoffset: -8,
      yoffset: -16,
      trackxoffset: 0,
      trackyoffset: 0,
      duration: 100
    }),
    new sprite({
      imageURL: imageURL,
      x: x + (width/2),
      y: y + (height/4),
      width: width/2,
      height: height/4,
      xoffset: -12,
      yoffset: -16,
      trackxoffset: 4,
      trackyoffset: 0,
      duration: 100
    }),
    new sprite({
      imageURL: imageURL,
      x: x + (width/2),
      y: y,
      width: width/2,
      height: height/4,
      xoffset: -16,
      yoffset: -16,
      trackxoffset: 8,
      trackyoffset: 0,
      duration: 100
    }),
    new sprite({
      imageURL: imageURL,
      x: x + (width/2),
      y: y + (height/4),
      width: width/2,
      height: height/4,
      xoffset: -20,
      yoffset: -16,
      trackxoffset: 12,
      trackyoffset: 0,
      duration: 100
    }),
  ]);
  return [north_anim,south_anim,east_anim,west_anim];
}