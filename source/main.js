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
  images.load('maps/map1');
  images.load('maps/map1-2');
  images.load('maps/map1-3');
  images.load('characters/sign');
}

function start() {
  game.errorTile = new TileType({
    code: '_',
    sprite: new Sprite({
      imageURL: '404',
    }),
  });

  baseTileSet = new TileSet();
  baseTileSet.add({
    code: 'g',
    sprite: new Sprite({
      imageURL: 'tiles/grass',
    }),
    clipto: [true,true,true,true],
  });
  baseTileSet.add({
    code: 'r',
    sprite: new Sprite({
      imageURL: 'tiles/dirttograss',
      x: 17,
      y: 51,
    })
  });
  baseTileSet.add({
    code: 'gfr',
    sprite:
      new Animation(
	[
	  new Sprite({imageURL: 'tiles/redflower', x: 0, y: 0, duration: 700}),
	  new Sprite({imageURL: 'tiles/redflower', x: 17, y: 0, duration: 700}),
	  new Sprite({imageURL: 'tiles/redflower', x: 0, y: 0, duration: 700}),
	  new Sprite({imageURL: 'tiles/redflower', x: 34, y: 0, duration: 700}),
	],
	{loop: true, paused: false}
      )
  });


  mapone = new Map(14,12);
  game.currentMap = mapone;

  testEnt = new EntityLiving({ name: 'testEnt', x: 5, y: 5, sprites: characterSheet('characters/kantopokemon',780,1032)});
  game.viewport.tracking = testEnt;

  foo = new Animation([
    new Sprite({imageURL: 'characters/marker', x: 0, y: 0, duration: 150}),
    new Sprite({imageURL: 'characters/marker', x: 17, y: 0, duration: 150}),
    new Sprite({imageURL: 'characters/marker', x: 34, y: 0, duration: 150}),
    new Sprite({imageURL: 'characters/marker', x: 51, y: 0, duration: 150}),
  ],{loop: true});
  foo.autoplay();

  secondEnt = new EntityLiving({ name: 'secondEnt', x: 5, y: 5, sprites: [foo], z: 90});

  game.on_tick.subscribe(game.keyboard,'poll','',false);
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