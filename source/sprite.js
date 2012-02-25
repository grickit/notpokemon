// ----- CLASS: sprite {
  function sprite(args) {
    if(args.imageURL == undefined) { throw "New sprite has undefined imageURL"; }
    this.imageURL = args.imageURL;
    this.x = (args.x == undefined)? 0 : args.x;
    this.y = (args.y == undefined)? 0 : args.y;
    this.width = (args.width == undefined)? 16 : args.width;
    this.height = (args.height == undefined)? 16 : args.height;
    this.xoffset = (args.xoffset == undefined)? 0 : args.xoffset;
    this.yoffset = (args.yoffset == undefined)? 0 : args.yoffset;

    // For characters
    this.trackxoffset = (args.trackxoffset == undefined)? 0 : args.trackxoffset;
    this.trackyoffset = (args.trackyoffset == undefined)? 0 : args.trackyoffset;

    // For tiles
    this.condition = (args.condition == undefined)? '(.+),(.+),(.+),(.+),(.+),(.+),(.+),(.+),(.+)' : args.condition;

    // For animations
    this.duration = (args.duration == undefined)? 100 : args.duration;
  }
// ----- }