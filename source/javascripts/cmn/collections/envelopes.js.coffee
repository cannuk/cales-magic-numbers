#=require ../models/envelope


class CMN.Envelopes extends Backbone.Collection
  model: CMN.Envelope

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



