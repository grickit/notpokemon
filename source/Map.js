// ----- CLASS: Map {
  function Map(width,height) {
    var self = this;
    // ----- Properties
    self.width = isset(width)? width : 20;
    self.height = isset(height)? height : 20;
    self.tiles = [];
    self.entities = [];

    // ----- Methods
    self.setDimensions = function(width,height) {
      newtiles = new Array();
      newentities = new Array();
      for(x = 0; x <= width; x++) {
	if(!isset(self.tiles[x])) { newtiles[x] = new Array(); }
	else { newtiles[x] = self.tiles[x]; }
	if(!isset(self.entities[x])) { newentities[x] = new Array(); }
	else { newentities[x] = self.entities[x]; }
	for(y = 0; y <= height; y++) {
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
    self.setDimensions(width,height);
  }
// ----- }