// ----- CLASS: EntityTiving {
  function EntityTrigger(args,map_override) {
    var self = this;
    this.prototype = new Entity(args,map_override); // Inherit Entity
    Entity.call(this,args,map_override); // Inherit Entity

    // ----- Properties

    // ----- Methods
    self.on_render = function() {
      if(game.mousedown) { self.current_image = self.sprites[0]; }
      else { self.current_image = self.sprites[1]; }
    }

    // ----- Initialize
    self.sprites.push(new Sprite({imageURL: 'alpha'}));
  }
// ----- }