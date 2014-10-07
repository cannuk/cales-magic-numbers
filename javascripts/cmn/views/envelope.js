(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CMN.Views.Envelope = (function(_super) {
    __extends(Envelope, _super);

    function Envelope() {
      return Envelope.__super__.constructor.apply(this, arguments);
    }

    Envelope.prototype.template = "cmn/templates/envelope";

    Envelope.prototype.className = "envelope-wrapper";

    Envelope.prototype.events = {
      "click": "click"
    };

    Envelope.prototype.modelEvents = {
      "change:open": "openChange"
    };

    Envelope.prototype.intialize = function(options) {
      return this.size = options.envelopeSize;
    };

    Envelope.prototype.templateHelpers = function() {
      return {
        symbol: this.model.get("action") === "positive" ? "+" : "",
        iconSymbol: this.model.get("action") === "positive" ? "plus" : "minus"
      };
    };

    Envelope.prototype.openChange = function() {
      if (this.model.get("open") === true) {
        this.$el.find(".envelope").addClass("open");
        return setTimeout(((function(_this) {
          return function() {
            return _this.trigger("envelope:open");
          };
        })(this)), 1000);
      } else {
        return this.$el.find(".envelope").removeClass("open");
      }
    };

    Envelope.prototype.click = function() {
      return this.trigger("envelope:click", {
        number: this.model.get("number"),
        action: this.model.get("action")
      });
    };

    return Envelope;

  })(Backbone.Marionette.ItemView);

}).call(this);
