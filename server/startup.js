var casual = Meteor.npmRequire('casual');

Meteor.startup(function() {
  if (Meteor.users.find().count() === 0) {
    _(10).times(function() {
      Accounts.createUser({email: casual.email, password: casual.password});
    });
    Accounts.createUser({email: "admin@admin.com", password: 'admin'});
    Accounts.createUser({email: "test@test.com", password: 'test'});
  }

  if(Nominees.find().count() === 0) {
    _(21).times(function() {
      Nominees.insert({
        first_name: casual.first_name,
        last_name: casual.last_name,
        type: Random.choice(['ngo', 'volunteer', 'corporate']),
        competition: 2014,
        vote_count: 0,
        email: casual.email,
        image: 'http://lorempixel.com/600/400/'+ Random.choice(['sports', 'food', 'city', 'people', 'cats']),

        description: casual.sentences(10)
      });
    });
  }

  if(Votes.find().count() === 0) {
    Nominees.find().forEach(function(nom) {
      _(Math.floor(Random.fraction()*100)).times(function() {
        var vote = new Vote();
        vote.voter_id = Meteor.users.findOne()._id;
        vote.nominee_id = nom._id;
        vote.source = Random.choice(['web', 'sms', 'call']);
        vote.competition = Competition.current();
        vote.save();
      });
    });
  }

  if(Meteor.roles.find().count() === 0) {
    Roles.createRole('user');
    Roles.createRole('admin');
  }
});
