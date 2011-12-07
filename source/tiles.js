// ----- CLASS: tileType {
  function tileType(args) {
    console.log(args);
    if (args.letter != undefined) {
      this.letter = args.letter;
    }
    else {
      throw "new tileType missing required letter attribute";
    }

    if (args.name != undefined) {
      this.name = args.name;
    }
    else {
      throw "new tileType missing required name attribute";
    }

    if (args.color != undefined) {
      this.color = args.color;
    }
    else {
      throw "new tileType missing required color attribute";
    }

    this.imageURL = args.imageURL;
    this.image = images[this.imageURL];
    this.clip = (args.clip == undefined)? [false,false,false,false]: args.clip;
    this.overlays = args.overlays;
    this.transitions = (args.transitions == undefined)? [new tileSprite(this.imageURL, 0, 0, this.image.width, this.image.height)] : args.transitions;
  }
// ----- }


// ----- CLASS: tileSprite {
  function tileSprite(imageURL, x, y, width, height, condition) {
    this.imageURL = imageURL;
    this.image = images[imageURL];
    this.x = (x == undefined)? 0 : x;
    this.y = (y == undefined)? 0 : y;
    this.width = (y == undefined)? 16 : width;
    this.height = (height == undefined)? 16 : height;
    this.condition = (condition == undefined)? '.+,.+,.+,.+,.+,.+,.+,.+,.+' : condition;
  }
// ----- }


// ----- CLASS: tileOverlay {
  function tileOverlay(imageURL, xoffset, yoffset, draw_while_moving) {
    this.xoffset = (xoffset == undefined)? 0 : parseInt(xoffset);
    this.yoffset = (yoffset == undefined)? 0 : parseInt(yoffset);
    this.image = images[imageURL];
    this.draw_while_moving = (draw_while_moving == undefined)? true : draw_while_moving;
  }
// ----- }


// ----- CLASS: tileSet {
  function tileSet() {
    this.tiles = new Array();
    this.tilesByLetter = {};
    this.tilesByColor = {};
  }

  tileSet.prototype.add = function(args) {
    var foo = new tileType(args);
    if(this.tilesByLetter[args.letter] != undefined) { throw "new tileType trying to use letter '"+letter+"', which is already used in this tileSet"; }
    if(this.tilesByColor[args.color] != undefined) { throw "new tileType trying to use color '"+color+"', which already used in this tileSet"; }
    this.tiles.push(foo);
    this.tilesByLetter[args.letter] = foo;
    this.tilesByColor[args.color] = foo;
  }
// ----- }