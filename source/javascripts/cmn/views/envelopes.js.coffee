class CMN.Views.Envelopes extends Backbone.Marionette.CollectionView
  itemView: CMN.Views.Envelope
  tagName: "div"
  className: "envelopes-container"

  initialize: ->
    @setEnvelopeSize()


  setEnvelopeSize: ->
    row = 5
    col = 6
    w = $(window).width() - (col*16)
    h = $(window).height() - (row*50) - 75
    e = {}
    e.w = Math.floor ((w)/col)
    e.h = Math.floor ((h)/row)
    e.h = 150 if e.h > 150
    s = document.createElement("style")
    s.type = "text/css"
    s.innerHTML = ".envelope{height: #{e.h}px; width: #{e.w}px;}
      .envelope .flap,.envelope:after{border-width: #{Math.round(e.h/2)}px #{Math.round(e.w/2)}px}
      .envelope .paper{ width: #{Math.round(e.w - 12)}px; height: #{e.h-20}px; }
      "
    $("body").append($(s))

