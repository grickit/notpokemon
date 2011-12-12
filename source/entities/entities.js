// ----- CLASS: entity {
  function entity(args) {
    this.x = (args.x == undefined)? 0 : args.x;
    this.y = (args.y == undefined)? 0 : args.y;
    this.facing = (args.facing == undefined)? 1 : args.facing; //North: 0, South: 1, East: 2, West: 3;

    if(args.name == undefined) { throw "new entity missing required name attribute"; }
    else { this.name = args.name; entities[this.name] = this; }

    if(args.imageURL == undefined) { throw "new entity missing required imageURL attribute"; }
    else { this.imageURL = args.imageURL; }

    if(sprites[args.imageURL] == undefined) { this.sprite = images[imageURL]; }
    else { this.sprite = sprites[args.imageURL]; }


    this.getImage = function() {
      if(this.is_moving) {
	return this.sprite.images[game.directionWords[this.facing]+'2'];
      }
      else {
	return this.sprite.images[game.directionWords[this.facing]];
      }
    }

    this.visible = function() {
      return ((this.x > game.viewport.x) && (this.y > game.viewport.y) && (this.x < game.viewport.x + game.viewport.tilesX) && (this.y < game.viewport.y + game.viewport.tilesY));
    }
  }
// ----- }
