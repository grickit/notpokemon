//# CLEAN but has lots of temporary code

// ----- CLASS: EntityTiving {
  function EntityTrigger(args,map_override) {
    this.prototype = new Entity(args); // Inherit Entity
    Entity.call(this,args,map_override); // Inherit Entity

    // ----- Properties

    // ----- Methods
    this.on_render = function() {
      if(game.mousedown) { this.current_image = this.sprites[0]; }
      else { this.current_image = this.sprites[1]; }
    }

    // ----- Initialize
    this.sprites.push(new Sprite({imageURL: 'alpha'}));
  }
// ----- }