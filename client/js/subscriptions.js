Meteor.subscribe("nominees", Session.get("nominee_limit"));

Meteor.subscribe("nominee", Session.get("selected_nominee"));
