//# DIRTY

function preStart() {
  game.stdout = new OutputBox('stdout','Standard Output',5);
  game.stdout.write('Output started.');
  game.stdout.write('Creating the rest of the output boxes.');

  game.stdout.write('Loading images.');
  images = new ImageManager();
  images.load('404');
  images.load('alpha');
  images.load('characters/marker');
  images.load('characters/kantopokemon');
  images.load('characters/johtopokemon');
  images.load('characters/hoennpokemon');
  images.load('tiles/dirttograss');
  images.load('tiles/watertograss');
  images.load('tiles/sandtograss');
  images.load('tiles/sandtowater');
  images.load('tiles/hilltograss');
  images.load('tiles/tree');
  images.load('tiles/grass');
  images.load('tiles/tallgrass');
  images.load('tiles/redflower');
  images.load('tiles/hillstairs');
  images.load('characters/sign');

  editorWindow = new WindowType({
    keyHold: function(key) {
      switch(key) {
        case '38':
          game.viewport.tracking = null;
          game.viewport.y--;
          break;
        case '40':
          game.viewport.tracking = null;
          game.viewport.y++;
          break;
        case '39':
          game.viewport.x++;
          game.viewport.tracking = null;
          break;
        case '37':
          game.viewport.tracking = null;
          game.viewport.x--;
          break;
      }
    },
    keyUp: function(key) {
      switch(key) {
        case '81':
          tilePicker.scroll_down();
          break;
        case '87':
          tilePicker.scroll_up();
          break;
      }
    },
    mouseDown: function(x,y) {
      if(game.inbounds(x,y)) {
        game.currentMap.tiles[x][y] = tilePicker.tileArray[tilePicker.index];
      }
    },
    mouseMove: function(x,y) {
      if(game.inbounds(x,y)) {
        tilePicker.setPosition(x,y);
      }
      if(game.mousedown) {
        editorWindow.mouseDown(x,y);
      }
    }
  });

  gameWindow = new WindowType({
    keyHold: function(key) {
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
      }
    },
    mouseDown: function(x,y) {
      if(game.inbounds(x,y)) {
        var hereEnts = game.getEntities(x,y);
        for(entity in hereEnts) {
          hereEnts[entity].purge();
        }
        delete hereEnts;
        new Entity({ x: x, y: y, z: 500, sprites: [ treeSprite ]});
      }
    },
    mouseMove: function(x,y) {
      if(game.mousedown) {
        gameWindow.mouseDown(x,y);
      }
    },
  });
}

var roseAnim = new Animation([
  new Sprite({imageURL: 'tiles/redflower', x: 0, width: 17, height: 32, yoffset: -15, duration: 550}),
  new Sprite({imageURL: 'tiles/redflower', x: 18, width: 17, height: 32, yoffset: -15, duration: 550}),
  new Sprite({imageURL: 'tiles/redflower', x: 0, width: 17, height: 32, yoffset: -15, duration: 550}),
  new Sprite({imageURL: 'tiles/redflower', x: 36, width: 17, height: 32, yoffset: -15, duration: 550}),
],{paused: false, loop:true});

var treeSprite = new Sprite({imageURL: 'tiles/tree', width: 32, height: 40, xoffset: -8, yoffset: -23});

