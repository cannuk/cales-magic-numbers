(function() {
  var _base;

  Backbone.Marionette.Renderer.render = function(template, data) {
    if (JST[template]) {
      return JST[template](data);
    }
  };

  if (window.CMN == null) {
    window.CMN = {};
  }

  if ((_base = window.CMN).Views == null) {
    _base.Views = {};
  }

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CMN.Player = (function(_super) {
    __extends(Player, _super);

    function Player() {
      return Player.__super__.constructor.apply(this, arguments);
    }

    Player.prototype.initialize = function(options) {
      this.set("score", 0);
      return this.set("name", options.playerName);
    };

    return Player;

  })(Backbone.Model);

}).call(this);
