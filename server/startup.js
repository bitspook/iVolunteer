Meteor.startup(function() {
  if(Meteor.roles.find().count() === 0) {
    Roles.createRole('user');
    Roles.createRole('admin');
  }
});
