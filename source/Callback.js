// ----- CLASS: Callback {
  function Callback() {
    var self = this;
    // ----- Properties
    self.subscribers = {};
    self.sid = 0;
    self.count = 0;

    // ----- Methods
    self.subscribe = function(callback_function,use_previous,first_time_only) {
      self.sid += 1;
      if(use_previous && self.count >= 1) { callback_function(); }
      else { self.subscribers[self.sid] = [callback_function,use_previous,first_time_only]; }
      return self.sid;
    }

    self.unsubscribe = function(sid) {
      delete self.subscribers[sid];
    }

    self.fire = function() {
      self.count += 1;
      for(var i in self.subscribers) {
	if(typeof self.subscribers[i][0] === 'function') { self.subscribers[i][0](); }
	if(self.subscribers[i][2] !== false) { delete self.subscribers[i]; }
      }
    }

    // ----- Initialize
  }
// ----- }