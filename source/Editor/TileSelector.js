// ----- CLASS: TileSelector {
  function TileSelector(args,map_override) {
    var self = this;
    Entity.call(this,args,map_override);

    // ----- Properties
    self.tileSet = isset(args.tileSet)? args.tileSet : baseTileSet;
    self.tileArray = [];
    self.index = 0;

    // ----- Methods
    self.on_render = function() {
      self.current_image = self.tileSet.tiles[self.tileArray[self.index]].sprite;
    }

    self.build_tile_array = function() {
      for(var key in self.tileSet.tiles) {
        self.tileArray.push(key);
      }
    }

    self.scroll_up = function() {
      if(self.index < (Object.keys(self.tileSet.tiles).length - 1)) {
        self.index++;
      }
    }

    self.scroll_down = function() {
      if(self.index > 0) {
        self.index--;
      }
    }

    // ----- Initialize
    self.build_tile_array();

  }
// ----- }