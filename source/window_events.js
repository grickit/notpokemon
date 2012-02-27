//# CLEAN

// TODO: convert to Callback()s
window.addEventListener('keydown', function(e) {
  game.keyboard.keymapping_temp[e.keyCode] = true;
  //console.log('Key code: '+e.keyCode);
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
