/**
 * Attrubutes:
 *
 */

User = Model(Meteor.users);


User.extend({
  vote: function(nominee_id, source) {
    var vote = new Vote();
    vote.voter_id = this._id;
    vote.nominee_id = nominee_id;
    vote.source = source || 'web';
    vote.competition = Competition.current();
    vote.save();
  },
  hasAlreadyVoted: function(nomineeId) {
    return !! Votes.findOne({nominee_id: nomineeId, voter_id: this._id});
  },
  isAdmin: function() {
    return (Meteor.user() && Roles.userIsInRole(Meteor.userId(), ['admin']));
  }
});
