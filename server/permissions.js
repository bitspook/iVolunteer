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
