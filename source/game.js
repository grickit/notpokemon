// ----- OBJECT: game {
  var game = {
    paused: false,
    directionWords: { 0: 'north', 1: 'south', 2: 'east', 3: 'west' },
    directionNumbers: { 'north': 0, 'south': 1, 'east': 2, 'west': 3 },
    directionChanges: { 'north': { x: 0, y: -1 }, 'south': { x: 0, y: 1 }, 'east': { x: 1, y: 0 }, 'west': { x: -1, y: 0 } },
    framesPerSecond: 1000/20
  }

  game.getTile = function(x, y) {
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

  game.getEntities = function(x, y) {
    if(x < 0 || y < 0 || x > mapone.image.width-1 || y > mapone.image.height-1) {
      var entities = undefined;
    }
    else {
      var entities = mapone.entities[y][x];
    }
    return entities;
  }

  // ----- OBJECT: game.menus {
    game.menus = {};
    game.menus.stdout = new output('output','',0);
    game.menus.main = new output('menu_main','Main');
    game.menus.context = new output('menu_context','Context');
    game.menus.entity_list = new output('entity_list','Targets',0);
  // ----- }


  // ----- OBJECT: game.canvas {
    game.canvas = document.getElementById('map');
  // ----- }

  // ----- OBJECT: game.mbuffer {
    game.mbuffer = {};
    game.mbuffer.canvas = document.createElement('canvas');

    game.mbuffer.prepare = function(width, height) {
      this.canvas.width = (width == undefined)? 0 : width;
      this.canvas.height = (height == undefined)? 0 : height;
      this.context = this.canvas.getContext('2d');
    }

    game.mbuffer.drawTile = function(tiles, x, y) {
      var tile = baseTileSet.tilesByColor[tiles[y][x]];
      if(tile instanceof tileType) {
	for(transition in tile.transitions) {
	  var sprite = tile.transitions[transition];
	  if(tileConditionTest(tiles,sprite.condition, x, y)) {
	    game.mbuffer.context.drawImage(sprite.image, sprite.x, sprite.y, sprite.width, sprite.height, x*16, y*16, 16, 16);
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

    game.viewport.track = function(name) {
      if(entities[name] != undefined) {
	game.viewport.tracking = entities[name];
	game.viewport.x = (entities[name].x - Math.floor(game.viewport.tilesX/2));
	game.viewport.y = (entities[name].y - Math.floor(game.viewport.tilesY/2));
      }
    }

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
      var newx = x * 16;
      var newy = y * 16;
      if(game.viewport.tracking != undefined && game.viewport.tracking.getImage().trackxoffset) {
	newx += game.viewport.tracking.getImage().trackxoffset;
      }
      if(game.viewport.tracking != undefined && game.viewport.tracking.getImage().trackyoffset) {
	newy += game.viewport.tracking.getImage().trackyoffset;
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
      if(!overlay.draw_over_moving) {
	these_entities = game.viewport.getAdjustedEntities(x,y);
	for(name in these_entities) {
	  if(these_entities[name].is_moving) {
	    return;
	  }
	}
      }
      game.viewport.context.drawImage(overlay.image, newxy[0], newxy[1]);
    }

    game.viewport.drawEntity = function(entity, x, y) {
      var newxy = game.viewport.getAdjustedDrawingCoordinates(x, y);
      var sprite = entity.getImage();
      if(entity.sprite instanceof characterSheet) {
	game.viewport.context.drawImage(entity.sprite.image, sprite.x, sprite.y, sprite.width, sprite.height, newxy[0]+sprite.xoffset, newxy[1]+sprite.yoffset, sprite.width, sprite.height);
	game.viewport.context.fillText(entity.name,newxy[0]+sprite.xoffset,newxy[1]+sprite.yoffset);
      }
      else {
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
      clearCanvas(game.viewport.context);
      if(game.viewport.tracking != undefined) {
	game.viewport.x = game.viewport.tracking.x - Math.floor(game.viewport.tilesX/2);
	game.viewport.y = game.viewport.tracking.y - Math.floor(game.viewport.tilesY/2);
      }

      //Render tiles
      var newx = game.viewport.x * 16;
      var newy = game.viewport.y * 16;
      if(game.viewport.tracking != undefined && game.viewport.tracking.getImage().trackxoffset) {
	newx -= game.viewport.tracking.getImage().trackxoffset;
      }
      if(game.viewport.tracking != undefined && game.viewport.tracking.getImage().trackyoffset) {
	newy -= game.viewport.tracking.getImage().trackyoffset;
      }
      var imageData = mapone.context.getImageData(newx-16,newy-16,game.canvas.width+16, game.canvas.height+16);
      game.viewport.context.putImageData(imageData, -16, -16);


      for(var y = -2; y < game.viewport.tilesY+2; y++) {
	for(var x = -2;  x < game.viewport.tilesX+2; x++) {
	  //Render entities
	  if((these_entities = game.viewport.getAdjustedEntities(x, y)) != undefined) {
	    for(name in these_entities) {
	      game.viewport.drawEntity(these_entities[name],x,y);
	    }
	  }
	  //Render overlays
	  for(o in (tile = game.viewport.getAdjustedTile(x, y)).overlays) {
	    game.viewport.drawOverlay(tile.overlays[o], x, y);
	  }
	}
      }
    }
  }

  game.canvas.addEventListener('mousedown', function(e) {
    var canvasCoords = findPosition(game.canvas);
    var x = Math.floor((e.pageX - canvasCoords[0]) / 16) + game.viewport.x;
    var y = Math.floor((e.pageY - canvasCoords[1]) / 16) + game.viewport.y;
    if(game.keyboard.keymapping_temp[80]) {
      if(entities['playermovemarker'] == undefined) {
	new entity({x: entities['player'].x, y: entities['player'].y, imageURL: 'characters/marker', name: 'playermovemarker'});
      }
      if(entities['playerpatrolmarker'] == undefined) {
	new entity({x: x, y: y, imageURL: 'characters/marker2', name: 'playerpatrolmarker'});
      }
      entities['playermovemarker'].setPosition(entities['player'].x,entities['player'].y);
      entities['playerpatrolmarker'].setPosition(x,y);
      entities['player'].behavior = {style: 'patrol', first: entities['playermovemarker'], second: entities['playerpatrolmarker']};
    }
    else if(game.keyboard.keymapping_temp[70]) {
      if(entities['playerguardmarker'] == undefined) {
	new entity({x: x, y: y, imageURL: 'characters/marker3', name: 'playerguardmarker'});
      }
      entities['playerguardmarker'].setPosition(x,y);
      entities['player'].behavior = {style: 'follow', min: 1, max: 9999, target: entities['playerguardmarker']};
    }
    else {
      if(entities['playermovemarker'] == undefined) {
	new entity({x: x, y: y, imageURL: 'characters/marker', name: 'playermovemarker'});
      }
      entities['playermovemarker'].setPosition(x,y);
      entities['player'].pathTo(x, y);
      entities['player'].behavior = {style: undefined};
    }
  });
// ----- }
