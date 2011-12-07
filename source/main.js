var baseTileSet = new tileSet();
var mapone;
var entities = new Array();
var sprites = new Array();

function preStart() {
  loadImages();
  loadCharacterSheets();
}

function start() {
  game.errorTile = new tileType({
    letter: 'e',
    name: 'error',
    color: '999,999,999,999',
    imageURL: 'tiles/e-tile'
  });
  baseTileSet.add({
    letter: 'g',
    name: 'grass',
    color: '128,255,128,255',
    imageURL: 'tiles/g-tile',
    clip: [true,true,true,true]
  });
  baseTileSet.add({
    letter: 'w',
    name: 'water',
    color: '0,0,255,255',
    imageURL: 'tiles/w-tile',
    transitions:
      [ new tileSprite('tiles/new/water',0,0,16,16,   '(.+),(s),(.+),(s),(w),(.+),(.+),(.+),(.+)'),
      new tileSprite('tiles/new/water',32,0,16,16,  '(.+),(s),(.+),(.+),(w),(s),(.+),(.+),(.+)'),
      new tileSprite('tiles/new/water',0,32,16,16,  '(.+),(.+),(.+),(s),(w),(.+),(.+),(s),(.+)'),
      new tileSprite('tiles/new/water',32,32,16,16, '(.+),(.+),(.+),(.+),(w),(s),(.+),(s),(.+)'),

      new tileSprite('tiles/new/water',48,16,16,16,   '(.+),(w),(s),(.+),(w),(w),(.+),(.+),(.+)'),
      new tileSprite('tiles/new/water',64,0,16,16,   '(.+),(.+),(.+),(w),(w),(.+),(s),(w),(.+)'),
      new tileSprite('tiles/new/water',64,16,16,16,   '(s),(w),(.+),(w),(w),(.+),(.+),(.+),(.+)'),
      new tileSprite('tiles/new/water',48,0,16,16,   '(.+),(.+),(.+),(.+),(w),(w),(.+),(w),(s)'),

      new tileSprite('tiles/new/water',16,0,16,16,   '(.+),(s),(.+),(.+),(w),(.+),(.+),(.+),(.+)'),
      new tileSprite('tiles/new/water',16,32,16,16,   '(.+),(.+),(.+),(.+),(w),(.+),(.+),(s),(.+)'),
      new tileSprite('tiles/new/water',0,16,16,16,   '(.+),(.+),(.+),(s),(w),(.+),(.+),(.+),(.+)'),
      new tileSprite('tiles/new/water',32,16,16,16,   '(.+),(.+),(.+),(.+),(w),(s),(.+),(.+),(.+)'),

      new tileSprite('tiles/new/water',16,16,16,16, '(.+),(.+),(.+),(.+),(w),(.+),(.+),(.+),(.+)') ]
  });
  baseTileSet.add({
    letter: 's',
    name: 'sand',
    color: '255,255,0,255',
    imageURL: 'tiles/s-tile',
    clip: [true,true,true,true],
    transitions:
      [ new tileSprite('tiles/new/sand',0,0,16,16,   '(.+),(g|d|gg|T),(.+),(g|d|gg|T),(s),(.+),(.+),(.+),(.+)'),
      new tileSprite('tiles/new/sand',32,0,16,16,  '(.+),(g|d|gg|T),(.+),(.+),(s),(g|d|gg|T),(.+),(.+),(.+)'),
      new tileSprite('tiles/new/sand',0,32,16,16,  '(.+),(.+),(.+),(g|d|gg|T),(s),(.+),(.+),(g|d|gg|T),(.+)'),
      new tileSprite('tiles/new/sand',32,32,16,16, '(.+),(.+),(.+),(.+),(s),(g|d|gg|T),(.+),(g|d|gg|T),(.+)'),

      new tileSprite('tiles/new/sand',48,16,16,16,   '(.+),(s),(g|d|gg|T),(.+),(s),(s),(.+),(.+),(.+)'),
      new tileSprite('tiles/new/sand',64,0,16,16,   '(.+),(.+),(.+),(s),(s),(.+),(g|d|gg|T),(s),(.+)'),
      new tileSprite('tiles/new/sand',64,16,16,16,   '(g|d|gg|T),(s),(.+),(s),(s),(.+),(.+),(.+),(.+)'),
      new tileSprite('tiles/new/sand',48,0,16,16,   '(.+),(.+),(.+),(.+),(s),(s),(.+),(s),(g|d|gg|T)'),

      new tileSprite('tiles/new/sand',16,0,16,16,   '(.+),(g|d|gg|T),(.+),(.+),(s),(.+),(.+),(.+),(.+)'),
      new tileSprite('tiles/new/sand',16,32,16,16,   '(.+),(.+),(.+),(.+),(s),(.+),(.+),(g|d|gg|T),(.+)'),
      new tileSprite('tiles/new/sand',0,16,16,16,   '(.+),(.+),(.+),(g|d|gg|T),(s),(.+),(.+),(.+),(.+)'),
      new tileSprite('tiles/new/sand',32,16,16,16,   '(.+),(.+),(.+),(.+),(s),(g|d|gg|T),(.+),(.+),(.+)'),

      new tileSprite('tiles/new/sand',16,16,16,16, '(.+),(.+),(.+),(.+),(s),(.+),(.+),(.+),(.+)') ]
  });
  baseTileSet.add({
    letter: 'd',
    name: 'dirt',
    color: '128,64,0,255',
    imageURL: 'tiles/d-tile',
    clip: [true,true,true,true],
    transitions:
      [ new tileSprite('tiles/new/dirt',0,0,16,16,   '(.+),(g|gg|T|s|w),(.+),(g|gg|T|s|w),(d),(.+),(.+),(.+),(.+)'),
      new tileSprite('tiles/new/dirt',32,0,16,16,  '(.+),(g|gg|T|s|w),(.+),(.+),(d),(g|gg|T|s|w),(.+),(.+),(.+)'),
      new tileSprite('tiles/new/dirt',0,32,16,16,  '(.+),(.+),(.+),(g|gg|T|s|w),(d),(.+),(.+),(g|gg|T|s|w),(.+)'),
      new tileSprite('tiles/new/dirt',32,32,16,16, '(.+),(.+),(.+),(.+),(d),(g|gg|T|s|w),(.+),(g|gg|T|s|w),(.+)'),

      new tileSprite('tiles/new/dirt',48,16,16,16,   '(.+),(d),(g|gg|T|s|w),(.+),(d),(d),(.+),(.+),(.+)'),
      new tileSprite('tiles/new/dirt',64,0,16,16,   '(.+),(.+),(.+),(d),(d),(.+),(g|gg|T|s|w),(d),(.+)'),
      new tileSprite('tiles/new/dirt',64,16,16,16,   '(g|gg|T|s|w),(d),(.+),(d),(d),(.+),(.+),(.+),(.+)'),
      new tileSprite('tiles/new/dirt',48,0,16,16,   '(.+),(.+),(.+),(.+),(d),(d),(.+),(d),(g|gg|T|s|w)'),

      new tileSprite('tiles/new/dirt',16,0,16,16,   '(.+),(g|gg|T|s|w),(.+),(.+),(d),(.+),(.+),(.+),(.+)'),
      new tileSprite('tiles/new/dirt',16,32,16,16,   '(.+),(.+),(.+),(.+),(d),(.+),(.+),(g|gg|T|s|w),(.+)'),
      new tileSprite('tiles/new/dirt',0,16,16,16,   '(.+),(.+),(.+),(g|gg|T|s|w),(d),(.+),(.+),(.+),(.+)'),
      new tileSprite('tiles/new/dirt',32,16,16,16,   '(.+),(.+),(.+),(.+),(d),(g|gg|T|s|w),(.+),(.+),(.+)'),

      new tileSprite('tiles/new/dirt',16,16,16,16, '(.+),(.+),(.+),(.+),(d),(.+),(.+),(.+),(.+)') ]
  });
  baseTileSet.add({
    letter: 'r',
    name: 'road',
    color: '128,128,128,255',
    imageURL: 'tiles/r-tile',
    clip: [true,true,true,true]
  });
  baseTileSet.add({
    letter: 'T',
    name: 'tree',
    color: '0,128,0,255',
    imageURL: 'tiles/tb-tile',
    overlays:
      [ new tileOverlay('tiles/tt-tile-overlay',undefined,-1) ]
  });
  baseTileSet.add({
    letter: 'gg',
    name: 'tree',
    color: '0,255,0,255',
    imageURL: 'tiles/gg-tile',
    clip: [true,true,true,true],
    overlays:
      [ new tileOverlay('tiles/gg-tile-overlay',undefined,undefined,false) ]
  });

  mapone = new map('maps/map1');

  if(document.location.hash == '') {
    entities['player'] = new character(9,7,'raichu');
  }
  else {
    entities['player'] = new character(9,7,document.location.hash.substring(1));
    console.log(document.location.hash);
  }
  entities['npc1'] = new character(9,8,'bulbasaur');
  entities['npc1'].tick();
  entities['npc2'] = new character(5,4,'ivysaur');
  entities['npc2'].tick();
  entities['npc3'] = new character(31,54,'venasaur');
  entities['npc3'].tick();

  game.viewport.clear();
  setInterval(game.drawMap,game.framesPerSecond);
  setInterval(game.keyboard.poll,game.framesPerSecond);
  game.menus.main.scrollingWrite('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed justo urna, gravida nec consequat quis, vehicula tincidunt sem. Pellentesque neque purus, fringilla in dignissim vitae.');
  game.menus.context.scrollingWrite('Use the arrow keys to move.');
  game.menus.context.scrollingWrite('For now you can click the links below to preview the different available character models');

  for (var name in sprites) {
    game.menus.stdout.write('<a href="#'+name+'" onClick="entities[\'player\'].sprite = sprites[\''+name+'\']; entities[\'player\'].image = sprites[\''+name+'\'].image;">'+name+'</a>');
  }
}

function tryToStart() {
  if(unloaded_images > 0) {
    setTimeout(tryToStart,100);
  }
  else {
    game.menus.stdout.write('Ready...');
    game.menus.stdout.write('Run');
    start();
  }
}
game.menus.stdout.write('Loading...');
preStart();
tryToStart();