function start() {
  game.errorTile = new TileType({code: '_',sprite: new Sprite({ imageURL: '404' })});

  baseTileSet = new TileSet();
  baseTileSet.add({code: 'g',sprite: new Sprite({imageURL: 'tiles/grass'}),clipto: [true,true,true,true]});
  baseTileSet.add({code: 'd',sprite: new Sprite({imageURL: 'tiles/dirttograss',x: 17,y: 51}),clipto: [true,true,true,true]});
  baseTileSet.add({code: 's',sprite: new Sprite({imageURL: 'tiles/sandtograss',x: 17,y: 51}),clipto: [true,true,true,true]});

  tileTransitionSet(baseTileSet,'dg','tiles/dirttograss');
  tileTransitionSet(baseTileSet,'hg','tiles/hilltograss');
  tileTransitionSet(baseTileSet,'sg','tiles/sandtograss');

  for(var code in baseTileSet.tiles) {
    var tile = baseTileSet.tiles[code];
    game.menus.side.write('<a href="#" onclick="editorWindow.tile=\''+code+'\'">'+code+'</a>');
  }


  mapone = new Map(75,40);
  game.currentMap = mapone;
  mapone.tiles = [
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","d","d","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","d","d","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","d","d","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","d","d","d","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","d","d","d","d","d","g","g","g","g","g","d","d","d","g","d","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","d","d","d","d","d","d","g","g","g","d","d","d","d","d","d","d","d","d","d","d","d","g","g","g","g","g","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","s","d","d","d","g","d","d","d","d","g","d","d","d","d","d","d","d","d","d","g","g","g","g","g","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","s","s","g","d","d","d","d","d","d","g","g","g","g","g","s","s","s","s","d","d","d","g","g","g","g","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","s","s","s","g","g","d","d","d","d","g","g","g","g","g","s","s","s","s","s","g","d","d","d","d","g","g","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","s","s","g","g","g","d","d","g","g","g","g","g","g","g","s","s","s","g","g","g","d","d","d","d","d","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","s","s","g","s","d","g","g","g","g","g","g","g","g","s","s","s","g","g","g","g","g","d","d","d","d","d","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","s","s","s","s","s","d","d","g","g","g","g","g","g","g","g","s","s","g","g","g","g","g","g","g","d","d","d","d","d","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","s","s","s","s","s","d","d","g","g","g","g","g","g","g","g","s","s","s","g","g","g","g","g","g","g","g","g","d","d","d","g","g"],
  ["g","g","g","g","g","g","s","s","s","s","s","s","s","d","d","d","g","g","g","g","g","g","g","g","s","s","s","g","g","g","g","g","g","g","g","g","g","d","d","d","g"],
  ["g","g","g","g","g","g","s","s","s","s","s","s","s","s","d","d","d","g","g","g","g","g","g","s","s","s","g","g","g","g","s","g","g","g","g","g","g","d","d","d","g"],
  ["g","g","g","g","g","s","s","s","s","s","s","s","s","s","d","d","d","g","g","g","g","g","g","s","g","g","g","s","s","s","s","g","g","g","g","g","g","g","d","d","g"],
  ["g","g","g","g","s","s","s","s","s","s","s","s","s","s","s","d","d","g","g","g","g","g","g","g","g","g","s","s","s","s","s","g","g","g","g","g","g","g","g","d","g"],
  ["g","g","g","g","g","s","s","s","s","s","s","s","s","s","s","d","d","g","g","g","g","g","g","g","s","g","g","s","s","s","g","g","g","g","g","g","g","g","g","d","g"],
  ["g","g","g","g","s","g","s","s","s","s","s","s","s","s","s","d","d","g","g","g","g","g","s","s","s","s","s","s","s","g","g","g","g","g","g","g","g","g","g","g","g"],
  ["g","g","g","g","s","s","s","s","s","s","s","s","s","s","d","d","d","g","g","g","g","s","s","s","s","s","s","s","g","g","g","g","g","g","g","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","s","s","s","s","s","s","s","d","d","d","g","g","g","g","s","s","s","s","s","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","s","s","s","s","s","s","d","d","d","g","g","g","s","s","s","s","s","s","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","s","s","s","s","g","s","d","d","g","s","s","s","s","s","s","s","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","s","g","s","s","g","d","d","g","g","g","g","g","s","s","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","s","s","g","d","d","d","g","g","g","g","s","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","s","g","d","d","d","d","d","d","d","d","d","d","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","d","d","d","d","d","d","d","d","d","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","d","s","g","d","d","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","s","s","s","g","d","d","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","s","s","s","s","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","s","s","s","s","g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","s","s","s","g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","s","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","s","s","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","s","s","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","s","s","s","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","s","s","s","s","g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","s","s","s","s","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","s","s","s","s","s","g","g","g","g","g","g","g","g","g","g","g","g","s","s","s","s","s","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","s","s","s","s","s","s","g","g","g","g","g","g","g","g","g","s","s","s","s","s","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","s","s","s","s","s","g","g","g","g","g","g","g","g","s","s","s","s","s","s","g","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","s","s","g","g","g","g","g","g","g","g","s","s","s","s","s","s","g","g","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","s","s","s","g","g","g","g","g","g","g","g","s","s","s","s","s","g","g","g","g","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","s","s","s","g","g","g","g","g","g","g","g","g","s","s","s","g","g","g","g","g","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","s","s","s","g","g","g","g","g","g","g","s","s","s","s","g","g","g","g","g","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","s","s","g","g","g","g","g","g","g","s","s","s","s","s","g","g","g","g","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","g","g","g","g","g","g","s","s","s","s","s","s","g","g","g","g","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","g","g","g","g","g","s","s","s","s","s","s","s","s","s","g","g","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","s","s","s","s","s","s","s","s","g","g","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","s","s","s","s","g","g","g","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","s","s","s","g","g","g","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","s","s","s","g","g","g","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","s","s","s","g","g","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","s","s","s","g","g","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","s","s","s","s","g","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","s","s","s","s","s","s","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","s","s","s","s","s","s","s","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","s","s","s","s","s","s","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","s","s","s","s","s","s","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","s","s","s","s","s","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","s","s","s","s","s","s","s","g","s","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","s","s","s","s","s","s","s","s","g"],
  ["s","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","s","s","s","s","s","s","s","s","g"],
  ["s","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","s","s","s","s","s","s","s","g"],
  ["s","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","s","s","s","s","s","s","g"],
  ["s","s","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","s","s","s","g","g","g"],
  ["s","s","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","s","g","g","g","g"],
  ["s","s","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g"],
  ["s","s","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g"],
  ["s","s","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g"],
  ["s","s","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g"],
  ["s","s","s","s","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g"],
  ["s","s","s","s","s","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","s","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g"],
  ["s","s","s","s","s","s","s","g","g","g","g","g","g","g","g","g","s","s","s","s","s","s","s","s","s","s","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g"],
  ["s","s","s","s","s","s","s","g","g","g","g","g","g","g","g","g","s","s","s","s","s","s","s","s","s","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g"],
  ["s","s","s","s","s","s","s","s","s","s","g","g","g","g","g","s","s","s","s","s","s","s","s","s","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g"],
  ["s","s","s","s","s","s","s","s","s","s","s","s","s","s","s","s","s","s","s","s","s","s","s","s","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g"],
  ["s","s","s","s","s","s","s","s","s","s","s","s","s","s","s","s","s","s","s","s","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g"]
  ];
  game.currentWindow = editorWindow;

  testEnt = new EntityLiving({ name: 'testEnt', x: 5, y: 5, sprites: characterSheet('characters/hoennpokemon',195,1290)});
  gengar = new EntityLiving({ name: 'gengar', x: 5, y: 4, sprites: characterSheet('characters/kantopokemon',325,774)});
  tilePicker = new TileSelector({ name: 'tilePicker', x: 0, y: 0});
  game.viewport.tracking = testEnt;

  game.on_tick.subscribe(function(){
    game.keyboard.poll();
  },false,false);
  game.drawFrame();
  game.tick();
  setInterval(function() {
    //game.menus.main.box.innerHTML = (Object.keys(game.entities).length+' entities<br>');
    //game.menus.main.box.innerHTML += (game.visible_entities+' visible<br>');
    //game.menus.main.box.innerHTML += (game.framesThisSecond+' fps<br>');
    //game.menus.main.box.innerHTML += (game.ticksThisSecond+' tps');
    game.actualFramesPerSecond = game.framesThisSecond;
    game.actualTicksPerSecond = game.ticksThisSecond;
    game.framesThisSecond = 0;
    game.ticksThisSecond = 0;
  },1000);
}

function tryToStart() {
  if(images.unloaded > 0) { setTimeout(tryToStart,100); }
  else { start(); }
}

preStart();
tryToStart();