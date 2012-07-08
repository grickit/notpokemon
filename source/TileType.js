// ----- CLASS: TileType {
  function TileType(args,set) {
    var self = this;
    // ----- Properties
    if (!isset(args.code)) { throw "new TileType missing required code attribute"; }
    else { self.code = args.code; }
    self.childof = args.childof;
    self.overlays = args.overlays;

    if(!isset(self.childof) || !isset(set.tiles[self.childof])) {
      self.sprite = isset(args.sprite)? args.sprite : new Sprite({imageURL: 'tiles/redflower', x: 0, y: 0, duration: 700});
      self.clipto = isset(args.clipto)? args.clipto : [false,false,false,false];
      self.clipfrom = isset(args.clipfrom)? args.clipfrom : [true,true,true,true];
      self.overlays = isset(args.overlays)? args.overlays : [];
    }
    else {
      self.sprite = isset(args.sprite)? args.sprite : set.tiles[self.childof].sprite;
      self.clipto = isset(args.clipto)? args.clipto : set.tiles[self.childof].clipto;
      self.clipfrom = isset(args.clipfrom)? args.clipfrom : set.tiles[self.childof].clipfrom;
      self.overlays = isset(args.overlays)? args.overlays : set.tiles[self.childof].overlays;
    }

    // ----- Methods

    // ----- Initialize
  }
// ----- }