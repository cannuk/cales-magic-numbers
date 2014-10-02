#=require ../models/envelope


class CMN.Envelopes extends Backbone.Collection
  model: CMN.Envelope

  initialize: ->
    @on "change:open", @changeOpen, this


  changeOpen: ->
    opened = @select((envelope) => envelope.get("open") == true)
    console.log "open = #{opened.length} @length = #{@length}"
    opened.length == @length


  generate: () ->
    envelopes = []
    total = 15
    while envelopes.length < total
      envelopes.push new CMN.Envelope(action: "positive")
    total += 15
    while envelopes.length < total
      envelopes.push new CMN.Envelope(action: "negative")
    envelopes = _.shuffle(envelopes)
    @add envelopes



