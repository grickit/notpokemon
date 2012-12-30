// ----- CLASS: WindowType {
  function WindowType(args) {
    var self = this;
    // ----- Properties
    self.drawFrame = isset(args.drawFrame)? args.drawFrame : function() {};
    self.tick = isset(args.tick)? args.tick : function() {};
    self.mouseDown = isset(args.mouseDown)? args.mouseDown : function(x,y) {};
    self.mouseUp = isset(args.mouseUp)? args.mouseUp : function (x,y) {};
    self.mouseMove = isset(args.mouseMove)? args.mouseMove : function(x,y) {};
    self.keyDown = isset(args.keyDown)? args.keyDown : function(key) {};
    self.keyUp = isset(args.keyUp)? args.keyUp : function(key) {};
    self.keyHold = isset(args.keyHold)? args.keyHold : function(key) {};

    // ----- Initialize
  }
// ----- }