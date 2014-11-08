Template.volunteer.helpers({
  currentYear: function() {
    return Competition.current();
  }
});

Template.volunteer.events({
    'submit form': function(event, Template) {
        event.preventDefault();
        var currentTarget = event.currentTarget;
        var volunteer = this._id ? Nominees.findOne(this._id) : new Nominees();
        var values = [];
        for(var i=0; i < 6; i++) {
          values.push(currentTarget[i].value);
        }

        volunteer.first_name = values[0];
        volunteer.last_name = values[1];
        volunteer.email = values[2];
        volunteer.competition = values[3];
        volunteer.location = values[4];
        volunteer.description = values[5];
        volunteer.type = 'volunteer';
        volunteer.owner_id = Meteor.userId();

        volunteer.save();
        Router.go('admin');
    }
})