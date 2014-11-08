Template.corporate.helpers({
  currentYear: function() {
    return Competition.current();
  }
});

Template.corporate.events({
    'submit form': function(event, Template) {
        event.preventDefault();
        var currentTarget = event.currentTarget;
        var corporate = this._id ? Nominees.findOne(this._id) : new Nominees();
        var values = [];
        for(var i=0; i < 6; i++) {
          values.push(currentTarget[i].value);
        }

        corporate.first_name = values[0];
        corporate.last_name = values[1];
        corporate.email = values[2];
        corporate.competition = values[3];
        corporate.location = values[4];
        corporate.image = values[5];
        corporate.description = values[6];
        corporate.type = 'corporate';
        corporate.owner_id = Meteor.userId();

        corporate.save();
        Router.go('admin');
    }
});