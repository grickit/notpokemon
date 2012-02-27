//# CLEAN

// ----- CLASS: EntityList {
  function EntityList() {
    // Properties
    this.list = new Array();
    this.uid = 0;

    // Methods
    this.getUniqueEntityID = function() {
      this.uid++;
      return this.uid;
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