Template.AdminDashboard.helpers({
	votes: function() {
		return {
			call: 23,
			web: 98,
			sms: 124
		};
	}
});

Template.AdminDashboard.events({
	'click .remove': function(event, template) {
		var id = $(event.currentTarget).data('id');
		var nominee = Nominees.findOne(id);
		var response = confirm('Are you sure you want to delete "' + nominee.first_name + '" ? This is an irreversible operation.');
        if (!response) return false;

		nominee.remove();
	}
})