//# CLEAN

// ----- CLASS: TileType {
  function TileType(args) {
    if (args.code == undefined) { throw "new tileType missing required code attribute"; }
    else { this.letter = args.letter; }

    this.group = (args.group == undefined)? this.letter : args.group;
    this.clipto = (args.clipto == undefined)? [false,false,false,false] : args.clipto;
    this.clipfrom = (args.clipfrom == undefined)? [true,true,true,true] : args.clipfrom;
    this.overlays = args.overlays;
  }
// ----- }