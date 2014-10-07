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
