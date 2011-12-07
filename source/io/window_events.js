window.addEventListener('keydown', function(e) {
  game.menus.stats.box.innerHTML = entities['player'].x+','+entities['player'].y;
  game.keyboard.keymapping_temp[e.keyCode] = true;
});

window.addEventListener('keyup', function(e) {
  game.keyboard.keymapping_temp[e.keyCode] = false;
});

document.title = 'not paused';
window.addEventListener('focus', function() {
  document.title = 'not paused';
  game.paused = false;
});

window.addEventListener('blur', function() {
  document.title = 'paused';
  game.paused = true;
});
