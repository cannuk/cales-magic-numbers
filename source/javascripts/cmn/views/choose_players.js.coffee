
class CMN.Views.ChoosePlayers extends Backbone.Marionette.ItemView
  template: "cmn/templates/choose_players"
  events:
    "click .btn-play": "submit"

  submit: ->
    players = @$el.find("#players_count").val()
    return unless players?
    @trigger "playersselected", {players: players}

