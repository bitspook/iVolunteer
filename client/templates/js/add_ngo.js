Template.ngo.helpers({
  currentYear: function() {
    return Competition.current();
  }
});

Template.ngo.events({
    'submit form': function(event, Template) {
        event.preventDefault();
        var currentTarget = event.currentTarget;
        var ngo = this._id ? Nominees.findOne(this._id) : new Nominee();
        var values = [];
        for(var i=0; i < 6; i++) {
          values.push(currentTarget[i].value);
        }

        ngo.first_name = $('#firstName').val();
        ngo.last_name = $('#lastName').val();
        ngo.email = $('#email').val();
        ngo.competition = $('#competition').val();
        ngo.location = $("#location").val();
        ngo.image = $('#image').val();
        ngo.description = $('textarea#textarea').val();
        ngo.type = 'ngo';
        ngo.owner_id = Meteor.userId();

        ngo.save();
        Router.go('admin');
    }
})