Meteor.publish('nominees', function(limit) {
  limit = limit || 30;

  return Nominees.find({}, {limit: limit});
});

Meteor.publish("nominee", function(nominee_id) {
  if(! nominee_id) return false;

  Counts.publish(this, 'total_votes_for_nominee', Votes.find({nominee_id: nominee_id}));
  return Nominees.find({_id: nominee_id});
});
