class CMN.Views.AnswerModal extends Backbone.Marionette.ItemView
  template: "cmn/templates/answer_modal"
  className: "answer-modal"

  ui:
    answer: "#total_answer"
    answerFormContainer: ".answer-form-container"

  events:
    "click .btn-answer": "submitAnswer"

  templateHelpers: ->
    operator: if @model.get("symbol") is "positive" then "+" else ""

  onShow: ->
    @ui.answer.removeClass("correct incorrect")
    setTimeout((=> @ui.answer.focus()), 500)

  submitAnswer: ->
    @ui.answer.removeClass("correct incorrect")
    if @answerCorrect()
      @ui.answer.addClass("correct")
      @trigger "answer:correct"

    else
      @ui.answer.addClass("incorrect")
      @trigger "answer:incorrect"


  answerCorrect: ->
      (@model.get("points") + @model.get("score")) == parseInt(@ui.answer.val())




