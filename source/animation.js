// ----- CLASS: animation {
  function animation(frames,args) {
    if(this.frames == undefined) { throw "New animation has no frames"; }
    this.frames = frames;
    this.index = 0;
    this.current = this.frames[this.index];

    args = (args == undefined)? {loop: false, speed: 1, paused: false} : args;
    this.loop = (args.loop == undefined)? false : args.loop;
    this.speed = (args.speed == undefined)? 1 : args.speed;
    this.paused = (args.paused == undefined)? false : args.paused

    this.next = function() {
      this.index++;
      if(this.index >= this.frames.length) { this.index = 0; }
      this.current = this.frames[this.index];
    }

    this.previous = function() {
      this.index--;
      if(this.index < 0) { this.index = this.frames.length - 1; }
      this.current = this.frames[this.index];
    }

    this.autoplay() {
      if(this.paused != true) {
	if(this.loop != true && this.index == (this.frames.length - 1)) { this.stop(); return; }
	this.next();
      }
      this.timeout = setTimeout(
	function(thisObj) { thisObj.autoplay(); },
	this.current.duration/this.speed,
	this
      );
    }

    this.stop = function() {
      clearTimeout(this.timeout);
      this.paused = true;
      this.index = 0;
      this.current = this.frames[this.index];
    }
  }
// ----- }