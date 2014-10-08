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
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CMN.Envelopes = (function(_super) {
    __extends(Envelopes, _super);

    function Envelopes() {
      return Envelopes.__super__.constructor.apply(this, arguments);
    }

    Envelopes.prototype.model = CMN.Envelope;

    Envelopes.prototype.initialize = function() {
      return this.on("change:open", this.changeOpen, this);
    };

    Envelopes.prototype.allOpen = function() {
      var negativeOpened, positiveOpened;
      negativeOpened = this.select((function(_this) {
        return function(envelope) {
          return envelope.get("open") === true && envelope.get("action") === "negative";
        };
      })(this));
      positiveOpened = this.select((function(_this) {
        return function(envelope) {
          return envelope.get("open") === true && envelope.get("action") === "positive";
        };
      })(this));
      console.log("negativeOpened = " + negativeOpened.length + " @length = " + this.length);
      console.log("positiveOpened = " + positiveOpened.length + " @length = " + this.length);
      return negativeOpened.length === (this.length / 2) || positiveOpened.length === (this.length / 2);
    };

    Envelopes.prototype.changeOpen = function() {
      if (this.allOpen()) {
        return this.trigger("all:opened");
      }
    };

    return Envelopes;

  })(Backbone.Collection);

}).call(this);
