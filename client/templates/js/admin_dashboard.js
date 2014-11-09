Template.AdminDashboard.helpers({
  // votes: function() {
  //   Meteor.subscribe('vote_counts_for_nominee', this.id);
  // }
});

Template.AdminDashboard.events({
  'click .remove': function(event, template) {
    var id = $(event.currentTarget).data('id');
    var nominee = Nominees.findOne(id);
    var response = confirm('Are you sure you want to delete "' + nominee.first_name + '" ? This is an irreversible operation.');
    if (!response) return false;

    nominee.remove();
  },

  'click .nominee': function(event, template) {
    event.preventDefault();
    var id = $(event.currentTarget).data('id');

    Meteor.subscribe('votes_for_nominee', id);

    var nominee = Nominees.findOne(id);
    var allVotes = Votes.find({nominee_id: id});

    var votes = {
      calls: Votes.find({nominee_id: id, source: 'calls'}).count(),
      sms: Votes.find({nominee_id: id, source: 'sms'}).count(),
      web: Votes.find({nominee_id: id, source: 'web'}).count()
    };

    var salesData=[
      {label:"calls", color:"#3366CC"},
      {label:"sms", color:"#FF9900"},
      {label:"web", color:"#DC3912"}
    ];

    Donut3D.draw("d3-chart", randomData(), 150, 150, 130, 100, 30, 0.4);
    function randomData(){
      return salesData.map(function(d){
        return { label:d.label, value: votes[d.label], color:d.color };
      });
    }
  }
});
