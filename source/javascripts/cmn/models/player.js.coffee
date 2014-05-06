#=require ../init


class CMN.Player extends Backbone.Model

  initialize: (options) ->
    @set("score", 0)
    @set("name", options.playerName)




