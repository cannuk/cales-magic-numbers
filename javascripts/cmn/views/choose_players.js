(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CMN.Views.ChoosePlayers = (function(_super) {
    __extends(ChoosePlayers, _super);

    function ChoosePlayers() {
      return ChoosePlayers.__super__.constructor.apply(this, arguments);
    }

    ChoosePlayers.prototype.playersCount = 0;

    ChoosePlayers.prototype.template = "cmn/templates/choose_players";

    ChoosePlayers.prototype.events = {
      "click .btn-play": "submit",
      "click .players-count": "setPlayersCount"
    };

    ChoosePlayers.prototype.submit = function() {
      if (!(this.playersCount > 0)) {
        return;
      }
      return this.trigger("playersselected", {
        players: this.playersCount
      });
    };

    ChoosePlayers.prototype.setPlayersCount = function(ev) {
      return this.playersCount = $(ev.currentTarget).val();
    };

    return ChoosePlayers;

  })(Backbone.Marionette.ItemView);

}).call(this);
