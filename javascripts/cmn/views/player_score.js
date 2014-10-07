(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CMN.Views.PlayerScore = (function(_super) {
    __extends(PlayerScore, _super);

    function PlayerScore() {
      return PlayerScore.__super__.constructor.apply(this, arguments);
    }

    PlayerScore.prototype.template = "cmn/templates/player_score";

    PlayerScore.prototype.tagName = "li";

    PlayerScore.prototype.className = "player-score";

    PlayerScore.prototype.modelEvents = {
      "change": "render"
    };

    PlayerScore.prototype.onRender = function() {
      var f;
      if (this.model.get("active") === true) {
        f = (function(_this) {
          return function() {
            return _this.$el.addClass("active");
          };
        })(this);
      } else {
        f = (function(_this) {
          return function() {
            return _this.$el.removeClass("active");
          };
        })(this);
      }
      return setTimeout(f, 200);
    };

    return PlayerScore;

  })(Backbone.Marionette.ItemView);

}).call(this);
