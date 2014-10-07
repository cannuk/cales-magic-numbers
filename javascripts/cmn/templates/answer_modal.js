(function() { this.JST || (this.JST = {}); this.JST["cmn/templates/answer_modal"] = function(__obj) {
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
        __out.push('<div class="answer-form-container">\n    <div>\n        <span class="current-score">');
      
        __out.push(__sanitize(this.score));
      
        __out.push('</span>\n    </div>\n    <div>\n        <span class="symbol">');
      
        __out.push(__sanitize(this.operator));
      
        __out.push('</span>\n        <span class="points">');
      
        __out.push(__sanitize(this.points));
      
        __out.push('</span>\n    </div>\n    <div class="total row">\n        <div class="pull-right">\n            <input class="form-control" type="text" id="total_answer"/>\n        </div>\n    </div>\n    <div class="row">\n        <div class="">\n            <button class="btn btn-answer">Answer</button>\n        </div>\n    </div>\n</div>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
