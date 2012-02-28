//# CLEAN

// ----- CLASS: Callback {
  function Callback() {
    this.subscribers = new Object();
    this.sid = 0;

    this.subscribe = function(callback_object,callback_function,callback_arguments,first_time_only) {
      this.sid++;
      this.subscribers[this.sid] = [callback_object,callback_function,callback_arguments,first_time_only];
      return this.sid;
    }

    this.fire = function() {
      for(i in this.subscribers) {
	if(this.subscribers[i][0] == undefined && this.subscribers[i][1] != undefined) {
	  this.subscribers[i][1](this.subscribers[i][2]);
	}
	else if(this.subscribers[i][0] != undefined && this.subscribers[i][1] != undefined) {
	  this.subscribers[i][0][this.subscribers[i][1]](this.subscribers[i][2]);
	}
	
	if(this.subscribers[i] != undefined && this.subscribers[i][3] != false) { delete this.subscribers[i]; }
      }
    }

    // TODO: unsubscribe() method
  }
// ----- }