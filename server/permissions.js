Votes.allow({
  insert: function(userId, doc) {
    if( ! Competition.isActive())
      return false;

    var previous_vote = Votes.findOne({nominee_id: doc.nominee_id, voter_id: userId});

    if(previous_vote) {
      previous_vote.remove();
      return false;
    }

    return true;
  },
  update: function(userId, doc) {
    if( ! Competition.isActive())
      return false;
  },
  remove: function(userId, doc) {
    if( ! Competition.isActive())
      return false;

    nominee.updateTotalVoteCount();
    return doc.voter_id === userId;
  }
});

Nominees.allow({
  insert: function(userId, doc) {
    return !! Meteor.user();
  },
  update: function(userId, doc) {
    if (userId == doc.owner_id) {
      return true;
    }

    return Roles.userIsInRole(userId, ['admin']);
  },

  remove: function(userId, doc) {
    if (userId == doc.owner_id) {
      return true;
    }

    return Roles.userIsInRole(userId, ['admin']);
  }
});


Comments.allow({
  insert: function(userId, doc) {
    return !! Meteor.user();
  },
  update: function(userId, doc) {
    if (userId == doc.owner_id) {
      return true;
    }

    return Roles.userIsInRole(userId, ['admin']);
  },

  remove: function(userId, doc) {
    return (userId == doc.owner_id || Roles.userIsInRole(userId, ['admin']));
  }
});

Notices.allow({
  insert: function(userId, doc) {
    return !! Meteor.user() && Roles.userIsInRole(userId, ['admin']);
  },
  update: function(userId, doc) {
    return !! Meteor.user() && Roles.userIsInRole(userId, ['admin']);
  },

  remove: function(userId, doc) {
    return !! Meteor.user() && Roles.userIsInRole(userId, ['admin']);
  }
});
