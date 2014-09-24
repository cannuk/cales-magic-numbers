#=require ./init
#=require_directory ./collections
#=require_directory ./models
#=require_directory ./views

game = new Backbone.Marionette.Application();

game.currPlayer = 0
game._WINNING_SCORE = 21

game.addRegions
  main: ".main"
  scores: ".scores-container"

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
  @scoresBar = new CMN.Views.ScoresBar(collection: @players)
  @scores.show @scoresBar

game.changePlayer = ->
  @players.setActivePlayer()


game.getCurrentPlayer = ->
  @players.getActivePlayer()

game.updatePlayerScore = (e) ->
  points = e.model.get("number")
  player = @getCurrentPlayer()
  score = player.get("score") + points
  player.set("score", score)


#Models and Collections
game.addInitializer (options) ->
  @envelopes = new CMN.Envelopes()

#Views
game.addInitializer (options) ->
  @selectPlayersView = new CMN.Views.ChoosePlayers()
  @selectPlayersView.on "playersselected", @createPlayers, this
  @selectPlayersView.on "playersselected", @createEnvelopes, this
  @envelopesView = new CMN.Views.Envelopes(collection: @envelopes)
  @envelopesView.on "itemview:envelope:open", @updatePlayerScore, this
  @envelopesView.on "itemview:envelope:click", @envelopeClick, this
#  @envelopesView.on "itemview:envelope:open", (e, f) -> console.debug(e); console.debug(f)

game.envelopeClick = (e, f) ->
  player = @getCurrentPlayer()
  if player.get("score") < @_WINNING_SCORE and e.model.get("action") is "negative"
#    show an error message
  else
    e.model.set("open", true)

game.addInitializer (options) ->
  @selectPlayers()


CMN.game = game



