//# CLEAN

// ----- CLASS: EntityLiving {
  function EntityLiving(args,map_override) {
    this.prototype = new Entity(args); // Inherit Entity
    Entity.call(this,args,map_override); // Inherit Entity

    // ----- Properties
    this.facing = (args.facing == undefined)? 1 : args.facing; // North: 0, South: 1, East: 2, West: 3;

    // ----- Methods
    this.on_step = (args.on_step == undefined)? function(){} : args.on_step;
    this.on_injured = (args.on_injured == undefined)? function(){} : args.on_injured;
    this.on_die = (args.on_die == undefined)? function(){} : args.on_die;

    this.step = function(direction) {
      var newx = this.x + game.directionChanges[direction].x;
      var newy = this.y + game.directionChanges[direction].y;
      this.facing = game.directionNumbers[direction];
      if(game.getTile(this.x, this.y).clipfrom[game.directionNumbers[direction]] && game.getTile(newx,newy).clipto[game.directionNumbers[direction]]) {
	this.current_image = this.sprites[game.directionNumbers[direction]];
	this.current_image.playOnce();
	this.z = 120;
	this.current_image.on_finished.subscribe(undefined,function(thisObj){ thisObj.setPosition(newx,newy); thisObj.current_image.stop(); thisObj.z = 100; },this);
      }
    }

    // ----- Initialize
  }
// ----- }