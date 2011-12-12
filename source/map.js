function map(imageURL) {

  this.image = images[imageURL];

  this.tiles = new Array();
  this.entities = new Array();

  this.canvas = document.createElement('canvas');
  this.canvas.width = this.image.width;
  this.canvas.height = this.image.height;

  this.context = this.canvas.getContext('2d');
  this.context.drawImage(this.image, 0, 0);

  this.imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);

  game.vbuffer.prepare(this.image.width*16, this.image.height*16);

  for(var y = -1; y < this.image.height+1; y++) {
    var xtiles = new Array();
    var xentities = new Array();
    for(var x = -1; x < this.image.width+1; x++) {
      var index = (y * this.imageData.width + x) * 4;
      xtiles[x] = (''+this.imageData.data[index]+','+this.imageData.data[index+1]+','+this.imageData.data[index+2]+','+this.imageData.data[index+3]);
      xentities[x] = new Array();
    }
    this.tiles[y] = xtiles;
    this.entities[y] = xentities;
  }

  for(var y = -1; y < this.image.height+1; y++) {
    for(var x = -1; x < this.image.width+1; x++) {
      game.vbuffer.drawTile(this.tiles, x, y);
    }
  }
}
