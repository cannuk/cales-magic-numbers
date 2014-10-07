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
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CMN.Players = (function(_super) {
    __extends(Players, _super);

    function Players() {
      return Players.__super__.constructor.apply(this, arguments);
    }

    Players.prototype.model = CMN.Player;

    Players.prototype.activePlayer = -1;

    Players.prototype.generate = function(players) {
      var p, x;
      p = [];
      x = 0;
      while (p.length < players) {
        p.push({
          playerName: "Player " + (x + 1),
          playerNumber: x + 1,
          score: 0,
          turns: 0,
          active: false
        });
        x++;
      }
      return this.add(p);
    };

    Players.prototype.setActivePlayer = function() {
      if (this.activePlayer >= 0) {
        this.at(this.activePlayer).set("active", false);
      }
      if ((this.activePlayer + 1) >= this.length) {
        this.activePlayer = 0;
      } else {
        this.activePlayer++;
      }
      return this.at(this.activePlayer).set("active", true);
    };

    Players.prototype.getActivePlayer = function() {
      return this.at(this.activePlayer);
    };

    return Players;

  })(Backbone.Collection);

}).call(this);
