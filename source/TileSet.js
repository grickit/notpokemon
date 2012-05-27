// ----- CLASS: TileSet {
  function TileSet() {
    var self = this;
    // ----- Properties
    self.tiles = {};

    // ----- Methods
    this.add = function(args) {
      if(!isset(args)) { throw "Tried to create a new TileType without any arguments."; }
      if(!isset(args.code)) { throw "new tileType missing required code attribute"; }
      if(isset(self.tiles[args.code])) { throw "New TileType trying to use code '"+code+"', which is already used in this TileSet"; }
      self.tiles[args.code] = new TileType(args,self);
    }

    // ----- Initialize
  }
// ----- }