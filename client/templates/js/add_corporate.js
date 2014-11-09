Template.corporate.helpers({
  currentYear: function() {
    return Competition.current();
  }
});

Template.corporate.events({
    'submit form': function(event, Template) {
        event.preventDefault();
        var currentTarget = event.currentTarget;
        var corporate = this._id ? Nominees.findOne(this._id) : new Nominee();
        var values = [];
        for(var i=0; i < 6; i++) {
          values.push(currentTarget[i].value);
        }

        corporate.first_name = $('#firstName').val();
        corporate.last_name = $('#lastName').val();
        corporate.email = $('#email').val();
        corporate.competition = $('#competition').val();
        corporate.location = $("#location").val();
        corporate.image = $('#image').val();
        corporate.description = $('textarea#textarea').val();
        corporate.type = 'corporate';
        corporate.owner_id = Meteor.userId();
        console.log('corporate', corporate);
        corporate.save();
        Router.go('admin');
    }
});