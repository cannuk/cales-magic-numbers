class CMN.Views.Envelope extends Backbone.Marionette.ItemView
  template: "cmn/templates/envelope"
  className: "envelope-wrapper"
  events:
    "click": "open"

  intialize: (options) ->
    @size = options.envelopeSize

  templateHelpers: ->
    symbol: if @model.get("action") is "positive" then "+" else "-"
    iconSymbol: if @model.get("action") is "positive" then "plus" else "minus"


  open: ->
    @$el.find(".envelope").toggleClass("open")
