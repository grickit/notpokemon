// ----- CLASS: EntityCursor {
  function EntityCursor(args,map_override) {
    var self = this;
    Entity.call(this,args,map_override);

    // ----- Properties
    self.tileX = 0;
    self.tileY = 0;
    self.pageX = 0;
    self.pageY = 0;
    self.z = 0;

    // ----- Methods
    self.on_tick = function() {
      if(game.inbounds(self.tileX,self.tileY)) {
        self.setPosition(self.tileX,self.tileY);
      }
    }

    // ----- Initialize
    self.current_image = new Sprite({imageURL: 'border'});
    self.game_tick_subscription_number = game.on_tick.subscribe(self.on_tick,false,false);
  }
// ----- }