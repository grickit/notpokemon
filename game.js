// ----- OBJECT: game {
  var game = {
    paused: false,
    directionWords: { 0: 'north', 1: 'south', 2: 'east', 3: 'west' },
    directionNumbers: { 'north': 0, 'south': 1, 'east': 2, 'west': 3 },
    directionChanges: { 'north': { x: 0, y: -1 }, 'south': { x: 0, y: 1 }, 'east': { x: 1, y: 0 }, 'west': { x: -1, y: 0 } },
    framesPerSecond: 1000/25
  }


  // ----- OBJECT: game.menus {
    game.menus = {};
    game.menus.stdout = new output('output','',0);
    game.menus.main = new output('menu_main','Main');
    game.menus.context = new output('menu_context','Context');
  // ----- }


  // ----- OBJECT: game.canvas {
    game.canvas = document.getElementById('map');
  // ----- }

  // ----- OBJECT: game.vbuffer {
    game.vbuffer = {};
    game.vbuffer.canvas = document.createElement('canvas');

    game.vbuffer.prepare = function(width, height) {
      this.canvas.width = (width == undefined)? 0 : width;
      this.canvas.height = (height == undefined)? 0 : height;
      this.context = this.canvas.getContext('2d');
    }

    game.vbuffer.drawTile = function(tiles, x, y) {
      var tile = baseTileSet.tilesByColor[tiles[y][x]];
      if(tile instanceof tileType) {
	for(transition in tile.transitions) {
	  var sprite = tile.transitions[transition];
	  if(tileConditionTest(tiles,sprite.condition, x, y)) {
	    game.vbuffer.context.drawImage(sprite.image, sprite.x, sprite.y, sprite.width, sprite.height, x*16, y*16, 16, 16);
	    break;
	  }
	}
      }
    }

  // ----- }


  // ----- OBJECT: game.viewport {
    game.viewport = {}
    game.viewport.context= game.canvas.getContext('2d');
    game.viewport.context.width = game.canvas.width;
    game.viewport.context.height = game.canvas.height;
    game.viewport.tilesX = game.canvas.width / 16;
    game.viewport.tilesY = game.canvas.height / 16;
    game.viewport.x = 0;
    game.viewport.y = 0;

    game.viewport.clear = function() {
      game.viewport.context.fillStyle = '#000000';
      game.viewport.context.beginPath();
      game.viewport.context.rect(0, 0, game.viewport.context.width, game.viewport.context.height);
      game.viewport.context.closePath();
      game.viewport.context.fill();
    }

    game.viewport.getTile = function(x, y) {
      if(x < 0 || y < 0 || x > mapone.image.width-1 || y > mapone.image.height-1) {
	var tile = game.errorTile;
      }
      else {
	var tile = baseTileSet.tilesByColor[mapone.tiles[y][x]];
      }
      if (tile == undefined) {
	tile = game.errorTile;
      }
      return tile;
    }

    game.viewport.getAdjustedTile = function(x, y) {
      var newx = game.viewport.x + x;
      var newy = game.viewport.y + y;
      return game.viewport.getTile(newx, newy);
    }

    game.viewport.getAdjustedEntity = function(x, y) {
      var newx = game.viewport.x + x;
      var newy = game.viewport.y + y;
      if(newx < 0 || newy < 0 || newx > mapone.image.width-1 || newy > mapone.image.height-1) {
	var entity = undefined;
      }
      else {
	var entity = mapone.entities[newy][newx];
      }
      return entity;
    }

    game.viewport.getAdjustedDrawingCoordinates = function(x, y) {
      if(entities['player'].is_moving) {
	var newx = (x * 16) + (game.directionChanges[game.directionWords[entities['player'].facing]].x * 8);
	var newy = (y * 16) + (game.directionChanges[game.directionWords[entities['player'].facing]].y * 8);
      }
      else {
	var newx = x * 16;
	var newy = y * 16;
      }
      return [newx, newy];
    }

    game.viewport.drawTile = function(tile, x, y) {
      var newxy = game.viewport.getAdjustedDrawingCoordinates(x, y);
      if(tile instanceof tileType) {
	game.viewport.context.drawImage(tile.image, newxy[0], newxy[1]);
      }
      else {
	for(test in tile.image.images) {
	  var newx = game.viewport.x + x;
	  var newy = game.viewport.y + y;
	  if(tileConditionTest(tile.image.images[test].condition,newx,newy)) {
	    var sprite = tile.image.images[test];
	    game.viewport.context.drawImage(tile.image.image, sprite.x, sprite.y, sprite.width, sprite.height, newxy[0], newxy[1], sprite.width, sprite.height);
	  }
	}
      }
    }

    game.viewport.drawOverlay = function(overlay, x, y) {
      var newxy = game.viewport.getAdjustedDrawingCoordinates(x + overlay.xoffset, y + overlay.yoffset);
      if(!overlay.draw_while_moving) {
	if(game.viewport.getAdjustedEntity(x,y) == undefined || !game.viewport.getAdjustedEntity(x,y).is_moving) {
	  game.viewport.context.drawImage(overlay.image, newxy[0], newxy[1]);
	}
      }
      else {
	game.viewport.context.drawImage(overlay.image, newxy[0], newxy[1]);
      }
    }

    game.viewport.drawEntity = function(entity, x, y) {
      var newxy = game.viewport.getAdjustedDrawingCoordinates(x, y);
      var sprite = entity.getImage();
      if(entity.sprite instanceof characterSheet) {
	game.viewport.context.drawImage(entity.image, sprite.x, sprite.y, sprite.width, sprite.height, newxy[0]+sprite.xoffset, newxy[1]+sprite.yoffset, sprite.width, sprite.height);
      }
      else if(entity.sprite instanceof Image) {
	game.viewport.context.drawImage(sprite, newxy[0], newxy[1]);
      }
    }
  // ----- }


  // ----- OBJECT: game.keyboard {
    game.keyboard = {};
    game.keyboard.keymapping = new Array();
    game.keyboard.keymapping[38] = false;
    game.keyboard.keymapping[40] = false;
    game.keyboard.keymapping[39] = false;
    game.keyboard.keymapping[37] = false;
    game.keyboard.keymapping_temp = new Array();

    game.keyboard.keyDown = function(key) {
      switch(key) {
	case '38':
	  entities['player'].facing = 0;
	  entities['player'].is_moving = false;
	  break;
	case '40':
	  entities['player'].facing = 1;
	  entities['player'].is_moving = false;
	  break;
	case '39':
	  entities['player'].facing = 2;
	  entities['player'].is_moving = false;
	  break;
	case '37':
	  entities['player'].facing = 3;
	  entities['player'].is_moving = false;
	  break;
      }
    }

    game.keyboard.keyHold = function(key) {
      switch(key) {
	case '38':
	  entities['player'].step('north');
	  break;
	case '40':
	  entities['player'].step('south');
	  break;
	case '39':
	  entities['player'].step('east');
	  break;
	case '37':
	  entities['player'].step('west');
	  break;
      }
    }

    game.keyboard.keyUp = function(key) { }

    game.keyboard.poll = function() {
      if(!game.paused) {
	for(key in game.keyboard.keymapping) {
	  if(game.keyboard.keymapping_temp[key]) {
	    if(game.keyboard.keymapping[key]) {
	      game.keyboard.keyHold(key);
	    }
	    else {
	      game.keyboard.keymapping[key] = true;
	      game.keyboard.keyDown(key);
	    }
	  }
	  else if (game.keyboard.keymapping[key]) {
	    game.keyboard.keymapping[key] = false;
	    game.keyboard.keyUp(key);
	  }
	}
      }
      else {
	game.keyboard.keymapping_temp = new Array();
      }
    }
  // ----- }

  game.drawMap = function() {
    if(!game.paused) {
      game.viewport.clear();
      game.viewport.x = entities['player'].x - 8;
      game.viewport.y = entities['player'].y - 6;

      /*for(var y = -1; y < game.viewport.tilesY+1; y++) {
	for(var x = -1;  x < game.viewport.tilesX+1; x++) {
	  //Render tile
	  var newx = (x+game.viewport.x)*16;
	  var newy = (y+game.viewport.y)*16;
	  var imageData = game.vbuffer.context.getImageData(newx, newy,16,16);
	  var putxy = game.viewport.getAdjustedDrawingCoordinates(x, y);
	  game.viewport.context.putImageData(imageData, putxy[0], putxy[1]);
	}
      }*/

      //Render tiles
      if(entities['player'].is_moving) { // This condition-set is the opposite of game.viewport.getAdjustedDrawingCoordinateS()
	var newx = (game.viewport.x * 16) - (game.directionChanges[game.directionWords[entities['player'].facing]].x * 8);
	var newy = (game.viewport.y * 16) - (game.directionChanges[game.directionWords[entities['player'].facing]].y * 8);
      }
      else {
	var newx = game.viewport.x * 16;
	var newy = game.viewport.y * 16;
      }
      var imageData = game.vbuffer.context.getImageData(newx,newy,game.canvas.width, game.canvas.height);
      game.viewport.context.putImageData(imageData, 0, 0);


      for(var y = -1; y < game.viewport.tilesY+1; y++) {
	for(var x = -1;  x < game.viewport.tilesX+1; x++) {
	  //Render entities
	  if((entity = game.viewport.getAdjustedEntity(x, y)) != undefined) {
	    game.viewport.drawEntity(entity,x,y);
	  }
	  //Render overlays
	  for(o in (tile = game.viewport.getAdjustedTile(x, y)).overlays) {
	    game.viewport.drawOverlay(tile.overlays[o], x, y);
	  }
	}
      }
    }
  }
// ----- }