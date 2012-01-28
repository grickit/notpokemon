function map(imageURL) {
  this.imageURL = imageURL;
  this.tiles = new Array();
  this.entities = new Array();
  this.events = new Array();
  images.load(imageURL,this,'init');
}

map.prototype.init = function() {
  this.width = images.get(this.imageURL).width;
  this.height = images.get(this.imageURL).height;

  var tempcanvas = document.createElement('canvas');
  tempcanvas.width = this.width;
  tempcanvas.height = this.height;
  var tempcontext = tempcanvas.getContext('2d');
  tempcontext.drawImage(images.get(this.imageURL), 0, 0);

  this.canvas = document.createElement('canvas');
  this.canvas.width = this.width*game.tileSize;
  this.canvas.height = this.height*game.tileSize;
  this.context = this.canvas.getContext('2d');

  for(var x = 0; x < this.width; x++) {
    var ytiles = new Array();
    var yentities = new Array();
    var yevents = new Array();
    for(var y = 0; y < this.height; y++) {
      var tempimagedata = tempcontext.getImageData(x,y,1,1);
      var color = (''+tempimagedata.data[0]+','+tempimagedata.data[1]+','+tempimagedata.data[2]+','+tempimagedata.data[3]);
      ytiles[y] = color;
      yentities[y] = new Array();
      yevents[y] = new Array();
    }
    this.tiles[x] = ytiles;
    this.entities[x] = yentities;
    this.events[x] = yevents;
  }

  for(var x = 0; x < this.width; x++) {
    for(var y = 0; y < this.height; y++) {
      var tile = baseTileSet.tilesByColor[this.tiles[x][y]];
      if(tile instanceof tileType) {
	for(transition in tile.transitions) {
	  var sprite = tile.transitions[transition];
	  if(tileConditionTest(this.tiles,sprite.condition, x, y)) {
	    this.context.drawImage(images.get(sprite.imageURL), sprite.x, sprite.y, sprite.width, sprite.height, x*16+sprite.xoffset, y*16+sprite.yoffset, 16, 16);
	    break;
	  }
	}
      }
    }
  }
  //window.open(this.canvas.toDataURL(),'foo');
}