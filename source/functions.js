function randRange(min, max) {
  return Math.floor(Math.random()*(max))+min;
}

function easyCharacterSheet(imageURL, x, y) {
  return new characterSheet('characters/'+imageURL+'pokemon', x*64+x, y*128+y, 64, 128);
}

function singleTileCondition(tiles, x, y, xoffset, yoffset) {
  if(y+yoffset > 0 && y+yoffset < tiles.length && x+xoffset > 0 && x+xoffset < tiles[0].length) {
    if(tiles[y+yoffset][x+xoffset] == undefined) {
      return '_';
    }
    else {
      if(baseTileSet.tilesByColor[tiles[y+yoffset][x+xoffset]] == undefined) {
	return '_';
      }
      else {
	return baseTileSet.tilesByColor[tiles[y+yoffset][x+xoffset]].group;
      }
    }
  }
  else {
    return '_';
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
  if(game.getTile(x,y-1).clip[0]) {
    neighbors.push({x: x, y: y-1, direction: 'north'});
  }
  if(game.getTile(x,y+1).clip[1]) {
    neighbors.push({x: x, y: y+1, direction: 'south'});
  }
  if(game.getTile(x+1,y).clip[2]) {
    neighbors.push({x: x+1, y: y, direction: 'east'});
  }
  if(game.getTile(x-1,y).clip[3]) {
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

function clearCanvas(context) {
  context.fillStyle = '#000000FF';
  context.beginPath();
  context.rect(0, 0, context.width, context.height);
  context.closePath();
  context.fill();
}
