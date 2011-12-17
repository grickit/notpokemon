var mapone;
var entities = new Array();
var sprites = new Array();

function preStart() {
  loadImages();
  loadData();
  loadCharacterSheets();
}

function start() {
  game.errorTile = new tileType({
    letter: 'e',
    name: 'error',
    color: '999,999,999,999',
    imageURL: 'tiles/e-tile'
  });

  for(name in data) {
    var newscript = document.createElement('script');
    newscript.type = 'text/javascript';
    newscript.innerHTML = data[name];
    var oldscript = document.getElementsByTagName('script')[0];
    oldscript.parentNode.insertBefore(newscript, oldscript);
  }

  game.viewport.tracking = entities['player'];

  setInterval(game.drawMap,game.framesPerSecond);
  setInterval(game.keyboard.poll,game.framesPerSecond);
  game.menus.main.scrollingWrite('Click the screen to move.');
  game.menus.main.scrollingWrite('Use the "f" key to guard the clicked location.');
  game.menus.main.scrollingWrite('Use the "p" key to patrol between the current location and the clicked one.');
  game.menus.context.scrollingWrite('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed justo urna, gravida nec consequat quis, vehicula tincidunt sem.');

  for (var name in sprites) {
      game.menus.stdout.write('<a href="#'+name+'" onClick="game.viewport.tracking.sprite = sprites[\''+name+'\']; entities[\'player\'].image = sprites[\''+name+'\'].image;">'+name+'</a>');
  }

  game.menus.entity_list.box.innerHTML = '';
  for(name in entities) {
    if(entities[name] instanceof character) {
      game.menus.entity_list.write('<a class="entity_listing" href="javascript:game.viewport.track(\''+name+'\');"> \
      <span id="entity'+name+'listing"></span> \
      <canvas id="entity'+name+'icon" width="32" height="32">',
      false);
    }
  }
}

function tryToStart() {
  if(unloaded_images > 0 || unloaded_data > 0) {
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
