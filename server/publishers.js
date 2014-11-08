Meteor.publish('nominees', function(limit) {
  // limit = limit;

  return Nominees.find({});
});

Meteor.publish("nominee", function(nominee_id) {
  if(! nominee_id) return false;

  Counts.publish(this, 'total_votes_for_nominee', Votes.find({nominee_id: nominee_id}));

  var nominee = Nominees.find({_id: nominee_id});
  var comments = Comments.find({nominee_id: nominee_id});

  return [nominee, comments];
});

Meteor.publish('votes_from_user', function(voterId) {
  var votes = Votes.find({voter_id: voterId});
  return votes;
});
