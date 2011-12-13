function loadImages() {
  preloadImage('tiles/e-tile');
  preloadImage('tiles/g-tile');
  preloadImage('tiles/w-tile');
  preloadImage('tiles/s-tile');
  preloadImage('tiles/d-tile');
  preloadImage('tiles/r-tile');
  preloadImage('tiles/tb-tile');
  preloadImage('tiles/tt-tile-overlay');
  preloadImage('tiles/gg-tile');
  preloadImage('tiles/gg-tile-overlay');
  preloadImage('maps/map1');
  preloadImage('characters/kantopokemon');
  preloadImage('characters/johtopokemon');
  preloadImage('tiles/new/water');
  preloadImage('tiles/new/sand');
  preloadImage('tiles/new/dirt');
  preloadImage('tiles/new/hill');
  preloadImage('characters/marker');
  preloadImage('characters/marker2');
  preloadImage('characters/marker3');
}

function loadCharacterSheets() {
  // ----- SPRITES: kanto: {
  sprites['bulbasaur'] = easyCharacterSheet('kanto',0,0);
  sprites['ivysaur'] = easyCharacterSheet('kanto',1,0);
  sprites['venasaur'] = easyCharacterSheet('kanto',2,0);
  sprites['venasaur_female'] = easyCharacterSheet('kanto',3,0);
  sprites['charmander'] = easyCharacterSheet('kanto',4,0);
  sprites['charmeleon'] = easyCharacterSheet('kanto',5,0);
  sprites['charizard'] = easyCharacterSheet('kanto',6,0);
  sprites['squirtle'] = easyCharacterSheet('kanto',7,0);
  sprites['warturtle'] = easyCharacterSheet('kanto',8,0);
  sprites['blastoise'] = easyCharacterSheet('kanto',9,0);
  sprites['caterpie'] = easyCharacterSheet('kanto',10,0);
  sprites['metapod'] = easyCharacterSheet('kanto',11,0);
  sprites['butterfree'] = easyCharacterSheet('kanto',12,0);
  sprites['weedle'] = easyCharacterSheet('kanto',13,0);
  sprites['kakuna'] = easyCharacterSheet('kanto',14,0);

  sprites['beedrill'] = easyCharacterSheet('kanto',0,1);
  sprites['pidgey'] = easyCharacterSheet('kanto',1,1);
  sprites['pigeotto'] = easyCharacterSheet('kanto',2,1);
  sprites['pigeot'] = easyCharacterSheet('kanto',3,1);
  sprites['ratatata'] = easyCharacterSheet('kanto',4,1);
  sprites['raticate'] = easyCharacterSheet('kanto',5,1);
  sprites['spearow'] = easyCharacterSheet('kanto',6,1);
  sprites['fearow'] = easyCharacterSheet('kanto',7,1);
  sprites['ekans'] = easyCharacterSheet('kanto',8,1);
  sprites['arbok'] = easyCharacterSheet('kanto',9,1);
  sprites['pikachu'] = easyCharacterSheet('kanto',10,1);
  sprites['pikachu_female'] = easyCharacterSheet('kanto',11,1);
  sprites['raichu'] = easyCharacterSheet('kanto',12,1);
  sprites['sandshrew'] = easyCharacterSheet('kanto',13,1);
  sprites['sandslash'] = easyCharacterSheet('kanto',14,1);

  sprites['nidoran_female'] = easyCharacterSheet('kanto',0,2);
  sprites['nidorina'] = easyCharacterSheet('kanto',1,2);
  sprites['nidoqueen'] = easyCharacterSheet('kanto',2,2);
  sprites['nidoran'] = easyCharacterSheet('kanto',3,2);
  sprites['nidorino'] = easyCharacterSheet('kanto',4,2);
  sprites['nidoking'] = easyCharacterSheet('kanto',5,2);
  sprites['clefairy'] = easyCharacterSheet('kanto',6,2);
  sprites['clefable'] = easyCharacterSheet('kanto',7,2);
  sprites['vulpix'] = easyCharacterSheet('kanto',8,2);
  sprites['ninetails'] = easyCharacterSheet('kanto',9,2);
  sprites['jigglypuff'] = easyCharacterSheet('kanto',10,2);
  sprites['wigglytuff'] = easyCharacterSheet('kanto',11,2);
  sprites['zubat'] = easyCharacterSheet('kanto',12,2);
  sprites['golbat'] = easyCharacterSheet('kanto',13,2);
  sprites['oddish'] = easyCharacterSheet('kanto',14,2);

  sprites['gloom'] = easyCharacterSheet('kanto',0,3);
  sprites['vileplume'] = easyCharacterSheet('kanto',1,3);
  sprites['paras'] = easyCharacterSheet('kanto',2,3);
  sprites['parasect'] = easyCharacterSheet('kanto',3,3);
  sprites['venonat'] = easyCharacterSheet('kanto',4,3);
  sprites['venomoth'] = easyCharacterSheet('kanto',5,3);
  sprites['diglett'] = easyCharacterSheet('kanto',6,3);
  sprites['dugtrio'] = easyCharacterSheet('kanto',7,3);
  sprites['meowth'] = easyCharacterSheet('kanto',8,3);
  sprites['persian'] = easyCharacterSheet('kanto',9,3);
  sprites['psyduck'] = easyCharacterSheet('kanto',10,3);
  sprites['golduck'] = easyCharacterSheet('kanto',11,3);
  sprites['mankey'] = easyCharacterSheet('kanto',12,3);
  sprites['primape'] = easyCharacterSheet('kanto',13,3);
  sprites['growlithe'] = easyCharacterSheet('kanto',14,3);

  sprites['arcanine'] = easyCharacterSheet('kanto',0,4);
  sprites['poliwag'] = easyCharacterSheet('kanto',1,4);
  sprites['poliwhirl'] = easyCharacterSheet('kanto',2,4);
  sprites['poliwrath'] = easyCharacterSheet('kanto',3,4);
  sprites['abra'] = easyCharacterSheet('kanto',4,4);
  sprites['kadabra'] = easyCharacterSheet('kanto',5,4);
  sprites['alakazam'] = easyCharacterSheet('kanto',6,4);
  sprites['machop'] = easyCharacterSheet('kanto',7,4);
  sprites['machoke'] = easyCharacterSheet('kanto',8,4);
  sprites['machamp'] = easyCharacterSheet('kanto',9,4);
  sprites['bellsprout'] = easyCharacterSheet('kanto',10,4);
  sprites['weepinbell'] = easyCharacterSheet('kanto',11,4);
  sprites['victreebell'] = easyCharacterSheet('kanto',12,4);
  sprites['tentacool'] = easyCharacterSheet('kanto',13,4);
  sprites['tentacruel'] = easyCharacterSheet('kanto',14,4);

  sprites['geodude'] = easyCharacterSheet('kanto',0,5);
  sprites['graveler'] = easyCharacterSheet('kanto',1,5);
  sprites['golem'] = easyCharacterSheet('kanto',2,5);
  sprites['ponyta'] = easyCharacterSheet('kanto',3,5);
  sprites['rapidash'] = easyCharacterSheet('kanto',4,5);
  sprites['slowpoke'] = easyCharacterSheet('kanto',5,5);
  sprites['slowbro'] = easyCharacterSheet('kanto',6,5);
  sprites['magnemite'] = easyCharacterSheet('kanto',7,5);
  sprites['magneton'] = easyCharacterSheet('kanto',8,5);
  sprites['farfetchd'] = easyCharacterSheet('kanto',9,5);
  sprites['doduo'] = easyCharacterSheet('kanto',10,5);
  sprites['dodrio'] = easyCharacterSheet('kanto',11,5);
  sprites['seel'] = easyCharacterSheet('kanto',12,5);
  sprites['dewgong'] = easyCharacterSheet('kanto',13,5);
  sprites['grimer'] = easyCharacterSheet('kanto',14,5);

  sprites['muk'] = easyCharacterSheet('kanto',0,6);
  sprites['shellder'] = easyCharacterSheet('kanto',1,6);
  sprites['cloyster'] = easyCharacterSheet('kanto',2,6);
  sprites['ghastly'] = easyCharacterSheet('kanto',3,6);
  sprites['haunter'] = easyCharacterSheet('kanto',4,6);
  sprites['gengar'] = easyCharacterSheet('kanto',5,6);
  sprites['onix'] = easyCharacterSheet('kanto',6,6);
  sprites['drowzee'] = easyCharacterSheet('kanto',7,6);
  sprites['hypno'] = easyCharacterSheet('kanto',8,6);
  sprites['krabby'] = easyCharacterSheet('kanto',9,6);
  sprites['kingler'] = easyCharacterSheet('kanto',10,6);
  sprites['voltorb'] = easyCharacterSheet('kanto',11,6);
  sprites['electrode'] = easyCharacterSheet('kanto',12,6);
  sprites['exeggcute'] = easyCharacterSheet('kanto',13,6);
  sprites['exeggutor'] = easyCharacterSheet('kanto',14,6);

  sprites['cubone'] = easyCharacterSheet('kanto',0,7);
  sprites['marowak'] = easyCharacterSheet('kanto',1,7);
  sprites['hitmonlee'] = easyCharacterSheet('kanto',2,7);
  sprites['hitmonchan'] = easyCharacterSheet('kanto',3,7);
  sprites['lickitung'] = easyCharacterSheet('kanto',4,7);
  sprites['koffing'] = easyCharacterSheet('kanto',5,7);
  sprites['weezing'] = easyCharacterSheet('kanto',6,7);
  sprites['rhyhorn'] = easyCharacterSheet('kanto',7,7);
  sprites['rhydon'] = easyCharacterSheet('kanto',8,7);
  sprites['chansey'] = easyCharacterSheet('kanto',9,7);
  sprites['tangela'] = easyCharacterSheet('kanto',10,7);
  sprites['kangaskhan'] = easyCharacterSheet('kanto',11,7);
  sprites['horsea'] = easyCharacterSheet('kanto',12,7);
  sprites['seedra'] = easyCharacterSheet('kanto',13,7);
  sprites['goldeen'] = easyCharacterSheet('kanto',14,7);

  sprites['seaking'] = easyCharacterSheet('kanto',0,8);
  sprites['staryu'] = easyCharacterSheet('kanto',1,8);
  sprites['starmie'] = easyCharacterSheet('kanto',2,8);
  sprites['mrmime'] = easyCharacterSheet('kanto',3,8);
  sprites['scyther'] = easyCharacterSheet('kanto',4,8);
  sprites['jynx'] = easyCharacterSheet('kanto',5,8);
  sprites['electabuzz'] = easyCharacterSheet('kanto',6,8);
  sprites['magmar'] = easyCharacterSheet('kanto',7,8);
  sprites['pinsir'] = easyCharacterSheet('kanto',8,8);
  sprites['tauros'] = easyCharacterSheet('kanto',9,8);
  sprites['magikarp'] = easyCharacterSheet('kanto',10,8);
  sprites['gyarados'] = easyCharacterSheet('kanto',11,8);
  sprites['lapras'] = easyCharacterSheet('kanto',12,8);
  sprites['ditto'] = easyCharacterSheet('kanto',13,8);
  sprites['eevee'] = easyCharacterSheet('kanto',14,8);

  sprites['vaporeon'] = easyCharacterSheet('kanto',0,9);
  sprites['jolteon'] = easyCharacterSheet('kanto',1,9);
  sprites['flareon'] = easyCharacterSheet('kanto',2,9);
  sprites['porygon'] = easyCharacterSheet('kanto',3,9);
  sprites['omanyte'] = easyCharacterSheet('kanto',4,9);
  sprites['omastar'] = easyCharacterSheet('kanto',5,9);
  sprites['kabuto'] = easyCharacterSheet('kanto',6,9);
  sprites['kabutops'] = easyCharacterSheet('kanto',7,9);
  sprites['aerodactyl'] = easyCharacterSheet('kanto',8,9);
  sprites['snorlax'] = easyCharacterSheet('kanto',9,9);
  sprites['articuno'] = easyCharacterSheet('kanto',10,9);
  sprites['zapdos'] = easyCharacterSheet('kanto',11,9);
  sprites['moltres'] = easyCharacterSheet('kanto',12,9);
  sprites['dratini'] = easyCharacterSheet('kanto',13,9);
  sprites['dragonair'] = easyCharacterSheet('kanto',14,9);

  sprites['dragonite'] = easyCharacterSheet('kanto',0,10);
  sprites['mewtwo'] = easyCharacterSheet('kanto',1,10);
  sprites['mew'] = easyCharacterSheet('kanto',2,10);
  // ----- }


  /*// ----- SPRITES: johto {
  sprites['chikorita'] = easyCharacterSheet('johto',0,0);
  sprites['bayleef'] = easyCharacterSheet('johto',1,0);
  sprites['meganium'] = easyCharacterSheet('johto',2,0);
  sprites['meganium_female'] = easyCharacterSheet('johto',3,0);
  sprites['cyndaquil'] = easyCharacterSheet('johto',4,0);
  sprites['quilava'] = easyCharacterSheet('johto',5,0);
  sprites['typhlosion'] = easyCharacterSheet('johto',6,0);
  sprites['totodile'] = easyCharacterSheet('johto',7,0);
  sprites['croconaw'] = easyCharacterSheet('johto',8,0);
  sprites['feraligator'] = easyCharacterSheet('johto',9,0);
  sprites['sentret'] = easyCharacterSheet('johto',10,0);

  sprites['furret'] = easyCharacterSheet('johto',0,1);
  sprites['hoothoot'] = easyCharacterSheet('johto',1,1);
  sprites['noctowl'] = easyCharacterSheet('johto',2,1);
  sprites['ledyba'] = easyCharacterSheet('johto',3,1);
  sprites['ledian'] = easyCharacterSheet('johto',4,1);
  sprites['spinarak'] = easyCharacterSheet('johto',5,1);
  sprites['ariados'] = easyCharacterSheet('johto',6,1);
  sprites['crobat'] = easyCharacterSheet('johto',7,1);
  sprites['chinchou'] = easyCharacterSheet('johto',8,1);
  sprites['lantern'] = easyCharacterSheet('johto',9,1);
  sprites['pichu'] = easyCharacterSheet('johto',10,1);

  sprites['pichu_female'] = easyCharacterSheet('johto',0,2);
  sprites['cleffa'] = easyCharacterSheet('johto',1,2);
  sprites['igglybuff'] = easyCharacterSheet('johto',2,2);
  sprites['togepi'] = easyCharacterSheet('johto',3,2);
  sprites['togetic'] = easyCharacterSheet('johto',4,2);
  sprites['natu'] = easyCharacterSheet('johto',5,2);
  sprites['xatu'] = easyCharacterSheet('johto',6,2);
  sprites['mareep'] = easyCharacterSheet('johto',7,2);
  sprites['flaaffy'] = easyCharacterSheet('johto',8,2);
  sprites['ampharos'] = easyCharacterSheet('johto',9,2);
  sprites['bellossom'] = easyCharacterSheet('johto',10,2);
  // ----- }*/
}
