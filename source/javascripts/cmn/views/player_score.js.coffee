class CMN.Views.PlayerScore extends Backbone.Marionette.ItemView
  template: "cmn/templates/player_score"
  tagName: "li"
  className: "player-score"

  modelEvents:
    "change": "render"

  onRender: ->
    if @model.get("active") is true
      f = =>@$el.addClass "active"
    else
      f = =>@$el.removeClass "active"
    setTimeout(f, 200)

