//# CLEAN

// ----- CLASS: Entity {
  function Entity(args,map_override) {
    var self = this;
    // ----- Properties
    self.name = isset(args.name)? args.name : uniqueEntityID();
    self.x = isset(args.x)? args.x : 0;
    self.y = isset(args.y)? args.y : 0;
    self.z = isset(args.z)? args.z : 100;
    self.map = isset(map_override)? map_override : game.currentMap;
    // TODO: sprites should be an associative array named animations
    self.sprites = isset(args.sprites)? args.sprites : [new Sprite({imageURL: 'characters/sign', yoffset: -1})];

    // ----- Methods
    self.on_render = isset(args.on_render)? args.on_render : function(){};
    self.on_tick = isset(args.on_tick)? args.on_tick : function(){};
    self.on_moved_to = isset(args.on_moved_to)? args.on_moved_to : function(){};
    self.on_moved_from = isset(args.on_moved_from)? args.on_moved_from : function(){};

    self.purge = function() {
      if(game.viewport.tracking = self) { game.viewport.tracking = undefined; }
      delete self.map.entities[self.x][self.y][self.name];
      delete game.entities[self.name];
      game.on_tick.unsubscribe[self.game_tick_subscription_number];
      delete self;
      delete this;
    }

    self.getImage = function() {
      if(self.current_image instanceof Animation) { return self.current_image.current; }
      else if(self.current_image instanceof Sprite) { return self.current_image; }
      else { throw "Current image of entity \""+self.name+"\" is of unknown type."; }
    }

    self.setPosition = function(x,y) {
      delete self.map.entities[self.x][self.y][self.name];
      for(name in self.map.entities[self.x][self.y]) { self.map.entities[self.x][self.y][name].on_moved_from(self); }
      self.x = x;
      self.y = y;
      for(name in self.map.entities[self.x][self.y]) { self.map.entities[self.x][self.y][name].on_moved_to(self); }
      self.map.entities[self.x][self.y][self.name] = self;
    }

    // ----- Initialize
    if(args.ticks == true) { self.game_tick_subscription_number = game.on_tick.subscribe(self.ontick,false,false); }
    game.entities[self.name] = self;
    self.setPosition(self.x,self.y);
    self.current_image = self.sprites[0];
  }
// ----- }