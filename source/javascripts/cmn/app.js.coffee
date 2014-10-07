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

_WINNING_MESSAGE = "Congratulations you win!"
_messageTimeout = null

game.addRegions
  main: ".main"
  scores: ".scores-container"
  answerModal: ".answer-modal-container"

game.showView = (view) ->
  @main.show(view)


game.showSuccessMessage =  ->
  @showMessage(_successMessages[Math.floor(Math.random() * _successMessages.length)])

game.showMessage = (message, visibleTime = 1700) ->
  $("h1.success-message-text").html(message)
  $(".success-message-container").addClass("visible")
  clearTimeout(_messageTimeout)
  _messageTimeout = setTimeout((=>
    $(".success-message-container").removeClass("visible")
  ), visibleTime)



game.selectPlayers = ->
  @main.show @selectPlayersView

game.showEnvelopes = ->
  @main.show @envelopesView
  window.scrollTo(0,0)

game.createEnvelopes = (options) ->
  players = options.players
  if players
    @envelopes.reset(@generateEnvelopes())
    @showEnvelopes()

game.generateEnvelopes =  () ->
  envelopes = []
  total = 15
  while envelopes.length < total
    envelopes.push {action: "positive"}
  total += 15
  while envelopes.length < total
    envelopes.push {action: "negative"}
  envelopes = _.shuffle(envelopes)



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
  player.get("score") == _WINNING_SCORE

game.onResize = ->
  @envelopesView.setEnvelopeSize()


#Models and Collections
game.addInitializer (options) ->
  @envelopes = new CMN.Envelopes()
  @envelopes.on "envelopes:opened", @generateEnvelopes, this

#Views
game.addInitializer (options) ->
  @selectPlayersView = new CMN.Views.ChoosePlayers()
  @selectPlayersView.on "playersselected", @createPlayers, this
  @selectPlayersView.on "playersselected", @createEnvelopes, this
  @envelopesView = new CMN.Views.Envelopes(collection: @envelopes)
  @envelopesView.on "itemview:envelope:open", @showAnswerModal, this
  @envelopesView.on "itemview:envelope:click", @envelopeClick, this
#  @envelopesView.on "itemview:envelope:open", (e, f) -> console.debug(e); console.debug(f)

game.addInitializer (options) ->
  $(window).resize(@onResize(), this)

game.envelopeClick = (e, f) ->
  player = @getCurrentPlayer()
  if player.get("score") < _WINNING_SCORE and e.model.get("action") is "negative"
    @showMessage("Choose a <i class=\"icon icon-plus-outline\"></i> envelope", 2000)
  else if player.get("score") > _WINNING_SCORE and e.model.get("action") is "positive"
    @showMessage("Choose a <i class=\"icon icon-minus-outline\"></i> envelope", 2000)
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
    if winner
      @showMessage(_WINNING_MESSAGE)
      setTimeout((=> @selectPlayers()), 3000)
    else
      @showSuccessMessage()
      @changePlayer()

  )
  @answerModal.show @answerModalView
  @answerModal.$el.css("display", "block")


game.addInitializer (options) ->
  @selectPlayers()

game.restart = ->
  @selectPlaers()
  @scores.close()


CMN.game = game



