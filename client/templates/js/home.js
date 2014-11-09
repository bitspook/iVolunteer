Template.home.helpers({
  votedClass: function() {
    //we can subscribe here because templates are reactive
    Meteor.subscribe('votes_from_user', Meteor.userId());
    return Meteor.user()
      ? Meteor.user().hasAlreadyVoted(this._id)
      ? 'orange'
      : 'green'
    : 'green';
  }
});

Template.home.events({
  'click .vote-nominee': function(e) {
    e.preventDefault();
    if (!Meteor.user())
      Router.go('login',{}, {query: "next=home"});
    else
      Meteor.user().vote(this._id, 'web');
  },
  'click .comment-count':function(e,tmpl) {
      e.preventDefault();
      Router.go('nomineeProfile', {id: this._id}, {query: 'goto=comments-row'})
   }
});
