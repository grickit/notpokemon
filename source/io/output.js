function output(id, title, default_delay) {
  this.box = document.getElementById(id);
  this.messages = new Array();

  if(default_delay == undefined) {
    this.default_scroll_delay = 60;
  }
  else {
    this.default_scroll_delay = default_delay;
  }

  this.scroll_delay = this.default_scroll_delay;

  this.write = function(message,br) {
    this.messages.push({type:'normal', message: message, br: br});
  }

  this.scrollingWrite = function(message,br) {
    this.messages.push({type:'scrolling', message: message, br: br});
  }

  this.clear = function(message) {
    this.messages.push({type:'clear'});
  }

  this.wait = function(milliseconds) {
    this.messages.push({type:'wait', message: milliseconds});
  }

  this.changeDelay = function(milliseconds) {
    this.messages.push({type:'delay change', message: milliseconds});
  }

  this.resetDelay = function() {
    this.messages.push({type:'delay change', message: this.default_scroll_delay});
  }

  this.writeNow = function(message,br) {
    this.box.innerHTML += message;
    if(br != false) {
      this.box.innerHTML += '<br>';
      this.box.scrollTop += 100;
    }
  }

  this.scrollingWriteNow = function(text,br) {
    // Scrolling writes need to finish immediately if paused because the poller isn't guarunteed to stop right away.
    if(game.paused) {
      this.writeNow(text,br);
    }
    else {
      var first_char = text.charAt(0);
      this.writeNow(first_char,false);
      text = text.substring(1,text.length);
      if(text.length > 0) {
	setTimeout(function(thisObj) { thisObj.scrollingWriteNow(text,br); }, this.scroll_delay, this);
      }
      else {
	this.writeNow('',br);
      }
    }
  }

  this.clearNow = function() {
    this.box.innerHTML = '<div style="text-align: center; font-weight: bold;">'+title+'</div>';
    this.resetDelay();
    this.scrollTop = 0;
  }

  this.changeDelayNow = function(milliseconds) {
    this.scroll_delay = milliseconds;
  }

  this.poll = function() {
    //Idle the poller when paused
    if(game.paused) {
      setTimeout(function(thisObj) { thisObj.poll(); }, this.scroll_delay*2, this);
    }
    else {
      var next_message = this.messages.shift();
      if(next_message) {
	if(next_message.type == 'normal') {
	  this.writeNow(next_message.message,next_message.br);
	  setTimeout(function(thisObj) { thisObj.poll(); }, this.scroll_delay*2, this);
	}
	else if(next_message.type == 'scrolling') {
	  this.scrollingWriteNow(next_message.message,next_message.br);
	  setTimeout(function(thisObj) { thisObj.poll(); }, next_message.message.length * this.scroll_delay*2 + this.scroll_delay*2, this);
	}
	else if(next_message.type == 'clear') {
	  this.clearNow();
	  setTimeout(function(thisObj) { thisObj.poll(); }, this.scroll_delay*2, this);
	}
	else if(next_message.type == 'wait') {
	  setTimeout(function(thisObj) { thisObj.poll(); }, next_message.message , this);
	}
	else if(next_message.type == 'delay change') {
	  this.changeDelayNow(next_message.message);
	  setTimeout(function(thisObj) { thisObj.poll(); }, next_message.message , this);
	}
      }
      else {
	setTimeout(function(thisObj) { thisObj.poll(); }, this.scroll_delay*2, this);
      }
    }
  }
  this.poll();
  this.clear();
}
