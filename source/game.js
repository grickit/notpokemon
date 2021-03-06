//# DIRTY

// ----- OBJECT: game {
  var game = {
    paused: false,
    directionWords: { 0: 'north', 1: 'south', 2: 'east', 3: 'west' },
    directionNumbers: { 'north': 0, 'south': 1, 'east': 2, 'west': 3 },
    directionChanges: { 'north': { x: 0, y: -1 }, 'south': { x: 0, y: 1 }, 'east': { x: 1, y: 0 }, 'west': { x: -1, y: 0 } },
    hourTints: {
      0: 'rgba(0,0,10,0.7)',
      1: 'rgba(0,0,10,0.8)',
      2: 'rgba(0,0,10,0.8)',
      3: 'rgba(0,0,10,0.7)',
      4: 'rgba(0,0,10,0.6)',
      5: 'rgba(0,0,10,0.5)',
      6: 'rgba(30,20,0,0.4)',
      7: 'rgba(30,20,0,0.3)',
      8: 'rgba(30,20,0,0.2)',
      9: 'rgba(0,0,0,0.1)',
      10: 'rgba(0,0,0,0)',
      11: 'rgba(0,0,0,0)',
      12: 'rgba(0,0,0,0)',
      13: 'rgba(0,0,0,0)',
      14: 'rgba(0,0,0,0)',
      15: 'rgba(20,10,0,0.1)',
      16: 'rgba(30,20,0,0.1)',
      17: 'rgba(40,30,0,0.2)',
      18: 'rgba(50,40,0,0.2)',
      19: 'rgba(60,50,10,0.3)',
      20: 'rgba(70,60,0,0.4)',
      21: 'rgba(0,0,20,0.4)',
      22: 'rgba(0,0,20,0.5)',
      23: 'rgba(0,0,20,0.6)',
    },
    targetFPS: 25,
    targetTPS: 25,
    tileSize: 16,
    tileScale: 2,
    framesThisSecond: 0,
    ticksThisSecond: 0,
    entities: new Object(),
    on_tick: new Callback(),
    uid: 0,
    mousedown: false
  }

  game.inbounds = function(x, y) {
    return (x >= 0 && y >= 0 && x < game.currentMap.width && y < game.currentMap.height);
  }

  game.getTile = function(x, y) {
    if(game.inbounds(x, y) && baseTileSet.tiles[game.currentMap.tiles[x][y]] != undefined) {
      return baseTileSet.tiles[game.currentMap.tiles[x][y]];
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
    game.menus.main = new OutputBox('menu_main','Main');
    game.menus.context = new OutputBox('menu_context','Context');
    game.menus.side = new OutputBox('menu_side','Side');
  // ----- }

  // ----- OBJECT: game.viewport {
    game.viewport = {}
    game.viewport.canvas = document.getElementById('map');
    game.viewport.context = game.viewport.canvas.getContext('2d');
    game.viewport.canvas.width = parseInt(game.viewport.canvas.clientWidth);
    game.viewport.canvas.height = parseInt(game.viewport.canvas.clientHeight);
    game.viewport.context.width = game.viewport.canvas.width;
    game.viewport.context.height = game.viewport.canvas.height;
    game.viewport.tilesX = Math.floor(game.viewport.canvas.width / game.tileSize);
    game.viewport.tilesY = Math.floor(game.viewport.canvas.height / game.tileSize);
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
      game.viewport.drawImage(entity.getImage(),x,y);
    }
  // ----- }

  // ----- OBJECT: game.keyboard {
    game.keyboard = {};
    game.keyboard.keymapping = new Object();
    game.keyboard.keymapping_temp = new Object();

    game.keyboard.poll = function() {
      if(!game.paused) {
        for(key in game.keyboard.keymapping_temp) {
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
        game.keyboard.keymapping_temp = new Object();
      }
    }

    game.keyboard.keyDown = function(key) { game.currentWindow.keyDown(key); }

    game.keyboard.keyHold = function(key) { game.currentWindow.keyHold(key); }

    game.keyboard.keyUp = function(key) { game.currentWindow.keyUp(key); }
  // ----- }

  game.drawFrame = function() {
    var framestart = new Date().getMilliseconds();

    game.viewport.canvas.width = parseInt(game.viewport.canvas.clientWidth);
    game.viewport.canvas.height = parseInt(game.viewport.canvas.clientHeight);
    game.viewport.context.width = game.viewport.canvas.width;
    game.viewport.context.height = game.viewport.canvas.height;
    game.viewport.tilesX = Math.floor(game.viewport.canvas.width / game.tileSize / game.tileScale);
    game.viewport.tilesY = Math.floor(game.viewport.canvas.height / game.tileSize / game.tileScale);

    if(!game.paused) {
      //clearCanvas(game.viewport.context);
      game.viewport.context.scale(game.tileScale,game.tileScale);
      game.viewport.context.webkitImageSmoothingEnabled = game.viewport.context.imageSmoothingEnabled = game.viewport.context.mozImageSmoothingEnabled = game.viewport.context.oImageSmoothingEnabled = false;
      if(game.viewport.tracking != undefined) {
        game.viewport.x = game.viewport.tracking.x - Math.floor(game.viewport.tilesX/2);
        game.viewport.y = game.viewport.tracking.y - Math.floor(game.viewport.tilesY/2);
      }

      //Render tiles
      for(var x = -2; x < game.viewport.tilesX+2; x++) {
        for(var y = -2; y < game.viewport.tilesY+2; y++) {
          game.viewport.drawImage(game.viewport.getAdjustedTile(x,y).sprite,x,y);
        }
      }

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
      game.viewport.context.scale(1/game.tileScale,1/game.tileScale); // Unscale the canvas for drawing text
      game.framesThisSecond++;
      game.viewport.context.fillStyle = "white";
      game.viewport.context.fillText(Object.keys(game.entities).length+' entities',10,30);
      game.viewport.context.fillText(game.visible_entities+' visible',10,40);
      game.viewport.context.fillText(game.actualFramesPerSecond+'/'+game.targetFPS+' fps',10,50);
      game.viewport.context.fillText(game.actualTicksPerSecond+'/'+game.targetTPS+' tps',10,60);
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
    var projectedTPS = (ticktime == 0)? 9999 : (1000 / ticktime);
    if(projectedTPS > game.targetTPS) {
      var ticksleep = (1000 / game.targetTPS) - ticktime;
      setTimeout(game.tick,ticksleep);
    }
    else { setTimeout(game.tick,0); }
  }

  game.viewport.canvas.addEventListener('mousedown', function(e) {
    game.mousedown = true;
    game.currentWindow.mouseDown(game.cursor.tileX,game.cursor.tileY);
  });

  game.viewport.canvas.addEventListener('mouseup', function(e) {
    game.mousedown = false;
    game.currentWindow.mouseUp(game.cursor.tileX,game.cursor.tileY);
  });

  game.viewport.canvas.addEventListener('mousemove', function(e) {
    var xy = convertPageXYToTileXY(e.pageX,e.pageY);
    game.cursor.pageX = e.pageX;
    game.cursor.pageY = e.pageY;
    game.cursor.tileX = xy[0];
    game.cursor.tileY = xy[1];
    game.currentWindow.mouseMove(game.cursor.tileX,game.cursor.tileY);
  });

// ----- }