#=require ./init
#=require_directory ./collections
#=require_directory ./models
#=require_directory ./views

game = new Backbone.Marionette.Application();

game.addRegions
  main: ".main"

game.showView = (view) ->
  @main.show(view)


game.selectPlayers = ->
  @main.show @selectPlayersView

game.showEnvelopes = ->
  @main.show @envelopesView
  window.scrollTo(0,0)

game.createEnvelopes = (options) ->
  players = options.players
  @showEnvelopes()
  @envelopes.generate(players) if players

game.createPlayers = (options) ->
  playersCount = options.players
  @players = new CMN.Players
  @players.generate(playersCount) if playersCount
  @players.setActivePlayer()


#Models and Collections
game.addInitializer (options) ->
  @envelopes = new CMN.Envelopes()

#Views
game.addInitializer (options) ->
  @selectPlayersView = new CMN.Views.ChoosePlayers()
  @selectPlayersView.on "playersselected", @createPlayers, this
  @selectPlayersView.on "playersselected", @createEnvelopes, this
  @envelopesView = new CMN.Views.Envelopes(collection: @envelopes)

game.addInitializer (options) ->
  @selectPlayers()


CMN.game = game



