//# CLEAN

// ----- CLASS: Entity {
  function Entity(args,map_override) {
    // ----- Properties
    this.name = (args.name == undefined)? uniqueEntityID() : args.name;
    this.x = (args.x == undefined)? 0 : args.x;
    this.y = (args.y == undefined)? 0 : args.y;
    this.z = (args.z == undefined)? 100 : args.z;
    this.map = (map_override == undefined)? game.currentMap : map_override;
    this.sprites = (args.sprites == undefined)? [new sprite({imageURL: 'characters/sign', yoffset: -1})] : args.sprites;

    // ----- Methods
    this.on_render = (args.on_render == undefined)? function(){} : args.on_render;
    this.on_tick = (args.on_tick == undefined)? function(){} : args.on_tick;
    this.on_moved_to = (args.on_moved_to == undefined)? function(){} : args.on_moved_to;
    this.on_moved_from = (args.on_moved_from == undefined)? function(){} : args.on_moved_from;

    this.purge = function() {
      delete this.map.entities[this.x][this.y][this.name];
      delete game.entities[this.name];
      delete game.ontick.subscribers[this.game_tick_subscription_number]; // TODO: callback() needs an unsubscribe method
      delete this;
    }

    this.getImage = function() {
      if(this.currentImage instanceof animation) { return this.currentImage.current; }
      else if(this.currentImage instanceof sprite) { return this.currentImage; }
      else { throw "Current image of entity \""+this.name+"\" is of unknown type."; }
    }

    this.setPosition = function(x,y) {
      delete this.map.entities[this.x][this.y][this.name];
      for(name in this.map.entities[this.x][this.y]) { this.map.entities[this.x][this.y][name].on_moved_from(this); }
      this.x = x;
      this.y = y;
      for(name in this.map.entities[this.x][this.y]) { this.map.entities[this.x][this.y][name].on_moved_to(this); }
      this.map.entities[this.x][this.y][this.name] = this;
    }

    // ----- Initialize
    if(args.ticks == true) { this.game_tick_subscription_number = game.ontick.subscribe(this,'on_tick','',false); }
    game.entities[this.name] = this;
    this.setPosition(this.x,this.y);
    this.currentImage = this.sprites[0];
  }
// ----- }