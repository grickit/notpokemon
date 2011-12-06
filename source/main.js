var baseTileSet = new tileSet();
var mapone;
var entities = new Array();
var sprites = new Array();

function preStart() {
  loadImages();
  loadCharacterSheets();
}

function start() {
  game.errorTile = new tileType('e','error','999,999,999,999','tiles/e-tile');
  baseTileSet.add('g','grass','128,255,128,255','tiles/g-tile',[true,true,true,true]);
  baseTileSet.add('w','water','0,0,255,255','tiles/w-tile',undefined,undefined,[
    new tileSprite('tiles/new/water',0,0,16,16,   '(.+),(s),(.+),(s),(w),(.+),(.+),(.+),(.+)'),
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

    new tileSprite('tiles/new/water',16,16,16,16, '(.+),(.+),(.+),(.+),(w),(.+),(.+),(.+),(.+)')
  ]
  );
  baseTileSet.add('s','sand','255,255,0,255','tiles/s-tile',[true,true,true,true],undefined,[
    new tileSprite('tiles/new/sand',0,0,16,16,   '(.+),(g|d|gg|T),(.+),(g|d|gg|T),(s),(.+),(.+),(.+),(.+)'),
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

    new tileSprite('tiles/new/sand',16,16,16,16, '(.+),(.+),(.+),(.+),(s),(.+),(.+),(.+),(.+)')
  ]
  );
  baseTileSet.add('d','dirt','128,64,0,255','tiles/d-tile',[true,true,true,true],undefined,[
    new tileSprite('tiles/new/dirt',0,0,16,16,   '(.+),(g|gg|T|s|w),(.+),(g|gg|T|s|w),(d),(.+),(.+),(.+),(.+)'),
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

    new tileSprite('tiles/new/dirt',16,16,16,16, '(.+),(.+),(.+),(.+),(d),(.+),(.+),(.+),(.+)')
  ]
  );
  baseTileSet.add('r','road','128,128,128,255','tiles/r-tile',[true,true,true,true]);
  baseTileSet.add('T','tree','0,128,0,255','tiles/tb-tile',undefined,[new tileOverlay('tiles/tt-tile-overlay',undefined,-1)]);
  baseTileSet.add('gg','tree','0,255,0,255','tiles/gg-tile',[true,true,true,true],[new tileOverlay('tiles/gg-tile-overlay',undefined,undefined,false)]);

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
  entities['npc3'] = new character(21,13,'venasaur');
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