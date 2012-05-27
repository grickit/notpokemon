// ----- CLASS: EntityList {
  function EntityList() {
    var self = this;
    // ----- Properties
    self.list = {};
    self.uid = 0;

    // ----- Methods
    self.getUniqueEntityID = function() {
      return self.uid++;
    }

    self.get = function(name) {
      return self.list[name];
    }

    self.remove = function(name) {
      delete self.list[name];
    }

    self.add = function(name,entity) {
      self.list[name] = entity;
    }

    // ----- Initialize
  }
// ----- }