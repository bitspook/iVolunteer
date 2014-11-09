Template.AdminDashboard.helpers({
  disableMe: function() {

    return Session.get('snCount') >= 10  ? 'disabled' : false;
  },
  compIsInSelection: function() {
    return Competition.isSelection();
  }
});

Template.AdminDashboard.rendered = function() {
  var selectedCount = Nominees.find({selected: true}).count();
  Session.set('snCount', selectedCount);
};

Template.AdminDashboard.events({
  'click .remove': function(event, template) {
    var id = $(event.currentTarget).data('id');
    var nominee = Nominees.findOne(id);
    var response = confirm('Are you sure you want to delete "' + nominee.first_name + '" ? This is an irreversible operation.');
    if (!response) return false;

    nominee.remove();
  },

  'click .edit': function(event, template) {
    event.preventDefault();
    var url = event.target.href.replace(/.*\/\/[^\/]*/, '');
    // console.log('url', url);
    Router.go(url);
  },

  'mousedown .nominee': function(event, template) {
    event.preventDefault();

    if(event.target.tagName !== 'INPUT') {
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
  },
  'change .selected-nominee': function(event, template) {
    event.preventDefault();

    var el = $(event.currentTarget).data('id');
    Nominees.findOne(el).toggleSelect();
  },
  'keyup #adminSearch': function() {
    var query = $("#adminSearch").val().trim();
    Session.set("adminSearch", query);
  }
});
