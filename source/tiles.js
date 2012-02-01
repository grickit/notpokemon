// ----- CLASS: tileType {
  function tileType(args) {
    if (args.letter == undefined) { throw "new tileType missing required letter attribute"; }
    else { this.letter = args.letter; }

    if (args.name == undefined) { throw "new tileType missing required name attribute"; }
    else { this.name = args.name; }

    if (args.color == undefined) { throw "new tileType missing required color attribute"; }
    else { this.color = args.color; }

    this.group = (args.group == undefined)? this.letter : args.group;
    this.clipto = (args.clipto == undefined)? [false,false,false,false]: args.clipto;
    this.clipfrom = (args.clipfrom == undefined)? [true,true,true,true]: args.clipfrom;
    this.overlays = args.overlays;
    this.transitions = (args.transitions == undefined)? [new sprite({imageURL: '404'})] : args.transitions;
  }
// ----- }

// ----- CLASS: tileSet {
  function tileSet() {
    this.tiles = new Array();
    this.tilesByLetter = new Array();
    this.tilesByColor = new Array();
  }

  tileSet.prototype.add = function(args) {
    var foo = new tileType(args);
    if(this.tilesByLetter[args.letter] != undefined) { throw "new tileType trying to use letter '"+letter+"', which is already used in this tileSet"; }
    if(this.tilesByColor[args.color] != undefined) { throw "new tileType trying to use color '"+args.color+"', which already used in this tileSet"; }
    this.tiles.push(foo);
    this.tilesByLetter[args.letter] = foo;
    this.tilesByColor[args.color] = foo;
  }
// ----- }

function simpleTileSpriteSet(imageURL,l,b) {
  return [
    new sprite({imageURL: imageURL, x: 0, y: 34, width: 16, height: 16, condition: '(.+),'+b+',(.+),'+b+','+l+',(.+),(.+),(.+),(.+)'}), // Top left corner
    new sprite({imageURL: imageURL, x: 34, y: 34, width: 16, height: 16, condition:     '(.+),'+b+',(.+),(.+),'+l+','+b+',(.+),(.+),(.+)'}), // Top right corner
    new sprite({imageURL: imageURL, x: 0, y: 68, width: 16, height: 16, condition:      '(.+),(.+),(.+),'+b+','+l+',(.+),(.+),'+b+',(.+)'}), // Bottom left corner
    new sprite({imageURL: imageURL, x: 34, y: 68, width: 16, height: 16, condition:     '(.+),(.+),(.+),(.+),'+l+','+b+',(.+),'+b+',(.+)'}), // Bottom right corner

    new sprite({imageURL: imageURL, x: 34, y: 0, width: 16, height: 16, condition: '(.+),'+l+','+b+',(.+),'+l+','+l+',(.+),(.+),(.+)'}), // Top left corner
    new sprite({imageURL: imageURL, x: 17, y: 17, width: 16, height: 16, condition:  '(.+),(.+),(.+),'+l+','+l+',(.+),'+b+','+l+',(.+)'}), // Bottom right corner
    new sprite({imageURL: imageURL, x: 17, y: 0, width: 16, height: 16, condition: ''+b+','+l+',(.+),'+l+','+l+',(.+),(.+),(.+),(.+)'}), // Top right corner
    new sprite({imageURL: imageURL, x: 34, y: 17, width: 16, height: 16, condition:  '(.+),(.+),(.+),(.+),'+l+','+l+',(.+),'+l+','+b+''}), // Bottom left corner

    new sprite({imageURL: imageURL, x: 17, y: 34, width: 16, height: 16, condition: '(.+),'+b+',(.+),(.+),'+l+',(.+),(.+),(.+),(.+)'}), // Top side
    new sprite({imageURL: imageURL, x: 17, y: 68, width: 16, height: 16, condition: '(.+),(.+),(.+),(.+),'+l+',(.+),(.+),'+b+',(.+)'}), // Bottom side
    new sprite({imageURL: imageURL, x: 0, y: 51, width: 16, height: 16, condition:  '(.+),(.+),(.+),'+b+','+l+',(.+),(.+),(.+),(.+)'}), // Left side
    new sprite({imageURL: imageURL, x: 34, y: 51, width: 16, height: 16, condition: '(.+),(.+),(.+),(.+),'+l+','+b+',(.+),(.+),(.+)'}), // Right side
  ];
}

function simpleTileSpriteSetEnd(imageURL,l) {
  return [ new sprite({imageURL: imageURL, x: 17, y: 51, width: 16, height: 16, condition: '(.+),(.+),(.+),(.+),'+l+',(.+),(.+),(.+),(.+)'}) ]; // Center
}