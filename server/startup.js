Meteor.startup(function() {
  if (Meteor.users.find().count() === 0) {
    Accounts.createUser({email: "test@test.com", password: 'test'});
    Accounts.createUser({email: 'admin@admin.com', password: 'admin'});
  }


  if(Meteor.roles.find().count() === 0) {
    Roles.createRole('user');
    Roles.createRole('admin');
  }
});
