function preStart() {
  game.terminal = new outputBox('terminal','Standard Output',5);
  game.terminal.write('Output started.');
  game.terminal.write('Creating the rest of the output boxes.');

  game.terminal.write('Loading images.');
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
  game.errorTile = new tileType({
    letter: '_',
    name: 'error',
    color: '999,999,999,999',
  });

  baseTileSet = new tileSet;
  baseTileSet.add({
    letter: 'g',
    name: 'grass',
    color: '128,255,128,255',
    clipto: [true,true,true,true],
    transitions: [ new sprite({imageURL: 'tiles/grass', x: 0, y: 0, width: 16, height: 16, condition: '(.+),(.+),(.+),(.+),(g),(.+),(.+),(.+),(.+)'}) ]
  });
  baseTileSet.add({
    letter: 'w',
    name: 'water',
    color: '0,0,255,255',
    transitions: simpleTileSpriteSet('tiles/watertograss','(w)','(g|d)').concat(simpleTileSpriteSetEnd('tiles/watertograss','(w)'))
  });
  baseTileSet.add({
    letter: 's',
    name: 'sand',
    color: '255,255,0,255',
    clipto: [true,true,true,true],
    transitions: simpleTileSpriteSet('tiles/sandtograss','(s)','(g)').concat(simpleTileSpriteSet('tiles/sandtowater','(s)','(w)')).concat(simpleTileSpriteSetEnd('tiles/sandtograss','(s)'))
  });
  baseTileSet.add({
    letter: 'd',
    name: 'dirt',
    color: '128,64,0,255',
    clipto: [true,true,true,true],
    transitions: simpleTileSpriteSet('tiles/dirttograss','(d)','(w|g|s|h)').concat(simpleTileSpriteSetEnd('tiles/dirttograss','(d)'))
  });
  baseTileSet.add({
    letter: 'h',
    name: 'hill',
    color: '128,128,0,255',
    transitions: [
      new sprite({imageURL: 'tiles/hilltograss', x: 0, y: 34, width: 16, height: 16, condition: '(.+),(g|s|d),(.+),(g|s|d),(h),(.+),(.+),(.+),(.+)'}), // Top left corner
      new sprite({imageURL: 'tiles/hilltograss', x: 34, y: 34, width: 16, height: 16, condition:     '(.+),(g|s|d),(.+),(.+),(h),(g|s|d),(.+),(.+),(.+)'}), // Top right corner
      new sprite({imageURL: 'tiles/hilltograss', x: 0, y: 68, width: 16, height: 16, condition:      '(.+),(.+),(.+),(g|s|d),(h),(.+),(.+),(g|s|d),(.+)'}), // Bottom left corner
      new sprite({imageURL: 'tiles/hilltograss', x: 34, y: 68, width: 16, height: 16, condition:     '(.+),(.+),(.+),(.+),(h),(g|s|d),(.+),(g|s|d),(.+)'}), // Bottom right corner

      new sprite({imageURL: 'tiles/hilltograss', x: 17, y: 17, width: 16, height: 16, condition:  '(.+),(.+),(.+),(h),(h),(.+),(g|s|d),(h),(.+)'}), // Bottom right corner
      new sprite({imageURL: 'tiles/hilltograss', x: 34, y: 17, width: 16, height: 16, condition:  '(.+),(.+),(.+),(.+),(h),(h),(.+),(h),(g|s|d)'}), // Bottom left corner

      new sprite({imageURL: 'tiles/hilltograss', x: 17, y: 34, width: 16, height: 16, condition: '(.+),(g|s|d),(.+),(.+),(h),(.+),(.+),(.+),(.+)'}), // Top side
      new sprite({imageURL: 'tiles/hilltograss', x: 17, y: 68, width: 16, height: 16, condition: '(.+),(.+),(.+),(.+),(h),(.+),(.+),(g|s|d),(.+)'}), // Bottom side
      new sprite({imageURL: 'tiles/hilltograss', x: 0, y: 51, width: 16, height: 16, condition:  '(.+),(.+),(.+),(g|s|d),(h),(.+),(.+),(.+),(.+)'}), // Left side
      new sprite({imageURL: 'tiles/hilltograss', x: 34, y: 51, width: 16, height: 16, condition: '(.+),(.+),(.+),(.+),(h),(g|s|d),(.+),(.+),(.+)'}), // Right side
    ].concat(simpleTileSpriteSetEnd('tiles/hilltograss','(h)'))
  });
  baseTileSet.add({
    letter: 'hs',
    name: 'hillstairs',
    color: '255,0,0,255',
    clipto: [true,true,true,true],
    transitions: [ new sprite({imageURL: 'tiles/hillstairs', x: 17, y: 0, width: 16, height: 16, condition: '(.+),(.+),(.+),(hs),(hs),(hs),(.+),(.+),(.+)'}),
      new sprite({imageURL: 'tiles/hillstairs', x: 0, y: 0, width: 16, height: 16, condition: '(.+),(.+),(.+),(.+),(hs),(hs),(.+),(.+),(.+)'}),
      new sprite({imageURL: 'tiles/hillstairs', x: 34, y: 0, width: 16, height: 16, condition: '(.+),(.+),(.+),(hs),(hs),(.+),(.+),(.+),(.+)'}),
      new sprite({imageURL: 'tiles/hillstairs', x: 51, y: 0, width: 16, height: 16, condition: '(.+),(.+),(.+),(.+),(hs),(.+),(.+),(.+),(.+)'}),
    ]
  });
  baseTileSet.add({
    letter: 'T',
    group: 'g',
    name: 'tree',
    color: '0,128,0,255',
    transitions:
      [ new sprite({imageURL: 'tiles/tree', y: 16}) ],
    overlays:
      [ {ticks: false, sprites: [new sprite({imageURL: 'tiles/tree', yoffset: -16})], z: 200} ],
  });
  baseTileSet.add({
    letter: 'gg',
    group: 'g',
    name: 'tallgrass',
    color: '0,255,0,255',
    clipto: [true,true,true,true],
    transitions:
      [ new sprite({imageURL: 'tiles/tallgrass'}) ],
    overlays:
      [ {ticks: false, sprites: [new sprite({imageURL: 'tiles/tallgrass-overlay'})], z: 110} ]
  });
  baseTileSet.add({
    letter: 'gfr',
    group: 'g',
    name: 'redflower',
    color: '128,0,0,255',
    clipto: [true,true,true,true],
    transitions:
      [ new sprite({imageURL: 'tiles/grass'}) ],
    overlays: [
      {ticks: false, sprites: [new animation([
	new sprite({imageURL: 'tiles/redflower', x: 0, y: 0, duration: 700}),
	new sprite({imageURL: 'tiles/redflower', x: 17, y: 0, duration: 700}),
	new sprite({imageURL: 'tiles/redflower', x: 0, y: 0, duration: 700}),
	new sprite({imageURL: 'tiles/redflower', x: 34, y: 0, duration: 700}),
      ],{loop: true})], z: 0}
    ]
  });
  baseTileSet.tilesByLetter['gfr'].overlays[0].sprites[0].autoplay();

  mapone = new map('maps/map1',['maps/map1-2','maps/map1-3']);
  game.currentMap = mapone;

  testEnt = new EntityLiving({ name: 'testEnt', x: 41, y: 25, sprites: characterSheet('characters/kantopokemon',780,1032)});
  game.viewport.tracking = testEnt;

  foo = new animation([
    new sprite({imageURL: 'characters/marker', x: 0, y: 0, duration: 150}),
    new sprite({imageURL: 'characters/marker', x: 17, y: 0, duration: 150}),
    new sprite({imageURL: 'characters/marker', x: 34, y: 0, duration: 150}),
    new sprite({imageURL: 'characters/marker', x: 51, y: 0, duration: 150}),
  ],{loop: true});
  foo.autoplay();

  secondEnt = new EntityLiving({ name: 'secondEnt', x: 41, y: 28, sprites: [foo], z: 90});

  game.ontick.subscribe(game.keyboard,'poll','',false);
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