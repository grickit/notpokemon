//# CLEAN

// ----- CLASS: Map {
  function Map(width,height) {
    // Properties
    this.width = (width == undefined)? 20 : width;
    this.height = (height == undefined)? 20 : height;
    this.tiles = new Array();
    this.entities = new Array();

    // Methods
    this.setDimensions = function(width,height) {
      newtiles = new Array();
      newentities = new Array();
      for(x = 0; x <= width; x++) {
	if(this.tiles[x] == undefined) { newtiles[x] = new Array(); }
	else { newtiles[x] = this.tiles[x]; }
	if(this.entities[x] == undefined) { newentities[x] = new Array(); }
	else { newentities[x] = this.entities[x]; }
	for(y = 0; y <= height; y++) {
	  if(this.tiles[x] == undefined || this.tiles[x][y] == undefined) { newtiles[x][y] = 'g'; }
	  else { newtiles[x][y] = this.tiles[x][y]; }
	  if(this.entities[x] == undefined || this.entities[x][y] == undefined) { newentities[x][y] = new Object(); }
	  else { newentities[x][y] = this.entities[x][y]; }
	}
      }
      this.tiles = newtiles;
      this.entities = newentities;
      this.width = width;
      this.height = height;
    }

    // Initialize
    this.setDimensions(width,height);
  }
// ----- }