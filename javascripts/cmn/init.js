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
