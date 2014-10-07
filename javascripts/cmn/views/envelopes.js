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
      s.innerHTML = ".envelope{height: " + e.h + "px; width: " + e.w + "px;} .envelope .flap,.envelope:after{border-width: " + (Math.round(e.h / 2)) + "px " + (Math.round(e.w / 2)) + "px} .envelope .paper{ width: " + (Math.round(e.w - 12)) + "px; height: " + (e.h - 20) + "px; }";
      return $("body").append($(s));
    };

    return Envelopes;

  })(Backbone.Marionette.CollectionView);

}).call(this);
