// ----- CLASS: Map {
  function Map(args) {
    var self = this;
    // ----- Properties
    self.name = isset(args.name)? args.name : 'map_x';
    self.width = isset(args.width)? args.width : 20;
    self.height = isset(args.height)? args.height : 20;
    self.tiles = [];
    self.entities = [];

    // ----- Methods
    self.setDimensions = function(width,height) {
      var newtiles = new Array();
      var newentities = new Array();
      for(var x = 0; x <= width; x++) {
        if(!isset(self.tiles[x])) { newtiles[x] = new Array(); }
        else { newtiles[x] = self.tiles[x]; }
        if(!isset(self.entities[x])) { newentities[x] = new Array(); }
        else { newentities[x] = self.entities[x]; }
        for(var y = 0; y <= height; y++) {
          if(!isset(self.tiles[x]) || !isset(self.tiles[x][y])) { newtiles[x][y] = 'g'; }
          else { newtiles[x][y] = self.tiles[x][y]; }
          if(!isset(self.entities[x]) || !isset(self.entities[x][y])) { newentities[x][y] = {}; }
          else { newentities[x][y] = self.entities[x][y]; }
        }
      }
      self.tiles = newtiles;
      self.entities = newentities;
      self.width = width;
      self.height = height;
    }

    // ----- Initialize
    self.setDimensions(self.width,self.height);
  }
// ----- }