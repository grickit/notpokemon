// ----- CLASS: entity {
  function entity(args) {
    this.x = (args.x == undefined)? 0 : args.x;
    this.y = (args.y == undefined)? 0 : args.y;
    this.facing = (args.facing == undefined)? 1 : args.facing; //North: 0, South: 1, East: 2, West: 3;
    this.aggro = (args.aggro == undefined)? 'neutral' : args.aggro;
    this.movement_frame = 1;

    if(args.name == undefined) { throw "new entity missing required name attribute"; }
    else { this.name = args.name; entities[this.name] = this; }

    if(args.imageURL == undefined) { throw "new entity missing required imageURL attribute"; }
    else { this.imageURL = args.imageURL; }

    if(sprites[args.imageURL] == undefined) { this.sprite = images[args.imageURL]; }
    else { this.sprite = sprites[args.imageURL]; }


    this.getImage = function() {
      if(this.sprite instanceof characterSheet) {
	return this.sprite.images[game.directionWords[this.facing]+this.movement_frame];
      }
      else {
	return this.sprite;
      }
    }

    this.visible = function() {
      return ((this.x > game.viewport.x) && (this.y > game.viewport.y) && (this.x < game.viewport.x + game.viewport.tilesX) && (this.y < game.viewport.y + game.viewport.tilesY));
    }

    this.setPosition = function(x,y) {
      delete mapone.entities[this.y][this.x][this.name];
      this.x = x;
      this.y = y;
      mapone.entities[this.y][this.x][this.name] = this;
    }

    mapone.entities[this.y][this.x][this.name] = this;
  }
// ----- }
