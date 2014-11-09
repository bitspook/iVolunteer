Template.login.isSignupForm = function() {
  return Session.get('loginForm') === 'signup';
};

Template.login.helpers({
  actionBtnTxt: function() {
    return Template.login.isSignupForm() ? 'Sign Up' : 'Sign In';
  },
  toggleFormTxt: function() {
    return Template.login.isSignupForm() ? 'or Sign In' : 'or Sign Up';
  },
  signupForm: function() {
    return Template.login.isSignupForm();
  }
});

Template.login.events({
  'submit form': function (event, template) {
    event.preventDefault();
    if(this.query && this.query.next)
      var next = this.query.next;

    var email = event.currentTarget[0].value;
    var password = event.currentTarget[1].value;
    var confirmPassword = event.currentTarget[2] && event.currentTarget[2].value;

    if(Template.login.isSignupForm()) {
      if(password !== confirmPassword) {
        alert("Passwords didn't match");
        return;
      }

      Accounts.createUser({
        email: email,
        password: password
      }, function(err) {
        if (err) {
          alert("Couldn't log in: " + err.message);
          return;
        } else
          next ? Router.go(next) : Router.go('/');

      });
    } else {
      Meteor.loginWithPassword(email, password, function(err) {
        if (err) {
          alert("Couldn't log in: " + err.message);
          return;
        } else
          next ? Router.go(next) : Router.go('/');
      });
    }
  },
  'click #toggleForm': function() {
    Session.set('loginForm', Template.login.isSignupForm() ? 'signin' : 'signup');
  }
});
