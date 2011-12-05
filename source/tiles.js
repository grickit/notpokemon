// ----- CLASS: tileType {
  function tileType(letter, name, color, imageURL, clip, overlays, transitions) {
    if (letter != undefined) {
      this.letter = letter;
    }
    else {
      throw "new tileType missing required letter attribute";
    }

    if (name != undefined) {
      this.name = name;
    }
    else {
      throw "new tileType missing required name attribute";
    }

    if (color != undefined) {
      this.color = color;
    }
    else {
      throw "new tileType missing required color attribute";
    }

    this.imageURL = imageURL;
    this.image = images[this.imageURL];
    this.clip = clip != undefined ? clip : [false,false,false,false];
    this.overlays = overlays;
    this.transitions = (transitions == undefined)? [new tileSprite(this.imageURL, 0, 0, this.image.width, this.image.height)] : transitions;
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

  tileSet.prototype.add = function(letter, name, color, imageURL, overlays, clip, transitions) {
    var foo = new tileType(letter, name, color, imageURL, overlays, clip, transitions);
    if(this.tilesByLetter[letter] != undefined) { throw "new tileType trying to use letter '"+letter+"', which is already used in this tileSet"; }
    if(this.tilesByColor[color] != undefined) { throw "new tileType trying to use color '"+color+"', which already used in this tileSet"; }
    this.tiles.push(foo);
    this.tilesByLetter[letter] = foo;
    this.tilesByColor[color] = foo;
  }
// ----- }