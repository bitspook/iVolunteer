Meteor.publish('nominees', function(limit) {
  // limit = limit;

  return Nominees.find({});
});

Meteor.publish("nominee", function(nominee_id) {
  if(! nominee_id) return false;

  return Nominees.find({_id: nominee_id});
});
