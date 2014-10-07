#=require ../models/envelope


class CMN.Envelopes extends Backbone.Collection
  model: CMN.Envelope

  initialize: ->
    @on "change:open", @changeOpen, this


  changeOpen: ->
    negativeOpened = @select((envelope) => envelope.get("open") == true and envelope.get("action") is "negative")
    positiveOpened = @select((envelope) => envelope.get("open") == true and envelope.get("action") is "positive")
    console.log "negativeOpened = #{negativeOpened.length} @length = #{@length}"
    console.log "positiveOpened = #{positiveOpened.length} @length = #{@length}"
    @trigger "envelopes:opened" if negativeOpened.length == (@length/2) or positiveOpened.length == (@length/2)




