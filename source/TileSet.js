//# CLEAN

// ----- CLASS: TileSet {
  function TileSet() {
    // Properties
    this.tiles = new Object();
    this.uid = 0;

    // Methods
    this.getUniqueTileID = function() {
      return this.uid++;
    }

    this.add = function(args) {
      if(args == undefined) { throw "Tried to create a new TileType without any arguments."; }
      if(args.code == undefined) { args.code = this.getUniqueTileID(); }
      if(this.tiles[args.code] != undefined) { throw "New TileType trying to use code '"+code+"', which is already used in this TileSet"; }
      this.tiles[args.code] = new TileType(args);
    }

    // Initialize
  }
// ----- }