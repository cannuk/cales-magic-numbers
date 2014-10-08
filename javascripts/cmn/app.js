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
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CMN.Views.AnswerModal = (function(_super) {
    __extends(AnswerModal, _super);

    function AnswerModal() {
      return AnswerModal.__super__.constructor.apply(this, arguments);
    }

    AnswerModal.prototype.template = "cmn/templates/answer_modal";

    AnswerModal.prototype.className = "answer-modal";

    AnswerModal.prototype.ui = {
      answer: "#total_answer",
      answerFormContainer: ".answer-form-container"
    };

    AnswerModal.prototype.events = {
      "click .btn-answer": "submitAnswer"
    };

    AnswerModal.prototype.templateHelpers = function() {
      return {
        operator: this.model.get("symbol") === "positive" ? "+" : ""
      };
    };

    AnswerModal.prototype.onShow = function() {
      this.ui.answer.removeClass("correct incorrect");
      return setTimeout(((function(_this) {
        return function() {
          return _this.ui.answer.focus();
        };
      })(this)), 500);
    };

    AnswerModal.prototype.submitAnswer = function() {
      this.ui.answer.removeClass("correct incorrect");
      if (this.answerCorrect()) {
        this.ui.answer.addClass("correct");
        return this.trigger("answer:correct");
      } else {
        this.ui.answer.addClass("incorrect");
        return this.trigger("answer:incorrect");
      }
    };

    AnswerModal.prototype.answerCorrect = function() {
      return (this.model.get("points") + this.model.get("score")) === parseInt(this.ui.answer.val());
    };

    return AnswerModal;

  })(Backbone.Marionette.ItemView);

}).call(this);
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
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CMN.Views.Envelopes = (function(_super) {
    __extends(Envelopes, _super);

    function Envelopes() {
      return Envelopes.__super__.constructor.apply(this, arguments);
    }

    Envelopes.prototype.itemView = CMN.Views.Envelope;

    Envelopes.prototype.tagName = "div";

    Envelopes.prototype.className = "envelopes-container";

    Envelopes.prototype.initialize = function() {
      return this.setEnvelopeSize();
    };

    Envelopes.prototype.setEnvelopeSize = function() {
      var col, e, h, row, s, w;
      row = 5;
      col = 6;
      w = $(window).width() - (col * 16);
      h = $(window).height() - (row * 50) - 75;
      e = {};
      e.w = Math.floor(w / col);
      e.h = Math.floor(h / row);
      if (e.h > 150) {
        e.h = 150;
      }
      s = document.createElement("style");
      s.type = "text/css";
      s.innerHTML = ".envelope{height: " + e.h + "px; width: " + e.w + "px;} .envelope .flap,.envelope:after{border-width: " + (Math.round(e.h / 2)) + "px " + (Math.round(e.w / 2)) + "px} .envelope .paper{ width: " + (Math.round(e.w - 12)) + "px; height: " + (e.h - 20) + "px; } .envelopes-container .envelope-wrapper{ margin-top: " + (Math.round(e.h / 2) + 1) + "px}";
      return $("body").append($(s));
    };

    return Envelopes;

  })(Backbone.Marionette.CollectionView);

}).call(this);
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
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CMN.Views.ScoresBar = (function(_super) {
    __extends(ScoresBar, _super);

    function ScoresBar() {
      return ScoresBar.__super__.constructor.apply(this, arguments);
    }

    ScoresBar.prototype.itemView = CMN.Views.PlayerScore;

    ScoresBar.prototype.tagName = "ul";

    ScoresBar.prototype.className = "scores-bar-container";

    return ScoresBar;

  })(Backbone.Marionette.CollectionView);

}).call(this);
(function() {
  var game, _WINNING_SCORE, _answerModalOpen, _messageTimeout, _successMessages;

  game = new Backbone.Marionette.Application();

  _WINNING_SCORE = 21;

  _successMessages = ["Good Job!", "Way to go!", "Awesome!", "Perfect!", "Fantastic!", "That's right!", "You got it!"];

  _messageTimeout = null;

  _answerModalOpen = false;

  game.addRegions({
    main: ".main",
    scores: ".scores-container",
    answerModal: ".answer-modal-container"
  });

  game.showView = function(view) {
    return this.main.show(view);
  };

  game.showSuccessMessage = function() {
    return this.showMessage(_successMessages[Math.floor(Math.random() * _successMessages.length)]);
  };

  game.showMessage = function(message, visibleTime) {
    if (visibleTime == null) {
      visibleTime = 1700;
    }
    $("h1.success-message-text").html(message);
    $(".success-message-container").addClass("visible");
    clearTimeout(_messageTimeout);
    return _messageTimeout = setTimeout(((function(_this) {
      return function() {
        return $(".success-message-container").removeClass("visible");
      };
    })(this)), visibleTime);
  };

  game.selectPlayers = function() {
    return this.main.show(this.selectPlayersView);
  };

  game.showEnvelopes = function() {
    this.main.show(this.envelopesView);
    return window.scrollTo(0, 0);
  };

  game.createEnvelopes = function() {
    this.envelopes.reset(this.generateEnvelopes());
    return this.showEnvelopes();
  };

  game.generateEnvelopes = function() {
    var envelopes, total;
    envelopes = [];
    total = 15;
    while (envelopes.length < total) {
      envelopes.push({
        action: "positive"
      });
    }
    total += 15;
    while (envelopes.length < total) {
      envelopes.push({
        action: "negative"
      });
    }
    return envelopes = _.shuffle(envelopes);
  };

  game.createPlayers = function(options) {
    var playersCount;
    playersCount = options.players;
    this.players = new CMN.Players;
    if (playersCount) {
      this.players.generate(playersCount);
    }
    this.players.setActivePlayer();
    this.scoresBar = new CMN.Views.ScoresBar({
      collection: this.players
    });
    return this.scores.show(this.scoresBar);
  };

  game.changePlayer = function() {
    return this.players.setActivePlayer();
  };

  game.getCurrentPlayer = function() {
    return this.players.getActivePlayer();
  };

  game.updatePlayerScore = function(model) {
    var player, points, score;
    points = model.get("points");
    player = this.getCurrentPlayer();
    score = player.get("score") + points;
    return player.set("score", score);
  };

  game.checkForWinner = function() {
    var player;
    player = this.getCurrentPlayer();
    return player.get("score") === _WINNING_SCORE;
  };

  game.onResize = function() {
    return this.envelopesView.setEnvelopeSize();
  };

  game.addInitializer(function(options) {
    return this.envelopes = new CMN.Envelopes();
  });

  game.addInitializer(function(options) {
    this.selectPlayersView = new CMN.Views.ChoosePlayers();
    this.selectPlayersView.on("playersselected", this.createPlayers, this);
    this.selectPlayersView.on("playersselected", this.createEnvelopes, this);
    this.envelopesView = new CMN.Views.Envelopes({
      collection: this.envelopes
    });
    this.envelopesView.on("itemview:envelope:open", this.showAnswerModal, this);
    return this.envelopesView.on("itemview:envelope:click", this.envelopeClick, this);
  });

  game.addInitializer(function(options) {
    return $(window).resize(this.onResize(), this);
  });

  game.envelopeClick = function(e, f) {
    var player;
    if (_answerModalOpen) {
      return;
    }
    player = this.getCurrentPlayer();
    if (player.get("score") < _WINNING_SCORE && e.model.get("action") === "negative") {
      return this.showMessage("Choose a <i class=\"icon icon-plus-outline\"></i> envelope", 2000);
    } else if (player.get("score") > _WINNING_SCORE && e.model.get("action") === "positive") {
      return this.showMessage("Choose a <i class=\"icon icon-minus-outline\"></i> envelope", 2000);
    } else {
      return e.model.set("open", true);
    }
  };

  game.showAnswerModal = function(envelope) {
    var player, scoreModel;
    player = this.getCurrentPlayer();
    scoreModel = new Backbone.Model({
      score: player.get("score"),
      points: envelope.model.get("number"),
      symbol: envelope.model.get("action")
    });
    this.answerModalView = new CMN.Views.AnswerModal({
      model: scoreModel
    });
    this.answerModalView.on("answer:correct", ((function(_this) {
      return function() {
        var winner, _WINNING_MESSAGE;
        _this.answerModal.close;
        _answerModalOpen = false;
        if (_this.envelopes.allOpen()) {
          _this.createEnvelopes();
        }
        _this.answerModal.$el.css("display", "none");
        _this.updatePlayerScore(scoreModel);
        winner = _this.checkForWinner();
        if (winner) {
          player = _this.getCurrentPlayer();
          _WINNING_MESSAGE = "Congratulations " + (player.get("name")) + ", You Win!";
          _this.showMessage(_WINNING_MESSAGE);
          return setTimeout((function() {
            return _this.restart();
          }), 3000);
        } else {
          _this.showSuccessMessage();
          return _this.changePlayer();
        }
      };
    })(this)));
    _answerModalOpen = true;
    this.answerModal.show(this.answerModalView);
    return this.answerModal.$el.css("display", "block");
  };

  game.addInitializer(function(options) {
    return this.selectPlayers();
  });

  game.restart = function() {
    this.selectPlayersView = new CMN.Views.ChoosePlayers();
    this.selectPlayersView.on("playersselected", this.createPlayers, this);
    this.selectPlayersView.on("playersselected", this.createEnvelopes, this);
    this.selectPlayers();
    return this.scores.close();
  };

  CMN.game = game;

}).call(this);
