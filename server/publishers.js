Meteor.publish('nominees', function(limit) {
  limit = limit || 30;

  return Nominees.find({}, {limit: limit});
});

Meteor.publish("nominee", function(nominee_id) {
  if(! nominee_id) return false;

  return Nominees.findOne(nominee_id);
});
