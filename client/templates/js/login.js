Template.login.events({
  'click .my-button': function (event, template) {
    alert("My button was clicked!");
  },

  'submit form': function (event, template) {
    event.preventDefault();
    var user = event.currentTarget[0].value;
    var password = event.currentTarget[1].value;
    Meteor.loginWithPassword(user, password, function(err, data) {
      if (err) {
        console.error('error', err);
      }
    });
  }
});