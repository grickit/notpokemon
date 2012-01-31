function map(imageURL,extralayers) {
  this.imageURL = imageURL;
  this.tiles = new Array();
  this.entities = new Array();
  this.events = new Array();
  this.extralayers = extralayers;
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
	for(overlay in tile.overlays) {
	  tile.overlays[overlay].x = x;
	  tile.overlays[overlay].y = y;
	  new entity(tile.overlays[overlay],this);
	}
      }
    }
  }
  //window.open(this.canvas.toDataURL(),'foo');
  for(layer in this.extralayers) {
    images.load(this.extralayers[layer],this,'addLayer',this.extralayers[layer]);
  }
}

map.prototype.addLayer = function(imageURL) {
  if (images.get(imageURL).width != this.width || images.get(imageURL).height != this.height) {
    throw "Map layer '"+imageURL+"' is not the same dimensions as base map '"+this.imageURL+"'.";
  }
  var tempcanvas = document.createElement('canvas');
  tempcanvas.width = this.width;
  tempcanvas.height = this.height;
  var tempcontext = tempcanvas.getContext('2d');
  tempcontext.drawImage(images.get(imageURL), 0, 0);

  for(var x = 0; x < this.width; x++) {
    for(var y = 0; y < this.height; y++) {
      var tempimagedata = tempcontext.getImageData(x,y,1,1);
      var color = (''+tempimagedata.data[0]+','+tempimagedata.data[1]+','+tempimagedata.data[2]+','+tempimagedata.data[3]);
      if(color != '0,0,0,0') {
	this.tiles[x][y] = color;
      }
    }
  }

  for(var x = 0; x < this.width; x++) {
    for(var y = 0; y < this.height; y++) {
      var tempimagedata = tempcontext.getImageData(x,y,1,1);
      var color = (''+tempimagedata.data[0]+','+tempimagedata.data[1]+','+tempimagedata.data[2]+','+tempimagedata.data[3]);
      if(color != '0,0,0,0') {
	var tile = baseTileSet.tilesByColor[this.tiles[x][y]];
	if(tile instanceof tileType) {
	  for(transition in tile.transitions) {
	    var sprite = tile.transitions[transition];
	    if(tileConditionTest(this.tiles,sprite.condition, x, y)) {
	      this.context.drawImage(images.get(sprite.imageURL), sprite.x, sprite.y, sprite.width, sprite.height, x*16+sprite.xoffset, y*16+sprite.yoffset, 16, 16);
	      break;
	    }
	  }
	  for(overlay in tile.overlays) {
	    tile.overlays[overlay].x = x;
	    tile.overlays[overlay].y = y;
	    new entity(tile.overlays[overlay],this);
	  }
	}
      }
    }
  }
}