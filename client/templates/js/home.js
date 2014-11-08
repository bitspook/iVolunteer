Template.home.helpers({

});

Template.home.events({
  'click .vote-nominee': function(e) {
    e.preventDefault();
    if (!Meteor.user())
      Router.go('login',{}, {query: "next='home'"});
    else
      Meteor.user().vote(this._id, 'web');
  }
});
