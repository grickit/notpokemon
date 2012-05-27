//# CLEAN

// ----- CLASS: Sprite {
  function Sprite(args) {
    var self = this;
    // ----- Properties
    // General
    self.imageURL = args.imageURL;
    self.x = isset(args.x)? args.x : 0;
    self.y = isset(args.y)? args.y : 0;
    self.width = isset(args.width)? args.width : 16;
    self.height = isset(args.height)? args.height : 16;
    self.xoffset = isset(args.xoffset)? args.xoffset : 0;
    self.yoffset = isset(args.yoffset)? args.yoffset : 0;
    // For characters
    self.trackxoffset = isset(args.trackxoffset)? args.trackxoffset : 0;
    self.trackyoffset = isset(args.trackyoffset)? args.trackyoffset : 0;
    // For tiles
    self.condition = isset(args.condition)? args.condition : '(.+),(.+),(.+),(.+),(.+),(.+),(.+),(.+),(.+)';
    // For animations
    self.duration = isset(args.duration)? args.duration : 100;

    // ----- Methods

    // ----- Initialize
    if(!isset(args.imageURL)) { throw "New sprite has undefined imageURL"; }
  }
// ----- }