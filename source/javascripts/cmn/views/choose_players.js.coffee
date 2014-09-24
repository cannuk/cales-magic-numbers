class CMN.Views.ChoosePlayers extends Backbone.Marionette.ItemView
  playersCount: 0
  template: "cmn/templates/choose_players"
  events:
    "click .btn-play": "submit"
    "click .players-count": "setPlayersCount"

  submit: ->
    return unless @playersCount > 0
    @trigger "playersselected", {players: @playersCount}


  setPlayersCount: (ev) ->
    @playersCount = $(ev.currentTarget).val()


