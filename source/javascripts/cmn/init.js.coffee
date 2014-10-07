
Backbone.Marionette.Renderer.render = (template, data) ->
  JST[template](data) if JST[template]
window.CMN ?= {}
window.CMN.Views ?= {}

