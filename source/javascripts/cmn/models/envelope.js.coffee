class CMN.Envelope extends Backbone.Model
  initialize: (options) ->
    action = options.action
    number = options?.number || Math.floor(Math.random() * 20) + 1
    number *= -1 if action is "negative"
    @set("number", number)
    @set("action", action)
