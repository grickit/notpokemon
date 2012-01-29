// ----- CLASS: entity {
  function entity(args) {
    this.x = (args.x == undefined)? 0 : args.x;
    this.y = (args.y == undefined)? 0 : args.y;
    this.facing = (args.facing == undefined)? 1 : args.facing; //North: 0, South: 1, East: 2, West: 3;

    if(args.name == undefined) { throw "new entity missing required name attribute"; }
    else { this.name = args.name; game.entities[this.name] = this; }

    this.sprites = (args.sprites == undefined)? [new sprite({imageURL: 'characters/sign', yoffset: -1})] : args.sprites;

    this.setPosition = function(x,y) {
      delete game.currentMap.entities[this.x][this.y][this.name];
      this.x = x;
      this.y = y;
      game.currentMap.entities[this.x][this.y][this.name] = this;
    }
    this.setPosition(this.x,this.y);
    this.currentImage = this.sprites[0];
  }
// ----- }
