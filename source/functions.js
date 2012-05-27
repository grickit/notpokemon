function isset(variable) {
  return (typeof variable !== 'undefined');
}

function randRange(min, max) {
  return min + Math.floor(Math.random()*(max - min + 1));
}

function uniqueEntityID() {
  game.uid++;
  return game.uid;
}

function singleTileCondition(tiles, x, y, xoffset, yoffset) {
  if(x+xoffset >= 0 && x+xoffset < tiles.length && y+yoffset >= 0 && y+yoffset < tiles[0].length) {
    if(tiles[x+xoffset][y+yoffset] == undefined) {
      return '-';
    }
    else {
      if(baseTileSet.tilesByColor[tiles[x+xoffset][y+yoffset]] == undefined) {
	return '-';
      }
      else {
	return baseTileSet.tilesByColor[tiles[x+xoffset][y+yoffset]].group;
      }
    }
  }
  else {
    return '-';
  }
}

function tileConditionTest(tiles, condition, x, y) {
  var testString = singleTileCondition(tiles, x, y, -1, -1)+','+
  singleTileCondition(tiles, x, y, 0, -1)+','+
  singleTileCondition(tiles, x, y, 1, -1)+','+
  singleTileCondition(tiles, x, y, -1, 0)+','+
  singleTileCondition(tiles, x, y, 0, 0)+','+
  singleTileCondition(tiles, x, y, 1, 0)+','+
  singleTileCondition(tiles, x, y, -1, 1)+','+
  singleTileCondition(tiles, x, y, 0, 1)+','+
  singleTileCondition(tiles, x, y, 1, 1);
  return (testString.match(new RegExp(condition)));
}

function manhattanDistance(x, y, x2, y2) {
  return Math.abs(x2 - x) + Math.abs(y2 - y);
}

function getMovableNeighbors(x, y) {
  var neighbors = new Array();
  if(game.getTile(x,y).clipfrom[0] && game.getTile(x,y-1).clipto[0]) {
    neighbors.push({x: x, y: y-1, direction: 'north'});
  }
  if(game.getTile(x,y).clipfrom[1] && game.getTile(x,y+1).clipto[1]) {
    neighbors.push({x: x, y: y+1, direction: 'south'});
  }
  if(game.getTile(x,y).clipfrom[2] && game.getTile(x+1,y).clipto[2]) {
    neighbors.push({x: x+1, y: y, direction: 'east'});
  }
  if(game.getTile(x,y).clipfrom[3] && game.getTile(x-1,y).clipto[3]) {
    neighbors.push({x: x-1, y: y, direction: 'west'});
  }
  return neighbors;
}

function findPosition(obj) {
  var left = 0;
  var top = 0;
  do {
    left += obj.offsetLeft;
    top += obj.offsetTop;
  } while (obj = obj.offsetParent);
  return [left, top];
}

function clearCanvas(context,color) {
  context.fillStyle = (color == undefined)? '#000000' : color;
  context.beginPath();
  context.rect(0, 0, context.width, context.height);
  context.closePath();
  context.fill();
}

function ajaxGetRequest(url) {
  //Not IE?
  try { var request = new XMLHttpRequest(); }
  catch(e1) {
    //IE6+?
    try { request = new ActiveXObject('Msxml2.XMLHTTP'); }
    catch(e2) {
      //IE5?
      try { request = new ActiveXObject('"Microsoft.XMLHTTP'); }
      catch(e3) {
	//No AJAX for you
	request = false;
      }
    }
  }
  request.open('GET',url,true);
  request.send(null);
  return request;
}

