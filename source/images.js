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

    this.images['north1'] = {
      x: this.x,
      y: this.y,
      width: this.width/2,
      height: this.height/4,
      xoffset: -8,
      yoffset: -16,
      trackxoffset: 0,
      trackyoffset: 0
    }
    this.images['north2'] = {
      x: this.x,
      y: this.y + (this.height/4),
      width: this.width/2,
      height: this.height/4,
      xoffset: -8,
      yoffset: -12,
      trackxoffset: 0,
      trackyoffset: -4
    }
    this.images['north3'] = {
      x: this.x,
      y: this.y,
      width: this.width/2,
      height: this.height/4,
      xoffset: -8,
      yoffset: -8,
      trackxoffset: 0,
      trackyoffset: -8
    }
    this.images['north4'] = {
      x: this.x,
      y: this.y + (this.height/4),
      width: this.width/2,
      height: this.height/4,
      xoffset: -8,
      yoffset: -4,
      trackxoffset: 0,
      trackyoffset: -12
    }


    this.images['south1'] = {
      x: this.x,
      y: this.y + (this.height/4)*2,
      width: this.width/2,
      height: this.height/4,
      xoffset: -8,
      yoffset: -16,
      trackxoffset: 0,
      trackyoffset: 0
    }
    this.images['south2'] = {
      x: this.x,
      y: this.y + (this.height/4)*2 + (this.height/4),
      width: this.width/2,
      height: this.height/4,
      xoffset: -8,
      yoffset: -20,
      trackxoffset: 0,
      trackyoffset: +4
    }
    this.images['south3'] = {
      x: this.x,
      y: this.y + (this.height/4)*2,
      width: this.width/2,
      height: this.height/4,
      xoffset: -8,
      yoffset: -24,
      trackxoffset: 0,
      trackyoffset: +8
    }
    this.images['south4'] = {
      x: this.x,
      y: this.y + (this.height/4)*2 + (this.height/4),
      width: this.width/2,
      height: this.height/4,
      xoffset: -8,
      yoffset: -28,
      trackxoffset: 0,
      trackyoffset: +12
    }


    this.images['east1'] = {
      x: this.x + (this.width/2),
      y: this.y + (this.height/4)*2,
      width: this.width/2,
      height: this.height/4,
      xoffset: -8,
      yoffset: -16,
      trackxoffset: 0,
      trackyoffset: 0
    }
    this.images['east2'] = {
      x: this.x + (this.width/2),
      y: this.y + (this.height/4)*2 + (this.height/4),
      width: this.width/2,
      height: this.height/4,
      xoffset: -12,
      yoffset: -16,
      trackxoffset: +4,
      trackyoffset: 0
    }
    this.images['east3'] = {
      x: this.x + (this.width/2),
      y: this.y + (this.height/4)*2,
      width: this.width/2,
      height: this.height/4,
      xoffset: -16,
      yoffset: -16,
      trackxoffset: +8,
      trackyoffset: 0
    }
    this.images['east4'] = {
      x: this.x + (this.width/2),
      y: this.y + (this.height/4)*2 + (this.height/4),
      width: this.width/2,
      height: this.height/4,
      xoffset: -20,
      yoffset: -16,
      trackxoffset: +12,
      trackyoffset: 0
    }


    this.images['west1'] = {
      x: this.x + (this.width/2),
      y: this.y,
      width: this.width/2,
      height: this.height/4,
      xoffset: -8,
      yoffset: -16,
      trackxoffset: 0,
      trackyoffset: 0
    }
    this.images['west2'] = {
      x: this.x + (this.width/2),
      y: this.y + (this.height/4),
      width: this.width/2,
      height: this.height/4,
      xoffset: -4,
      yoffset: -16,
      trackxoffset: -4,
      trackyoffset: 0
    }
    this.images['west3'] = {
      x: this.x + (this.width/2),
      y: this.y,
      width: this.width/2,
      height: this.height/4,
      xoffset: -0,
      yoffset: -16,
      trackxoffset: -8,
      trackyoffset: 0
    }
    this.images['west4'] = {
      x: this.x + (this.width/2),
      y: this.y + (this.height/4),
      width: this.width/2,
      height: this.height/4,
      xoffset: +4,
      yoffset: -16,
      trackxoffset: -12,
      trackyoffset: 0
    }
  }
// ----- }
