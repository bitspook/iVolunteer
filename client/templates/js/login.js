Template.login.events({
  'submit form': function (event, template) {
    if(this.query && this.query.next)
      var next = this.query.next;


    event.preventDefault();
    var user = event.currentTarget[0].value;
    var password = event.currentTarget[1].value;
    Meteor.loginWithPassword(user, password, function(err) {
      if (err) {
        console.error('error', err);
      } else
        Router.go(next);
    });
  }
});
