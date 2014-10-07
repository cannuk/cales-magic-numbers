(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CMN.Envelope = (function(_super) {
    __extends(Envelope, _super);

    function Envelope() {
      return Envelope.__super__.constructor.apply(this, arguments);
    }

    Envelope.prototype.initialize = function(options) {
      var action, number;
      action = options.action;
      number = (options != null ? options.number : void 0) || Math.floor(Math.random() * 20) + 1;
      if (action === "negative") {
        number *= -1;
      }
      this.set("number", number);
      return this.set("action", action);
    };

    return Envelope;

  })(Backbone.Model);

}).call(this);
