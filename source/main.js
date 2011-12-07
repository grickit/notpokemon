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
      [ new tileSprite({imageURL: 'tiles/new/water', x: 0, y: 0, width: 16, height: 16, condition: '(.+),(s),(.+),(s),(w),(.+),(.+),(.+),(.+)'}),
      new tileSprite({imageURL: 'tiles/new/water', x: 32, y: 0, width: 16, height: 16, condition:  '(.+),(s),(.+),(.+),(w),(s),(.+),(.+),(.+)'}),
      new tileSprite({imageURL: 'tiles/new/water', x: 0, y: 32, width: 16, height: 16, condition:  '(.+),(.+),(.+),(s),(w),(.+),(.+),(s),(.+)'}),
      new tileSprite({imageURL: 'tiles/new/water', x: 32, y: 32, width: 16, height: 16, condition: '(.+),(.+),(.+),(.+),(w),(s),(.+),(s),(.+)'}),

      new tileSprite({imageURL: 'tiles/new/water', x: 48, y: 16, width: 16, height: 16, condition: '(.+),(w),(s),(.+),(w),(w),(.+),(.+),(.+)'}),
      new tileSprite({imageURL: 'tiles/new/water', x: 64, y: 0, width: 16, height: 16, condition:  '(.+),(.+),(.+),(w),(w),(.+),(s),(w),(.+)'}),
      new tileSprite({imageURL: 'tiles/new/water', x: 64, y: 16, width: 16, height: 16, condition: '(s),(w),(.+),(w),(w),(.+),(.+),(.+),(.+)'}),
      new tileSprite({imageURL: 'tiles/new/water', x: 48, y: 0, width: 16, height: 16, condition:  '(.+),(.+),(.+),(.+),(w),(w),(.+),(w),(s)'}),

      new tileSprite({imageURL: 'tiles/new/water', x: 16, y: 0, width: 16, height: 16, condition:  '(.+),(s),(.+),(.+),(w),(.+),(.+),(.+),(.+)'}),
      new tileSprite({imageURL: 'tiles/new/water', x: 16, y: 32, width: 16, height: 16, condition: '(.+),(.+),(.+),(.+),(w),(.+),(.+),(s),(.+)'}),
      new tileSprite({imageURL: 'tiles/new/water', x: 0, y: 16, width: 16, height: 16, condition:  '(.+),(.+),(.+),(s),(w),(.+),(.+),(.+),(.+)'}),
      new tileSprite({imageURL: 'tiles/new/water', x: 32, y: 16, width: 16, height: 16, condition: '(.+),(.+),(.+),(.+),(w),(s),(.+),(.+),(.+)'}),

      new tileSprite({imageURL: 'tiles/new/water', x: 16, y: 16, width: 16, height: 16, condition: '(.+),(.+),(.+),(.+),(w),(.+),(.+),(.+),(.+)'}) ]
  });
  baseTileSet.add({
    letter: 's',
    name: 'sand',
    color: '255,255,0,255',
    imageURL: 'tiles/s-tile',
    clip: [true,true,true,true],
    transitions:
      [ new tileSprite({imageURL: 'tiles/new/sand', x: 0, y: 0, width: 16, height: 16, condition: '(.+),(g|d|gg|T),(.+),(g|d|gg|T),(s),(.+),(.+),(.+),(.+)'}),
      new tileSprite({imageURL: 'tiles/new/sand', x: 32, y: 0, width: 16, height: 16, condition:  '(.+),(g|d|gg|T),(.+),(.+),(s),(g|d|gg|T),(.+),(.+),(.+)'}),
      new tileSprite({imageURL: 'tiles/new/sand', x: 0, y: 32, width: 16, height: 16, condition:  '(.+),(.+),(.+),(g|d|gg|T),(s),(.+),(.+),(g|d|gg|T),(.+)'}),
      new tileSprite({imageURL: 'tiles/new/sand', x: 32, y: 32, width: 16, height: 16, condition: '(.+),(.+),(.+),(.+),(s),(g|d|gg|T),(.+),(g|d|gg|T),(.+)'}),

      new tileSprite({imageURL: 'tiles/new/sand', x: 48, y: 16, width: 16, height: 16, condition: '(.+),(s),(g|d|gg|T),(.+),(s),(s),(.+),(.+),(.+)'}),
      new tileSprite({imageURL: 'tiles/new/sand', x: 64, y: 0, width: 16, height: 16, condition:  '(.+),(.+),(.+),(s),(s),(.+),(g|d|gg|T),(s),(.+)'}),
      new tileSprite({imageURL: 'tiles/new/sand', x: 64, y: 16, width: 16, height: 16, condition: '(g|d|gg|T),(s),(.+),(s),(s),(.+),(.+),(.+),(.+)'}),
      new tileSprite({imageURL: 'tiles/new/sand', x: 48, y: 0, width: 16, height: 16, condition:  '(.+),(.+),(.+),(.+),(s),(s),(.+),(s),(g|d|gg|T)'}),

      new tileSprite({imageURL: 'tiles/new/sand', x: 16, y: 0, width: 16, height: 16, condition:   '(.+),(g|d|gg|T),(.+),(.+),(s),(.+),(.+),(.+),(.+)'}),
      new tileSprite({imageURL: 'tiles/new/sand', x: 16, y: 32, width: 16, height: 16, condition:  '(.+),(.+),(.+),(.+),(s),(.+),(.+),(g|d|gg|T),(.+)'}),
      new tileSprite({imageURL: 'tiles/new/sand', x: 0, y: 16, width: 16, height: 16, condition:   '(.+),(.+),(.+),(g|d|gg|T),(s),(.+),(.+),(.+),(.+)'}),
      new tileSprite({imageURL: 'tiles/new/sand', x: 32, y: 16, width: 16, height: 16, condition:  '(.+),(.+),(.+),(.+),(s),(g|d|gg|T),(.+),(.+),(.+)'}),

      new tileSprite({imageURL: 'tiles/new/sand', x: 16, y: 16, width: 16, height: 16, condition:  '(.+),(.+),(.+),(.+),(s),(.+),(.+),(.+),(.+)'}) ]
  });
  baseTileSet.add({
    letter: 'd',
    name: 'dirt',
    color: '128,64,0,255',
    imageURL: 'tiles/d-tile',
    clip: [true,true,true,true],
    transitions:
      [ new tileSprite({imageURL: 'tiles/new/dirt', x: 0, y: 0, width: 16, height: 16, condition:  '(.+),(g|gg|T|s|w),(.+),(g|gg|T|s|w),(d),(.+),(.+),(.+),(.+)'}),
      new tileSprite({imageURL: 'tiles/new/dirt', x: 32, y: 0, width: 16, height: 16, condition:   '(.+),(g|gg|T|s|w),(.+),(.+),(d),(g|gg|T|s|w),(.+),(.+),(.+)'}),
      new tileSprite({imageURL: 'tiles/new/dirt', x: 0, y: 32, width: 16, height: 16, condition:   '(.+),(.+),(.+),(g|gg|T|s|w),(d),(.+),(.+),(g|gg|T|s|w),(.+)'}),
      new tileSprite({imageURL: 'tiles/new/dirt', x: 32, y: 32, width: 16, height: 16, condition:  '(.+),(.+),(.+),(.+),(d),(g|gg|T|s|w),(.+),(g|gg|T|s|w),(.+)'}),

      new tileSprite({imageURL: 'tiles/new/dirt', x: 48, y: 16, width: 16, height: 16, condition:  '(.+),(d),(g|gg|T|s|w),(.+),(d),(d),(.+),(.+),(.+)'}),
      new tileSprite({imageURL: 'tiles/new/dirt', x: 64, y: 0, width: 16, height: 16, condition:   '(.+),(.+),(.+),(d),(d),(.+),(g|gg|T|s|w),(d),(.+)'}),
      new tileSprite({imageURL: 'tiles/new/dirt', x: 64, y: 16, width: 16, height: 16, condition:  '(g|gg|T|s|w),(d),(.+),(d),(d),(.+),(.+),(.+),(.+)'}),
      new tileSprite({imageURL: 'tiles/new/dirt', x: 48, y: 0, width: 16, height: 16, condition:   '(.+),(.+),(.+),(.+),(d),(d),(.+),(d),(g|gg|T|s|w)'}),

      new tileSprite({imageURL: 'tiles/new/dirt', x: 16, y: 0, width: 16, height: 16, condition:   '(.+),(g|gg|T|s|w),(.+),(.+),(d),(.+),(.+),(.+),(.+)'}),
      new tileSprite({imageURL: 'tiles/new/dirt', x: 16, y: 32, width: 16, height: 16, condition:  '(.+),(.+),(.+),(.+),(d),(.+),(.+),(g|gg|T|s|w),(.+)'}),
      new tileSprite({imageURL: 'tiles/new/dirt', x: 0, y: 16, width: 16, height: 16, condition:   '(.+),(.+),(.+),(g|gg|T|s|w),(d),(.+),(.+),(.+),(.+)'}),
      new tileSprite({imageURL: 'tiles/new/dirt', x: 32, y: 16, width: 16, height: 16, condition:  '(.+),(.+),(.+),(.+),(d),(g|gg|T|s|w),(.+),(.+),(.+)'}),

      new tileSprite({imageURL: 'tiles/new/dirt', x: 16, y: 16, width: 16, height: 16, condition:  '(.+),(.+),(.+),(.+),(d),(.+),(.+),(.+),(.+)'}) ]
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