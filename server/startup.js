Meteor.startup(function() {
  if (Meteor.users.find().count() === 0) {
    Accounts.createUser({email: "test@test.com", password: 'test'});
    Accounts.createUser({email: 'admin@admin.com', password: 'admin'});
  }

  if(Nominees.find().count() === 0) {
    var n1 = new Nominee();
    n1.first_name = "Nominee",
    n1.last_name = "1",
    n1.nominee_slug = 'nominee_1',
    n1.type = 'volunteer',
    n1.competition = 2014,
    n1.vote_count = 0,
    n1.email = 'vol1@vol.com',
    n1.description = (function() {
      var desc = [] ;
      _(100).times(function() {
        desc.push('bla ');
      });
      return desc.join();
    })();
    n1.save();

    var n2 = new Nominee();
    n2.first_name = "Nominee",
    n2.last_name = "2",
    n2.nominee_slug = 'nominee_2',
    n2.type = 'ngo',
    n2.competition = 2014,
    n2.vote_count = 0,
    n2.email = 'ngo@ngo.com',
    n2.description = (function() {
      var desc = [] ;
      _(100).times(function() {
        desc.push('bla ');
      });
      return desc.join();
    })();
    n2.save();
  }

  if(Meteor.roles.find().count() === 0) {
    Roles.createRole('user');
    Roles.createRole('admin');
  }
});
