function randRange(min, max) {
  var random = Math.floor(Math.random()*(max))+min;
  return random;
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
	return baseTileSet.tilesByColor[tiles[y+yoffset][x+xoffset]].letter;
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