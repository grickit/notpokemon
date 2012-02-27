// ----- OBJECT: game {
  var game = {
    paused: false,
    directionWords: { 0: 'north', 1: 'south', 2: 'east', 3: 'west' },
    directionNumbers: { 'north': 0, 'south': 1, 'east': 2, 'west': 3 },
    directionChanges: { 'north': { x: 0, y: -1 }, 'south': { x: 0, y: 1 }, 'east': { x: 1, y: 0 }, 'west': { x: -1, y: 0 } },
    hourTints: {
      0: 'rgba(0,0,10,0.5)',
      1: 'rgba(0,0,10,0.5)',
      2: 'rgba(0,0,10,0.5)',
      3: 'rgba(0,0,10,0.4)',
      4: 'rgba(0,0,10,0.4)',
      5: 'rgba(0,0,10,0.3)',
      6: 'rgba(0,0,10,0.3)',
      7: 'rgba(0,0,10,0.2)',
      8: 'rgba(0,0,10,0.2)',
      9: 'rgba(0,0,10,0.1)',
      10: 'rgba(0,0,10,0.1)',
      11: 'rgba(0,0,10,0)',
      12: 'rgba(0,0,10,0)',
      13: 'rgba(0,0,10,0)',
      14: 'rgba(0,0,10,0)',
      15: 'rgba(0,0,10,0.1)',
      16: 'rgba(0,0,10,0.1)',
      17: 'rgba(0,0,10,0.2)',
      18: 'rgba(0,0,10,0.2)',
      19: 'rgba(0,0,10,0.3)',
      20: 'rgba(0,0,10,0.3)',
      21: 'rgba(0,0,10,0.4)',
      22: 'rgba(0,0,10,0.4)',
      23: 'rgba(0,0,10,0.5)',
    },
    targetFPS: 25,
    targetTPS: 32, // We have to overshoot our targetTPS a bit because ticking generally takes less than a millisecond
    tileSize: 16,
    framesThisSecond: 0,
    ticksThisSecond: 0,
    entities: new Array(),
    on_tick: new Callback(),
    uid: 0,
    mousedown: false
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

  game.getCoordsInRadius = function(x,y,radius) {
    result = new Array();
    for(i=(x-radius); i<=(x+radius); i++) {
      for(j=Math.floor(y-(radius-Math.abs(x-i))); j<=Math.ceil(y+(radius-Math.abs(x-i))); j++) {
	result.push({x: i, y: j});
      }
    }
    return result;
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
      if(image instanceof Animation) {
	image = image.current;
      }
      game.viewport.context.drawImage(images.get(image.imageURL), image.x, image.y, image.width, image.height, newxy[0] + image.xoffset, newxy[1] + image.yoffset, image.width, image.height);
    }

    game.viewport.drawEntity = function(entity,x,y) {
      entity.on_render();
      game.viewport.drawImage(entity.currentImage,x,y);
    }
  // ----- }

  // ----- OBJECT: game.keyboard {
    game.keyboard = {};
    game.keyboard.keymapping = new Array();
    game.keyboard.keymapping[38] = false;
    game.keyboard.keymapping[40] = false;
    game.keyboard.keymapping[39] = false;
    game.keyboard.keymapping[37] = false;
    game.keyboard.keymapping[65] = false;
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
    }

    game.keyboard.keyHold = function(key) {
      switch(key) {
	case '38':
	  game.viewport.tracking.step('north');
	  break;
	case '40':
	  game.viewport.tracking.step('south');
	  break;
	case '39':
	  game.viewport.tracking.step('east');
	  break;
	case '37':
	  game.viewport.tracking.step('west');
	  break;
	case '65':
	  radius = game.getCoordsInRadius(game.viewport.tracking.x,game.viewport.tracking.y,4);
	  for(tile in radius) {
	    if(game.inbounds(radius[tile].x, radius[tile].y)) {
	      new Entity({
		x: radius[tile].x,
		y: radius[tile].y,
		on_moved_to: function(mover) { this.purge();},
		on_moved_from: this.on_moved_to
	      });
	    }
	  }
	  break;
      }
    }

    game.keyboard.keyUp = function(key) { }
  // ----- }

  game.drawFrame = function() {
    var framestart = new Date().getMilliseconds();
    if(!game.paused) {
      clearCanvas(game.viewport.context);
      if(game.viewport.tracking != undefined) {
	game.viewport.x = game.viewport.tracking.x - Math.floor(game.viewport.tilesX/2);
	game.viewport.y = game.viewport.tracking.y - Math.floor(game.viewport.tilesY/2);
      }

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

      game.visible_entities = 0;
      for(var y = -2; y < game.viewport.tilesY+2; y++) {
	visible_entities = new Array();
	for(var x = -2;  x < game.viewport.tilesX+2; x++) {
	  //Render entities
	  if((these_entities = game.viewport.getAdjustedEntities(x, y)) != undefined) {
	    for(name in these_entities) {
	      game.visible_entities++;
	      if(visible_entities[these_entities[name].z] == undefined) { visible_entities[these_entities[name].z] = new Array(); }
	      visible_entities[these_entities[name].z].push(these_entities[name]);
	    }
	  }
	}
	for(layer in visible_entities) {
	  for(name in visible_entities[layer]) {
	    game.viewport.drawEntity(visible_entities[layer][name],visible_entities[layer][name].x-game.viewport.x,visible_entities[layer][name].y-game.viewport.y);
	  }
	}
      }
      currentTime = new Date();
      clearCanvas(game.viewport.context,game.hourTints[currentTime.getHours()]);
      game.framesThisSecond++;
    }
    var frametime = new Date().getMilliseconds() - framestart;
    var projectedFPS = (frametime == 0)? 9999 : 1000 / frametime;
    if(projectedFPS > game.targetFPS) {
      var framesleep = (1000 / game.targetFPS) - frametime;
      setTimeout(game.drawFrame,framesleep);
    }
    else { setTimeout(game.drawFrame,0); }
  }

  game.tick = function() {
    var tickstart = new Date().getMilliseconds();
    if(!game.paused) {
      game.on_tick.fire();
      game.ticksThisSecond++;
    }
    var ticktime = new Date().getMilliseconds() - tickstart;
    var projectedTPS = (ticktime == 0)? 9999 : 1000 / ticktime;
    if(projectedTPS > game.targetTPS) {
      var ticksleep = (1000 / game.targetTPS) - ticktime;
      setTimeout(game.tick,ticksleep);
    }
    else { setTimeout(game.tick,0); }
  }

  game.registerTick = function(name,callback_object,callback_function,callback_arguments) {
    game.tickers[name] = {callback_object: callback_object, callback_function: callback_function, callback_arguments: callback_arguments};
  }

  game.viewport.canvas.addEventListener('mousedown', function(e) {
    game.mousedown = true;
    var canvasCoords = findPosition(game.viewport.canvas);
    var x = Math.floor((e.pageX - canvasCoords[0]) / 16) + game.viewport.x;
    var y = Math.floor((e.pageY - canvasCoords[1]) / 16) + game.viewport.y;
    new Entity({x: x, y: y, sprites: [foo], z: 90, ticks: false});
  });
  
  game.viewport.canvas.addEventListener('mouseup', function(e) {
    game.mousedown = false;
  });

// ----- }