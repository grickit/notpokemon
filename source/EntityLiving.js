// ----- CLASS: EntityLiving {
  function EntityLiving(args,map_override) {
    var self = this;
    this.prototype = new Entity(args);
    Entity.call(this,args,map_override);

    // ----- Properties
    self.facing = isset(args.facing)? args.facing : 1; // North: 0, South: 1, East: 2, West: 3;

    // ----- Methods
    self.on_step = isset(args.on_step)? args.on_step : function(){};
    self.on_injured = isset(args.on_injured)? args.on_injured : function(){};
    self.on_die = isset(args.on_die)? args.on_die : function(){};

    self.step = function(direction) {
      var newx = self.x + game.directionChanges[direction].x;
      var newy = self.y + game.directionChanges[direction].y;
      self.facing = game.directionNumbers[direction];
      self.current_image = self.sprites[self.facing];
      if(game.getTile(self.x, self.y).clipfrom[game.directionNumbers[direction]] && game.getTile(newx,newy).clipto[game.directionNumbers[direction]]) {
	self.current_image.playOnce();
	self.z = 120;
	self.current_image.on_finished.subscribe(function(){ self.setPosition(newx,newy); self.current_image.stop(); self.z = 100; });
      }
    }

    // ----- Initialize
  }
// ----- }