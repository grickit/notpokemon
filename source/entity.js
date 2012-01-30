// ----- CLASS: entity {
  function entity(args) {
    this.x = (args.x == undefined)? 0 : args.x;
    this.y = (args.y == undefined)? 0 : args.y;
    this.z = (args.z == undefined)? 100 : args.z;
    this.unlisted = (args.unlisted == undefined)? false : args.unlisted;
    this.facing = (args.facing == undefined)? 1 : args.facing; //North: 0, South: 1, East: 2, West: 3;
    this.name = (args.name == undefined)? uniqueEntityID() : args.name;
    if(this.unlisted != true) {
      game.entities[this.name] = this;
    }

    this.sprites = (args.sprites == undefined)? [new sprite({imageURL: 'characters/sign', yoffset: -1})] : args.sprites;

    this.setPosition = function(x,y) {
      delete game.currentMap.entities[this.x][this.y][this.name];
      this.x = x;
      this.y = y;
      game.currentMap.entities[this.x][this.y][this.name] = this;
    }

    this.step = function(direction) {
      var newx = this.x + game.directionChanges[direction].x;
      var newy = this.y + game.directionChanges[direction].y;
      this.facing = game.directionNumbers[direction];
      if(game.getTile(this.x, this.y).clipfrom[game.directionNumbers[direction]] && game.getTile(newx,newy).clipto[game.directionNumbers[direction]]) {
	this.currentImage = this.sprites[direction];
	this.currentImage.restart();
	setTimeout(function(thisObj){ thisObj.setPosition(newx,newy); thisObj.currentImage.reset(); },800,this);
      }
    }

    this.setPosition(this.x,this.y);
    this.currentImage = this.sprites['south'];
    setInterval(function(thisObj){ thisObj.step(game.directionWords[randRange(0,3)]); },1000,this);
  }
// ----- }

// ----- CLASS characterSheet {
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
	duration: 200
      }),
      new sprite({
	imageURL: imageURL,
	x: x,
	y: y,
	width: width/2,
	height: height/4,
	xoffset: -8,
	yoffset: -20,
	trackxoffset: 0,
	trackyoffset: 4,
	duration: 200
      }),
      new sprite({
	imageURL: imageURL,
	x: x,
	y: y + (height/4),
	width: width/2,
	height: height/4,
	xoffset: -8,
	yoffset: -24,
	trackxoffset: 0,
	trackyoffset: 8,
	duration: 200
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
	duration: 200
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
	duration: 200
      }),
      new sprite({
	imageURL: imageURL,
	x: x,
	y: y + (height/4)*2,
	width: width/2,
	height: height/4,
	xoffset: -8,
	yoffset: -12,
	trackxoffset: 0,
	trackyoffset: -4,
	duration: 200
      }),
      new sprite({
	imageURL: imageURL,
	x: x,
	y: y + (height/4)*2 + (height/4),
	width: width/2,
	height: height/4,
	xoffset: -8,
	yoffset: -8,
	trackxoffset: 0,
	trackyoffset: -8,
	duration: 200
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
	duration: 200
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
	duration: 200
      }),
      new sprite({
	imageURL: imageURL,
	x: x + (width/2),
	y: y + (height/4)*2,
	width: width/2,
	height: height/4,
	xoffset: -4,
	yoffset: -16,
	trackxoffset: -4,
	trackyoffset: 0,
	duration: 200
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
	duration: 200
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
	duration: 200
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
	duration: 200
      }),
      new sprite({
	imageURL: imageURL,
	x: x + (width/2),
	y: y,
	width: width/2,
	height: height/4,
	xoffset: -12,
	yoffset: -16,
	trackxoffset: 4,
	trackyoffset: 0,
	duration: 200
      }),
      new sprite({
	imageURL: imageURL,
	x: x + (width/2),
	y: y + (height/4),
	width: width/2,
	height: height/4,
	xoffset: -16,
	yoffset: -16,
	trackxoffset: 8,
	trackyoffset: 0,
	duration: 200
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
	duration: 200
      }),
    ]);
    return {'north': north_anim, 'south': south_anim, 'east': east_anim, 'west': west_anim};
  }
// ----- }
