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
  images.load('tiles/dirttograss');
  images.load('tiles/watertograss');
  images.load('tiles/sandtograss');
  images.load('tiles/sandtowater');
  images.load('tiles/hilltograss');
  images.load('tiles/tree');
  images.load('tiles/grass');
  images.load('tiles/tallgrass');
  images.load('tiles/tallgrass-overlay');
  images.load('tiles/redflower');
  images.load('tiles/hillstairs');
  images.load('characters/sign');
}

function start() {
  game.errorTile = new TileType({code: '_',sprite: new Sprite({ imageURL: '404' })});

  baseTileSet = new TileSet();
  baseTileSet.add({code: 'g',sprite: new Sprite({imageURL: 'tiles/grass'}),clipto: [true,true,true,true]});
  baseTileSet.add({code: 'd',sprite: new Sprite({imageURL: 'tiles/dirttograss',x: 17,y: 51})});

  tileTransitionSet(baseTileSet,'dg','tiles/dirttograss');
  tileTransitionSet(baseTileSet,'hg','tiles/hilltograss');

  baseTileSet.add({code: 'gfr',sprite: new Animation(
    [new Sprite({imageURL: 'tiles/redflower', x: 0, y: 0, duration: 700}),
    new Sprite({imageURL: 'tiles/redflower', x: 17, y: 0, duration: 700}),
    new Sprite({imageURL: 'tiles/redflower', x: 0, y: 0, duration: 700}),
    new Sprite({imageURL: 'tiles/redflower', x: 34, y: 0, duration: 700}),],
    {loop: true, paused: false})
  });
  baseTileSet.add({
    code: 'tt',
    sprite: new Sprite({imageURL: 'tiles/tree',x: 0,y: 16}),
    overlays: [ { z: 200, sprites: [ new Sprite({imageURL: 'tiles/tree', x: 0, y: 0, yoffset: -16}) ]} ]
  });

  game.editortile = 'd';


  for(var code in baseTileSet.tiles) {
    var tile = baseTileSet.tiles[code];
    game.menus.side.write('<a href="#" onclick="game.editortile=\''+code+'\'">'+code+'</a>');
  }


  mapone = new Map(14,12);
  game.currentMap = mapone;

  testEnt = new EntityLiving({ name: 'testEnt', x: 5, y: 5, sprites: characterSheet('characters/kantopokemon',715,1032)});
  gengar = new EntityLiving({ name: 'gengar', x: 5, y: 4, sprites: characterSheet('characters/kantopokemon',325,774)});
  game.viewport.tracking = testEnt;

  game.on_tick.subscribe(function(){
    game.keyboard.poll();
  },false,false);
  game.drawFrame();
  game.tick();
  setInterval(function() {
    game.menus.main.box.innerHTML = (Object.keys(game.entities).length+' entities<br>');
    game.menus.main.box.innerHTML += (game.visible_entities+' visible<br>');
    game.menus.main.box.innerHTML += (game.framesThisSecond+' fps<br>');
    game.menus.main.box.innerHTML += (game.ticksThisSecond+' tps');
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