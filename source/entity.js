// ----- CLASS: entity {
  function entity(args) {
    this.x = (args.x == undefined)? 0 : args.x;
    this.y = (args.y == undefined)? 0 : args.y;
    this.facing = (args.facing == undefined)? 1 : args.facing; //North: 0, South: 1, East: 2, West: 3;

    if(args.name == undefined) { throw "new entity missing required name attribute"; }
    else { this.name = args.name; game.entities[this.name] = this; }

    this.sprites = (args.sprites == undefined)? [new sprite({imageURL: 'characters/sign', yoffset: -1})] : args.sprites;

    this.setPosition = function(x,y) {
      console.log(x+','+y);
      delete game.currentMap.entities[this.x][this.y][this.name];
      this.x = x;
      this.y = y;
      game.currentMap.entities[this.x][this.y][this.name] = this;
    }
    this.setPosition(this.x,this.y);
    this.currentImage = this.sprites['south'];
    setInterval(function(thisObj){ thisObj.currentImage.restart(); thisObj.setPosition(thisObj.x,thisObj.y+1); },1000,this);
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
	xoffset: -7,
	yoffset: -20,
	trackxoffset: 0,
	trackyoffset: 0,
	duration: 250
      }),
      new sprite({
	imageURL: imageURL,
	x: x,
	y: y,
	width: width/2,
	height: height/4,
	xoffset: -7,
	yoffset: -20,
	trackxoffset: 0,
	trackyoffset: 4,
	duration: 250
      }),
      new sprite({
	imageURL: imageURL,
	x: x,
	y: y + (height/4),
	width: width/2,
	height: height/4,
	xoffset: -7,
	yoffset: -24,
	trackxoffset: 0,
	trackyoffset: 8,
	duration: 250
      }),
      new sprite({
	imageURL: imageURL,
	x: x,
	y: y + (height/4),
	width: width/2,
	height: height/4,
	xoffset: -7,
	yoffset: -28,
	trackxoffset: 0,
	trackyoffset: 12,
	duration: 250
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
	duration: 250
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
	duration: 250
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
	duration: 250
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
	duration: 250
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
	duration: 250
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
	duration: 250
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
	duration: 250
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
	duration: 250
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
	duration: 250
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
	duration: 250
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
	duration: 250
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
	duration: 250
      }),
    ]);
    return {'north': north_anim, 'south': south_anim, 'east': east_anim, 'west': west_anim};
  }
// ----- }
