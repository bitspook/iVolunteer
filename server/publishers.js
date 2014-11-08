Meteor.publish('nominees', function(limit) {
  limit = limit || 30;

  return Nominees.find({}, {limit: limit});
});

Meteor.publish("nominee", function(nominee_id) {
  console.log("SUBSCRIBING TO", nominee_id);

  if(! nominee_id) return false;

  return Nominees.find({_id: nominee_id});
});
