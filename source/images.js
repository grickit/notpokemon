var images = new Array();
var unloaded_images = 0;
function preloadImage(imageURL) {
  unloaded_images++;
  images[imageURL] = new Image();
  images[imageURL].onload = function() {
    unloaded_images--;
  }
  images[imageURL].src = 'images/'+imageURL+'.png';
}

// ----- CLASS characterSheet {
  function characterSheet(imageURL, x, y, width, height) {
    this.imageURL = imageURL;
    this.image = images[this.imageURL];
    this.x = (x == undefined)? 0 : x;
    this.y = (y == undefined)? 0 : y;
    this.width = (width == undefined)? 64 : width;
    this.height = (height == undefined)? 128 : height;

    this.images = new Array();
    this.images['north'] = {
      x: this.x,
      y: this.y,
      width: this.width/2,
      height: this.height/4,
      xoffset: -8,
      yoffset: -16
    }
    this.images['north2'] = {
      x: this.x,
      y: this.y + (this.height/4),
      width: this.width/2,
      height: this.height/4,
      xoffset: -8,
      yoffset: -8,
      trackyoffset: -8
    }
    this.images['south'] = {
      x: this.x,
      y: this.y + (this.height/4)*2,
      width: this.width/2,
      height: this.height/4,
      xoffset: -8,
      yoffset: -16
    }
    this.images['south2'] = {
      x: this.x,
      y: this.y + (this.height/4)*2 + (this.height/4),
      width: this.width/2,
      height: this.height/4,
      xoffset: -8,
      yoffset: -24,
      trackyoffset: +8
    }
    this.images['east'] = {
      x: this.x + (this.width/2),
      y: this.y + (this.height/4)*2,
      width: this.width/2,
      height: this.height/4,
      xoffset: -8,
      yoffset: -16
    }
    this.images['east2'] = {
      x: this.x + (this.width/2),
      y: this.y + (this.height/4)*2 + (this.height/4),
      width: this.width/2,
      height: this.height/4,
      xoffset: -16,
      yoffset: -16,
      trackxoffset: +8
    }
    this.images['west'] = {
      x: this.x + (this.width/2),
      y: this.y,
      width: this.width/2,
      height: this.height/4,
      xoffset: -8,
      yoffset: -16
    }
    this.images['west2'] = {
      x: this.x + (this.width/2),
      y: this.y + (this.height/4),
      width: this.width/2,
      height: this.height/4,
      xoffset: -0,
      yoffset: -16,
      trackxoffset: -8
    }
  }
// ----- }
