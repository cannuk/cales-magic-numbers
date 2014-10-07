#=require ./player_score

class CMN.Views.ScoresBar extends Backbone.Marionette.CollectionView
  itemView: CMN.Views.PlayerScore
  tagName: "ul"
  className: "scores-bar-container"






