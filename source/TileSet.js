//# CLEAN

// ----- CLASS: TileSet {
  function TileSet() {
    // Properties
    this.tiles = new Object();
    this.uid = 0;

    // Methods
    this.getUniqueTileID = function() {
      this.uid++;
      return this.uid;
    }

    this.add = function() {
      var foo = new TileType(args);
      if(this.tiles[args.code] != undefined) { throw "New TileType trying to use code '"+code+"', which is already used in this TileSet"; }
      this.tiles[args.code] = foo;
    }

    // Initialize
  }
// ----- }