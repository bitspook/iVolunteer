/**
 * Attrubutes:
 *
 * *
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
  unvote: function(nominee_id) {
    var vote = Votes.remove({nominee_id: nominee_id, user_id: Meteor.userId()});
  }
});
