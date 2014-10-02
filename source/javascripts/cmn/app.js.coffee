#=require ./init
#=require_directory ./collections
#=require_directory ./models
#=require_directory ./views

game = new Backbone.Marionette.Application();

_WINNING_SCORE = 21
_successMessages = [
  "Good Job!"
  "Way to go!"
  "Awesome!"
  "Perfect!"
  "Fantastic!"
  "That's right!"
  "You got it!"
]

game.addRegions
  main: ".main"
  scores: ".scores-container"
  answerModal: ".answer-modal-container"

game.showView = (view) ->
  @main.show(view)


game.showSuccessMessage =  ->
  message = _successMessages[Math.floor(Math.random() * _successMessages.length)]
  $("h1.success-message-text").html(message)
  $(".success-message-container").addClass("visible")
  setTimeout((=>
    $(".success-message-container").removeClass("visible")
  ), 1700)



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

game.updatePlayerScore = (model) ->
  points = model.get("points")
  player = @getCurrentPlayer()
  score = player.get("score") + points
  player.set("score", score)


game.checkForWinner = ->
  player = @getCurrentPlayer()
  if player.get("score") == _WINNING_SCORE
    alert("YOU WON!!!")
    true
  else
    false


game.onResize = ->
  @envelopesView.setEnvelopeSize()


#Models and Collections
game.addInitializer (options) ->
  @envelopes = new CMN.Envelopes()

#Views
game.addInitializer (options) ->
  @selectPlayersView = new CMN.Views.ChoosePlayers()
  @selectPlayersView.on "playersselected", @createPlayers, this
  @selectPlayersView.on "playersselected", @createEnvelopes, this
  @envelopesView = new CMN.Views.Envelopes(collection: @envelopes)
  @envelopesView.on "itemview:envelope:open", @showAnswerModal, this
  @envelopesView.on "itemview:envelope:open", @checkForWinner, this
  @envelopesView.on "itemview:envelope:click", @envelopeClick, this
#  @envelopesView.on "itemview:envelope:open", (e, f) -> console.debug(e); console.debug(f)

game.addInitializer (options) ->
  $(window).resize(@onResize(), this)

game.envelopeClick = (e, f) ->
  player = @getCurrentPlayer()
  if player.get("score") < _WINNING_SCORE and e.model.get("action") is "negative"
#    show an error message
  else if player.get("score") > _WINNING_SCORE and e.model.get("action") is "positive"
#    show another error message about being over winning score
  else
    e.model.set("open", true)

game.showAnswerModal = (envelope) ->
  player = @getCurrentPlayer()
  scoreModel = new Backbone.Model(
    score: player.get("score")
    points: envelope.model.get("number")
    symbol: envelope.model.get("action")
  )
  @answerModalView = new CMN.Views.AnswerModal(model: scoreModel)
  @answerModalView.on "answer:correct", (=>
    @answerModal.close
    @answerModal.$el.css("display", "none")
    @updatePlayerScore(scoreModel)
    winner = @checkForWinner()
    unless winner
      @showSuccessMessage()
      @changePlayer()

  )
  @answerModal.show @answerModalView
  @answerModal.$el.css("display", "block")


game.addInitializer (options) ->
  @selectPlayers()


CMN.game = game



