// ----- CLASS: entity {
  function entity(x, y, imageURL) {
    this.x = (x == undefined)? 0 : x;
    this.y = (y == undefined)? 0 : y;
    this.imageURL = imageURL;
    this.facing = 1; //North: 0, South: 1, East: 2, West: 3;
  }

  entity.prototype.getImage = function() {
    return images[this.imageURL];
  }

  entity.prototype.visible = function() {
    return ((this.x > game.viewport.x) && (this.y > game.viewport.y) && (this.x < game.viewport.x + game.viewport.tilesX) && (this.y < game.viewport.y + game.viewport.tilesY));
  }

  entity.prototype.tick = function() {  }
// ----- }
