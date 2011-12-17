var baseTileSet = new tileSet();

baseTileSet.add({
  letter: 'g',
  name: 'grass',
  color: '128,255,128,255',
  imageURL: 'tiles/g-tile',
  clipto: [true,true,true,true]
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
  clipto: [true,true,true,true],
  transitions:
    [ new tileSprite({imageURL: 'tiles/new/sand', x: 0, y: 0, width: 16, height: 16, condition: '(.+),(g),(.+),(g),(s),(.+),(.+),(.+),(.+)'}),
    new tileSprite({imageURL: 'tiles/new/sand', x: 32, y: 0, width: 16, height: 16, condition:  '(.+),(g),(.+),(.+),(s),(g),(.+),(.+),(.+)'}),
    new tileSprite({imageURL: 'tiles/new/sand', x: 0, y: 32, width: 16, height: 16, condition:  '(.+),(.+),(.+),(g),(s),(.+),(.+),(g),(.+)'}),
    new tileSprite({imageURL: 'tiles/new/sand', x: 32, y: 32, width: 16, height: 16, condition: '(.+),(.+),(.+),(.+),(s),(g),(.+),(g),(.+)'}),

    new tileSprite({imageURL: 'tiles/new/sand', x: 48, y: 16, width: 16, height: 16, condition: '(.+),(s),(g),(.+),(s),(s),(.+),(.+),(.+)'}),
    new tileSprite({imageURL: 'tiles/new/sand', x: 64, y: 0, width: 16, height: 16, condition:  '(.+),(.+),(.+),(s),(s),(.+),(g),(s),(.+)'}),
    new tileSprite({imageURL: 'tiles/new/sand', x: 64, y: 16, width: 16, height: 16, condition: '(g),(s),(.+),(s),(s),(.+),(.+),(.+),(.+)'}),
    new tileSprite({imageURL: 'tiles/new/sand', x: 48, y: 0, width: 16, height: 16, condition:  '(.+),(.+),(.+),(.+),(s),(s),(.+),(s),(g)'}),

    new tileSprite({imageURL: 'tiles/new/sand', x: 16, y: 0, width: 16, height: 16, condition:   '(.+),(g),(.+),(.+),(s),(.+),(.+),(.+),(.+)'}),
    new tileSprite({imageURL: 'tiles/new/sand', x: 16, y: 32, width: 16, height: 16, condition:  '(.+),(.+),(.+),(.+),(s),(.+),(.+),(g),(.+)'}),
    new tileSprite({imageURL: 'tiles/new/sand', x: 0, y: 16, width: 16, height: 16, condition:   '(.+),(.+),(.+),(g),(s),(.+),(.+),(.+),(.+)'}),
    new tileSprite({imageURL: 'tiles/new/sand', x: 32, y: 16, width: 16, height: 16, condition:  '(.+),(.+),(.+),(.+),(s),(g),(.+),(.+),(.+)'}),

    new tileSprite({imageURL: 'tiles/new/sand', x: 16, y: 16, width: 16, height: 16, condition:  '(.+),(.+),(.+),(.+),(s),(.+),(.+),(.+),(.+)'}) ]
});
baseTileSet.add({
  letter: 'd',
  name: 'dirt',
  color: '128,64,0,255',
  imageURL: 'tiles/d-tile',
  clipto: [true,true,true,true],
  transitions:
    [ new tileSprite({imageURL: 'tiles/new/dirt', x: 0, y: 0, width: 16, height: 16, condition:  '(.+),(g|s|w),(.+),(g|s|w),(d),(.+),(.+),(.+),(.+)'}),
    new tileSprite({imageURL: 'tiles/new/dirt', x: 32, y: 0, width: 16, height: 16, condition:   '(.+),(g|s|w),(.+),(.+),(d),(g|s|w),(.+),(.+),(.+)'}),
    new tileSprite({imageURL: 'tiles/new/dirt', x: 0, y: 32, width: 16, height: 16, condition:   '(.+),(.+),(.+),(g|s|w),(d),(.+),(.+),(g|s|w),(.+)'}),
    new tileSprite({imageURL: 'tiles/new/dirt', x: 32, y: 32, width: 16, height: 16, condition:  '(.+),(.+),(.+),(.+),(d),(g|s|w),(.+),(g|s|w),(.+)'}),

    new tileSprite({imageURL: 'tiles/new/dirt', x: 48, y: 16, width: 16, height: 16, condition:  '(.+),(d),(g|s|w),(.+),(d),(d),(.+),(.+),(.+)'}),
    new tileSprite({imageURL: 'tiles/new/dirt', x: 64, y: 0, width: 16, height: 16, condition:   '(.+),(.+),(.+),(d),(d),(.+),(g|s|w),(d),(.+)'}),
    new tileSprite({imageURL: 'tiles/new/dirt', x: 64, y: 16, width: 16, height: 16, condition:  '(g|s|w),(d),(.+),(d),(d),(.+),(.+),(.+),(.+)'}),
    new tileSprite({imageURL: 'tiles/new/dirt', x: 48, y: 0, width: 16, height: 16, condition:   '(.+),(.+),(.+),(.+),(d),(d),(.+),(d),(g|s|w)'}),

    new tileSprite({imageURL: 'tiles/new/dirt', x: 16, y: 0, width: 16, height: 16, condition:   '(.+),(g|s|w),(.+),(.+),(d),(.+),(.+),(.+),(.+)'}),
    new tileSprite({imageURL: 'tiles/new/dirt', x: 16, y: 32, width: 16, height: 16, condition:  '(.+),(.+),(.+),(.+),(d),(.+),(.+),(g|s|w),(.+)'}),
    new tileSprite({imageURL: 'tiles/new/dirt', x: 0, y: 16, width: 16, height: 16, condition:   '(.+),(.+),(.+),(g|s|w),(d),(.+),(.+),(.+),(.+)'}),
    new tileSprite({imageURL: 'tiles/new/dirt', x: 32, y: 16, width: 16, height: 16, condition:  '(.+),(.+),(.+),(.+),(d),(g|s|w),(.+),(.+),(.+)'}),

    new tileSprite({imageURL: 'tiles/new/dirt', x: 16, y: 16, width: 16, height: 16, condition:  '(.+),(.+),(.+),(.+),(d),(.+),(.+),(.+),(.+)'}) ]
});
baseTileSet.add({
  letter: 'r',
  name: 'road',
  color: '128,128,128,255',
  imageURL: 'tiles/r-tile',
  clipto: [true,true,true,true]
});
baseTileSet.add({
  letter: 'T',
  group: 'g',
  name: 'tree',
  color: '0,128,0,255',
  imageURL: 'tiles/tb-tile',
  overlays:
    [ new tileOverlay({imageURL: 'tiles/tt-tile-overlay', yoffset: -1}) ]
});
baseTileSet.add({
  letter: 'gg',
  group: 'g',
  name: 'tree',
  color: '0,255,0,255',
  imageURL: 'tiles/gg-tile',
  clipto: [true,true,true,true],
  overlays:
    [ new tileOverlay({imageURL: 'tiles/gg-tile-overlay', draw_over_moving: false}) ]
});
baseTileSet.add({
  letter: 'h',
  name: 'hill south',
  color: '128,128,0,255',
  imageURL: 'tiles/g-tile',
  clipto: [false,false,false,false],
  transitions:
    [ new tileSprite({imageURL: 'tiles/new/hill', x: 0, y: 0, width: 16, height: 16, condition:  '(.+),(g|s|w),(.+),(g|s|w),(h),(.+),(.+),(.+),(.+)'}),
    new tileSprite({imageURL: 'tiles/new/hill', x: 32, y: 0, width: 16, height: 16, condition:   '(.+),(g|s|w),(.+),(.+),(h),(g|s|w),(.+),(.+),(.+)'}),
    new tileSprite({imageURL: 'tiles/new/hill', x: 0, y: 32, width: 16, height: 16, condition:   '(.+),(.+),(.+),(g|s|w),(h),(.+),(.+),(g|s|w),(.+)'}),
    new tileSprite({imageURL: 'tiles/new/hill', x: 32, y: 32, width: 16, height: 16, condition:  '(.+),(.+),(.+),(.+),(h),(g|s|w),(.+),(g|s|w),(.+)'}),

    new tileSprite({imageURL: 'tiles/new/hill', x: 16, y: 0, width: 16, height: 16, condition:   '(.+),(g|s|w),(.+),(.+),(h),(.+),(.+),(.+),(.+)'}),
    new tileSprite({imageURL: 'tiles/new/hill', x: 16, y: 32, width: 16, height: 16, condition:  '(.+),(.+),(.+),(.+),(h),(.+),(.+),(g|s|w),(.+)'}),
    new tileSprite({imageURL: 'tiles/new/hill', x: 0, y: 16, width: 16, height: 16, condition:   '(.+),(.+),(.+),(g|s|w),(h),(.+),(.+),(.+),(.+)'}),
    new tileSprite({imageURL: 'tiles/new/hill', x: 32, y: 16, width: 16, height: 16, condition:  '(.+),(.+),(.+),(.+),(h),(g|s|w),(.+),(.+),(.+)'}),

    new tileSprite({imageURL: 'tiles/new/hill', x: 16, y: 16, width: 16, height: 16, condition:  '(.+),(.+),(.+),(.+),(h),(.+),(.+),(.+),(.+)'}) ]
});