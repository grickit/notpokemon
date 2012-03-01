//# CLEAN

// ----- CLASS: Map {
  function Map(width,height) {
    // Properties
    this.width = (width == undefined)? 20 : width;
    this.height = (height == undefined)? 20 : height;
    this.tiles = new Array();
    this.entities = new Array();

    // Methods

    // Initialize
    this.tiles = [
      ['r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r'],
      ['r', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'r'],
      ['r', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'r'],
      ['r', 'g', 'g', 'g', 'gfr', 'g', 'g', 'g', 'g', 'g', 'g', 'r'],
      ['r', 'g', 'g', 'g', 'g', 'g', 'g', 'r', 'g', 'g', 'g', 'r'],
      ['r', 'g', 'g', 'g', 'g', 'g', 'g', 'r', 'r', 'g', 'g', 'r'],
      ['r', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'r', 'g', 'g', 'r'],
      ['r', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'r', 'g', 'g', 'r'],
      ['r', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'r', 'g', 'g', 'r'],
      ['r', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'r'],
      ['r', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'r'],
      ['r', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'r'],
      ['r', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'r'],
      ['r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r']
    ];

    for(x = 0; x < this.tiles.length; x++) {
      this.entities.push(new Array());
      for(y = 0; y < this.tiles[x].length; y++) {
	this.entities[x].push(new Object());
      }
    }
  }
// ----- }