Meteor.publish('nominees', function(limit) {
  // limit = limit;

  return Nominees.find({});
});

Meteor.publish('votes_for_nominee', function(nomineeId) {
    Counts.publish(this, 'num_calls_votes', Votes.find({nominee_id: nomineeId, source: 'calls'}));
    Counts.publish(this, 'num_web_votes', Votes.find({nominee_id: nomineeId, source: 'web'}));
    Counts.publish(this, 'num_sms_votes', Votes.find({nominee_id: nomineeId, source: 'sms'}));

  return Votes.find({nominee_id: nomineeId});
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

Meteor.publish('notices', function() {
  return Notices.find();
});
