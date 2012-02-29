//# CLEAN

// ----- CLASS: EntityList {
  function EntityList() {
    // Properties
    this.list = new Object();
    this.uid = 0;

    // Methods
    this.getUniqueEntityID = function() {
      return this.uid++;
    }

    this.get = function(name) {
      return this.list[name];
    }

    this.remove = function(name) {
      delete this.list[name];
    }

    this.add = function(name,entity) {
      this.list[name] = entity;
    }

    // Initialize
  }
// ----- }