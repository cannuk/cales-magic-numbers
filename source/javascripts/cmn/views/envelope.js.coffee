class CMN.Views.Envelope extends Backbone.Marionette.ItemView
  template: "cmn/templates/envelope"
  className: "envelope-wrapper"
  events:
    "click": "click"

  modelEvents:
    "change:open": "open"

  intialize: (options) ->
    @size = options.envelopeSize

  templateHelpers: ->
    symbol: if @model.get("action") is "positive" then "+" else ""
    iconSymbol: if @model.get("action") is "positive" then "plus" else "minus"


  open: ->
    if @model.get("open") is true
      @$el.find(".envelope").addClass("open")
      @trigger "envelope:open"

  click: ->
    @trigger "envelope:click", {number: @model.get("number"), action: @model.get("action")}
