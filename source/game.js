// ----- OBJECT: game {
  var game = {
    paused: false,
    directionWords: { 0: 'north', 1: 'south', 2: 'east', 3: 'west' },
    directionNumbers: { 'north': 0, 'south': 1, 'east': 2, 'west': 3 },
    directionChanges: { 'north': { x: 0, y: -1 }, 'south': { x: 0, y: 1 }, 'east': { x: 1, y: 0 }, 'west': { x: -1, y: 0 } },
    targetFPS: 25,
    targetTPS: 1000/30,
    tileSize: 16,
    framesThisSecond: 0,
  }

  game.inbounds = function(x, y) {
    return (x >= 0 && y >= 0 && x < game.currentMap.width && y < game.currentMap.height);
  }

  game.getTile = function(x, y) {
    if(game.inbounds(x, y) && baseTileSet.tilesByColor[game.currentMap.tiles[x][y]] != undefined) {
      return baseTileSet.tilesByColor[game.currentMap.tiles[x][y]];
    }
    return game.errorTile;
  }

  game.getEntities = function(x, y) {
    if(game.inbounds(x, y)) {
      return game.currentMap.entities[x][y];
    }
    return undefined;
  }

  // ----- OBJECT: game.menus {
    game.menus = {};
    game.menus.main = new outputBox('menu_main','Main');
    game.menus.context = new outputBox('menu_context','Context');
  // ----- }

  // ----- OBJECT: game.viewport {
    game.viewport = {}
    game.viewport.canvas = document.getElementById('map');
    game.viewport.context= game.viewport.canvas.getContext('2d');
    game.viewport.context.width = game.viewport.canvas.width;
    game.viewport.context.height = game.viewport.canvas.height;
    game.viewport.tilesX = game.viewport.canvas.width / game.tileSize;
    game.viewport.tilesY = game.viewport.canvas.height / game.tileSize;
    game.viewport.x = 0;
    game.viewport.y = 0;

    game.viewport.getAdjustedTile = function(x, y) {
      var newx = game.viewport.x + x;
      var newy = game.viewport.y + y;
      return game.getTile(newx, newy);
    }

    game.viewport.getAdjustedEntities = function(x, y) {
      var newx = game.viewport.x + x;
      var newy = game.viewport.y + y;
      return game.getEntities(newx, newy);
    }

    game.viewport.getAdjustedDrawingCoordinates = function(x, y) {
      var newx = x * game.tileSize;
      var newy = y * game.tileSize;
      if(game.viewport.tracking != undefined && game.viewport.tracking.getImage().trackxoffset) {
	newx += game.viewport.tracking.getImage().trackxoffset;
      }
      if(game.viewport.tracking != undefined && game.viewport.tracking.getImage().trackyoffset) {
	newy += game.viewport.tracking.getImage().trackyoffset;
      }
      return [newx, newy];
    }

    game.viewport.drawImage = function(image, x, y) {
      var newxy = game.viewport.getAdjustedDrawingCoordinates(x, y);
      if(image instanceof animation) {
	image = image.current;
      }
      game.viewport.context.drawImage(images.get(image.imageURL), image.x, image.y, image.width, image.height, newxy[0] + image.xoffset, newxy[1] + image.yoffset, image.width, image.height);
    }

    game.viewport.drawOverlay = function(overlay, x, y) {
      if(!overlay.drawovermoving) {
	these_entities = game.viewport.getAdjustedEntities(x,y);
	for(name in these_entities) {
	  if(these_entities[name].is_moving) {
	    return;
	  }
	}
      }
      game.viewport.drawImage(overlay, x, y);
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

    game.keyboard.keyDown = function(key) {
      game.viewport.tracking = undefined;
    }

    game.keyboard.keyHold = function(key) {
      switch(key) {
	case '38':
	  game.viewport.y--;
	  break;
	case '40':
	  game.viewport.y++;
	  break;
	case '39':
	  game.viewport.x++;
	  break;
	case '37':
	  game.viewport.x--;
	  break;
      }
    }

    game.keyboard.keyUp = function(key) { }
  // ----- }

  game.drawFrame = function() {
    var starttime = new Date().getMilliseconds();
    if(!game.paused) {
      clearCanvas(game.viewport.context);
      /*if(game.viewport.tracking != undefined) {
	game.viewport.x = game.viewport.tracking.x - Math.floor(game.viewport.tilesX/2);
	game.viewport.y = game.viewport.tracking.y - Math.floor(game.viewport.tilesY/2);
      }*/

      //Render tiles
      var newx = game.viewport.x * game.tileSize;
      var newy = game.viewport.y * game.tileSize;
      if(game.viewport.tracking != undefined && game.viewport.tracking.getImage().trackxoffset) {
	newx -= game.viewport.tracking.getImage().trackxoffset;
      }
      if(game.viewport.tracking != undefined && game.viewport.tracking.getImage().trackyoffset) {
	newy -= game.viewport.tracking.getImage().trackyoffset;
      }
      var imageData = mapone.context.getImageData(newx-game.tileSize,newy-game.tileSize,game.viewport.canvas.width+game.tileSize, game.viewport.canvas.height+game.tileSize);
      game.viewport.context.putImageData(imageData, -game.tileSize, -game.tileSize);

      for(var y = -2; y < game.viewport.tilesY+2; y++) {
	for(var x = -2;  x < game.viewport.tilesX+2; x++) {
	  //Render entities
	  /*if((these_entities = game.viewport.getAdjustedEntities(x, y)) != undefined) {
	    for(name in these_entities) {
	      game.viewport.drawEntity(these_entities[name],x,y);
	    }
	  }*/
	  //Render overlays
	  for(o in (tile = game.viewport.getAdjustedTile(x, y)).overlays) {
	    game.viewport.drawOverlay(tile.overlays[o], x, y);
	  }
	}
      }

      game.framesThisSecond++;
    }
    var timer = new Date().getMilliseconds() - starttime;
    var projectedFPS = (timer == 0)? 9999 : 1000 / timer;
    var sleeptime = (1000 / game.targetFPS) - timer;
    if(projectedFPS > game.targetFPS) { setTimeout(game.drawFrame,sleeptime); }
    else { setTimeout(game.drawFrame,0); }
  }

// ----- }