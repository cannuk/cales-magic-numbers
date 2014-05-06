#= require ../models/player

class CMN.Players extends Backbone.Collection
  model: CMN.Player
  activePlayer: -1

  generate: (players) ->
    p = []
    x = 0
    while p.length < players
      p.push
        playerName: "Player #{x+1}"
        playerNumber: (x+1)
        score: 0
        turns: 0
        active: false
      x++
    @add p

  setActivePlayer: ->
#   set the current active to false
    @at(@activePlayer).set("active", false) if @activePlayer >= 0
#   increment the activePlayer index
    if (@activePlayer + 1) > @length
      @activePlayer = 0
    else
      @activePlayer++
#   now set the new active to true
    @at(@activePlayer).set("active", true)

  getActivePlayer: ->
    @at(@activePlayer)


