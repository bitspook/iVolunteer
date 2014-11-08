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

        ngo.first_name = values[0];
        ngo.last_name = values[1];
        ngo.email = values[2];
        ngo.competition = values[3];
        ngo.location = values[4];
        ngo.image = values[5];
        ngo.description = values[6];
        ngo.type = 'ngo';
        ngo.owner_id = Meteor.userId();

        ngo.save();
        Router.go('admin');
    }
})