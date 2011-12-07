// ----- CLASS: tileType {
  function tileType(args) {
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
    this.transitions = (args.transitions == undefined)? [new tileSprite({imageURL: this.imageURL, x: 0, y: 0, width: this.image.width, height: this.image.height})] : args.transitions;
  }
// ----- }


// ----- CLASS: tileSprite {
  function tileSprite(args) {
    this.imageURL = args.imageURL;
    this.image = images[this.imageURL];
    this.x = (args.x == undefined)? 0 : args.x;
    this.y = (args.y == undefined)? 0 : args.y;
    this.width = (args.y == undefined)? 16 : args.width;
    this.height = (args.height == undefined)? 16 : args.height;
    this.condition = (args.condition == undefined)? '.+,.+,.+,.+,.+,.+,.+,.+,.+' : args.condition;
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