function characterSheet(imageURL, x, y, width, height) {
  imageURL = imageURL;
  x = (x == undefined)? 0 : x;
  y = (y == undefined)? 0 : y;
  width = (width == undefined)? 64 : width;
  height = (height == undefined)? 128 : height;

  north_anim = new Animation([
    new Sprite({
      imageURL: imageURL,
      x: x,
      y: y,
      width: width/2,
      height: height/4,
      xoffset: -8,
      yoffset: -16,
      trackxoffset: 0,
      trackyoffset: 0,
      duration: 100
    }),
    new Sprite({
      imageURL: imageURL,
      x: x,
      y: y + (height/4),
      width: width/2,
      height: height/4,
      xoffset: -8,
      yoffset: -20,
      trackxoffset: 0,
      trackyoffset: 4,
      duration: 100
    }),
    new Sprite({
      imageURL: imageURL,
      x: x,
      y: y,
      width: width/2,
      height: height/4,
      xoffset: -8,
      yoffset: -24,
      trackxoffset: 0,
      trackyoffset: 8,
      duration: 100
    }),
    new Sprite({
      imageURL: imageURL,
      x: x,
      y: y + (height/4),
      width: width/2,
      height: height/4,
      xoffset: -8,
      yoffset: -28,
      trackxoffset: 0,
      trackyoffset: 12,
      duration: 100
    }),
  ]);

  south_anim = new Animation([
    new Sprite({
      imageURL: imageURL,
      x: x,
      y: y + (height/4)*2,
      width: width/2,
      height: height/4,
      xoffset: -8,
      yoffset: -16,
      trackxoffset: 0,
      trackyoffset: 0,
      duration: 100
    }),
    new Sprite({
      imageURL: imageURL,
      x: x,
      y: y + (height/4)*2 + (height/4),
      width: width/2,
      height: height/4,
      xoffset: -8,
      yoffset: -12,
      trackxoffset: 0,
      trackyoffset: -4,
      duration: 100
    }),
    new Sprite({
      imageURL: imageURL,
      x: x,
      y: y + (height/4)*2,
      width: width/2,
      height: height/4,
      xoffset: -8,
      yoffset: -8,
      trackxoffset: 0,
      trackyoffset: -8,
      duration: 100
    }),
    new Sprite({
      imageURL: imageURL,
      x: x,
      y: y + (height/4)*2 + (height/4),
      width: width/2,
      height: height/4,
      xoffset: -8,
      yoffset: -4,
      trackxoffset: 0,
      trackyoffset: -12,
      duration: 100
    }),
  ]);

  east_anim = new Animation([
    new Sprite({
      imageURL: imageURL,
      x: x + (width/2),
      y: y + (height/4)*2,
      width: width/2,
      height: height/4,
      xoffset: -8,
      yoffset: -16,
      trackxoffset: 0,
      trackyoffset: 0,
      duration: 100
    }),
    new Sprite({
      imageURL: imageURL,
      x: x + (width/2),
      y: y + (height/4)*2 + (height/4),
      width: width/2,
      height: height/4,
      xoffset: -4,
      yoffset: -16,
      trackxoffset: -4,
      trackyoffset: 0,
      duration: 100
    }),
    new Sprite({
      imageURL: imageURL,
      x: x + (width/2),
      y: y + (height/4)*2,
      width: width/2,
      height: height/4,
      xoffset: 4,
      yoffset: -16,
      trackxoffset: -12,
      trackyoffset: 0,
      duration: 100
    }),
    new Sprite({
      imageURL: imageURL,
      x: x + (width/2),
      y: y + (height/4)*2 + (height/4),
      width: width/2,
      height: height/4,
      xoffset: 4,
      yoffset: -16,
      trackxoffset: -12,
      trackyoffset: 0,
      duration: 100
    }),
  ]);

  west_anim = new Animation([
    new Sprite({
      imageURL: imageURL,
      x: x + (width/2),
      y: y,
      width: width/2,
      height: height/4,
      xoffset: -8,
      yoffset: -16,
      trackxoffset: 0,
      trackyoffset: 0,
      duration: 100
    }),
    new Sprite({
      imageURL: imageURL,
      x: x + (width/2),
      y: y + (height/4),
      width: width/2,
      height: height/4,
      xoffset: -12,
      yoffset: -16,
      trackxoffset: 4,
      trackyoffset: 0,
      duration: 100
    }),
    new Sprite({
      imageURL: imageURL,
      x: x + (width/2),
      y: y,
      width: width/2,
      height: height/4,
      xoffset: -16,
      yoffset: -16,
      trackxoffset: 8,
      trackyoffset: 0,
      duration: 100
    }),
    new Sprite({
      imageURL: imageURL,
      x: x + (width/2),
      y: y + (height/4),
      width: width/2,
      height: height/4,
      xoffset: -20,
      yoffset: -16,
      trackxoffset: 12,
      trackyoffset: 0,
      duration: 100
    }),
  ]);
  return [north_anim,south_anim,east_anim,west_anim];
}
