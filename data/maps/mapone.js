mapone = new map('maps/map1');
new character({x: 9, y: 9, imageURL: 'raichu', name: 'player', aggro: 'controlled'});
new character({x: 13, y: 26, imageURL: 'venasaur', name: 'venasaur1', aggro: 'friendly'});
new character({x: 34, y: 30, imageURL: 'squirtle', name: 'squirtle1'});
new character({x: 30, y: 13, imageURL: 'bulbasaur', name: 'bulbasaur1'});
new character({x: 6, y: 22, imageURL: 'charmander', name: 'charmander1'});
new character({x: 6, y: 23, imageURL: 'charmander', name: 'charmander2', aggro: 'hostile', behavior: {style: 'follow', min: 2, max: 5, target: entities['player']}});
new character({x: 6, y: 24, imageURL: 'charmander', name: 'charmander3', aggro: 'friendly', behavior: {style: 'patrol', first: entities['venasaur1'], second: entities['player']}});