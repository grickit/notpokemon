//# CLEAN

// ----- CLASS: TileType {
  function TileType(args,set) {
    if (args.code == undefined) { throw "new tileType missing required code attribute"; }
    else { this.letter = args.letter; }
    this.childof = args.childof;
    this.overlays = args.overlays;

    if(this.childof == undefined || set.tiles[this.childof] == undefined) {
      this.sprite = (args.sprite == undefined)? new Sprite({imageURL: 'tiles/redflower', x: 0, y: 0, duration: 700}) : args.sprite;
      this.clipto = (args.clipto == undefined)? [false,false,false,false] : args.clipto;
      this.clipfrom = (args.clipfrom == undefined)? [true,true,true,true] : args.clipfrom;
    }
    else {
      this.sprite = (args.sprite == undefined)? set[this.childof].sprite : args.sprite;
      this.clipto = (args.clipto == undefined)? set[this.childof].clipto : args.clipto;
      this.clipfrom = (args.clipfrom == undefined)? set[this.childof].clipto : args.clipfrom;
    }
  }
// ----- }