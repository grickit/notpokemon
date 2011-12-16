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

  baseTileSet.init();
  mapone = new map('maps/map1');

  if(document.location.hash == '') {
    new character({x: 9, y: 9, imageURL: 'raichu', name: 'player', aggro: 'controlled'});
  }
  else {
    new character({x: 9, y: 9, imageURL: document.location.hash.substring(1), name: 'player', aggro: 'controlled'});
    console.log(document.location.hash);
  }
  game.viewport.tracking = entities['player'];
  new character({x: 13, y: 26, imageURL: 'venasaur', name: 'venasaur1', aggro: 'friendly'});
  new character({x: 34, y: 30, imageURL: 'squirtle', name: 'squirtle1'});
  new character({x: 30, y: 13, imageURL: 'bulbasaur', name: 'bulbasaur1'});
  new character({x: 6, y: 22, imageURL: 'charmander', name: 'charmander1'});
  new character({x: 6, y: 23, imageURL: 'charmander', name: 'charmander2', aggro: 'hostile', behavior: {style: 'follow', min: 2, max: 5, target: entities['player']}});
  new character({x: 6, y: 24, imageURL: 'charmander', name: 'charmander3', aggro: 'friendly', behavior: {style: 'patrol', first: entities['venasaur1'], second: entities['player']}});

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
