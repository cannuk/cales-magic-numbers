(function() { this.JST || (this.JST = {}); this.JST["cmn/templates/choose_players"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        __out.push('<div class="game-title-container">\n    <h1>Cale\'s</h1>\n    <h2>Magic Numbers!</h2>\n</div>\n\n<div class="choose-players-container">\n    <div class="row">\n        <div class="col-md-12">\n            <h3>How many players?</h3>\n        </div>\n    </div>\n    <div class="row choose-players">\n        <div>\n            <button class="players-count" value="1">1</button>\n            <button class="players-count" value="2">2</button>\n            <button class="players-count" value="3">3</button>\n            <button class="players-count" value="4">4</button>\n        </div>\n    </div>\n    <div class="row">\n        <div class="col-xs-12 form-group submit-wrapper">\n            <button type="button" class="btn btn-primary btn-lg btn-play">Lets Play!</button>\n        </div>\n    </div>\n</div>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
