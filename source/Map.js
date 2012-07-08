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

    self.populateOverlays = function() {
      for(var x = 0; x <= self.width; x++) {
	for(var y = 0; y <= self.height; y++) {
	  for(var entity in game.getEntities(x,y)) {
	    entity = game.getEntities(x,y)[entity];
	    if(entity instanceof EntityOverlay) { entity.purge(); }
	  }
	  for(var overlay in game.getTile(x,y).overlays) {
	    overlay = game.getTile(x,y).overlays[overlay];
	    overlay.x = x;
	    overlay.y = y;
	    var tempEnt = new EntityOverlay(overlay,self);
	  }
	}
      }
    }

    self.recalculateOverlays = function(x,y) {
      for(var entity in game.getEntities(x,y)) {
	entity = game.getEntities(x,y)[entity];
	if(entity instanceof EntityOverlay) { entity.purge(); }
      }
      for(var overlay in game.getTile(x,y).overlays) {
	overlay = game.getTile(x,y).overlays[overlay];
	overlay.x = x;
	overlay.y = y;
	var tempEnt = new EntityOverlay(overlay,self);
      }
      console.log(game.entities);
    }

    // ----- Initialize
    self.setDimensions(width,height);
  }
// ----- }