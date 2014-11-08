Template.volunteer.helpers({
  currentYear: function() {
    return Competition.current();
  }
});

Template.volunteer.events({
    'submit form': function(event, Template) {
        event.preventDefault();
        var currentTarget = event.currentTarget;
        var volunteer = this._id ? Nominees.findOne(this._id) : new Nominee();
        var values = [];
        for(var i=0; i < 6; i++) {
          values.push(currentTarget[i].value);
        }

        volunteer.first_name = $('#firstName').val();
        volunteer.last_name = $('#lastName').val();
        volunteer.email = $('#email').val();
        volunteer.competition = $('#competition').val();
        volunteer.location = $("#location").val();
        volunteer.image = $('#image').val();
        volunteer.description = $('textarea#textarea').val();
        volunteer.type = 'volunteer';
        volunteer.owner_id = Meteor.userId();

        volunteer.save();
        Router.go('admin');
    }
})