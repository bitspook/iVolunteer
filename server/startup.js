Meteor.startup(function() {
  if (Meteor.users.find().count() === 0) {
    Accounts.createUser({email: "test@test.com", password: 'test'});
    Accounts.createUser({email: 'admin@admin.com', password: 'admin'});
  }

  if(Nominees.find().count() === 0) {
    _(40).times(function() {
      Nominees.insert({
        first_name: Random.id(),
        last_name: 'Nom',
        type: Random.choice(['ngo', 'volunteer', 'corporate']),
        competition: 2014,
        vote_count: Math.floor(Random.fraction()*100),
        email: 'bla'+Math.floor(Random.fraction()*10)+'@bla.com',
        image: 'http://lorempixel.com/' + Random.choice(['sports', 'food', 'city', 'people', 'cats']) + '/600/400/' ,
        description: (function() {
          var desc = [] ;
          _(100).times(function() {
            desc.push('bla ');
          });
          return desc.join();
        })()
      });
    });
  }

  if(Meteor.roles.find().count() === 0) {
    Roles.createRole('user');
    Roles.createRole('admin');
  }
});
