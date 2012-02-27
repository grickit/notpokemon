//# CLEAN

// ----- CLASS: Animation {
  function Animation(frames,args) {
    // ----- Properties
    this.frames = frames;
    this.index = 0;
    this.current = this.frames[this.index];

    args = (args == undefined)? {loop: false, speed: 1, paused: false} : args;
    this.loop = (args.loop == undefined)? false : args.loop;
    this.speed = (args.speed == undefined)? 1 : args.speed;
    this.paused = (args.paused == undefined)? false : args.paused;
    this.onfinished = new callback();

    // ----- Methods
    this.next = function() {
      this.index++;
      if(this.index >= this.frames.length) { this.index = 0; this.onfinished.fire(); }
      this.current = this.frames[this.index];
    }

    this.previous = function() {
      this.index--;
      if(this.index < 0) { this.index = this.frames.length - 1; }
      this.current = this.frames[this.index];
    }

    this.autoplay = function() {
      if(this.speed == 0) { this.paused = true; this.speed = 1; }

      if(this.paused != true) {
	if(this.loop != true && this.index == (this.frames.length - 1)) { this.paused = true; this.onfinished.fire(); return; }

	if(this.speed < 0) { this.previous(); }
	else { this.next(); }
      }
      this.timeout = setTimeout(
	function(thisObj) { thisObj.autoplay(); },
	this.current.duration/Math.abs(this.speed),
	this
      );
    }

    this.stop = function() {
      clearTimeout(this.timeout);
      this.paused = true;
      this.index = 0;
      this.current = this.frames[this.index];
    }

    this.setFrame = function (number) {
      if(number >= 0 && number <= this.frames.length - 1) {
	this.index = number;
	this.current = this.frames[this.index];
      }
      else if(number < 0) {
	this.index = number % this.frames.length;
	this.next();
      }
      else {
	this.index = number % this.frames.length;
	this.previous();
      }
    }

    this.playOnce = function() {
      this.stop();
      this.paused = false;
      this.loop = false;
      this.autoplay();
    }

    this.calculateDuration = function() {
      total_duration = 0;
      for(frame in this.frames) {
	total_duration += this.frames[frame].duration;
      }
      return total_duration/Math.abs(this.speed);
    }

    // ----- Initialize
    if(frames == undefined) { console.log(this); throw "New animation has no frames"; }
  }
// ----- }