/**
 * Attributes
 * * nominee_id                 -       Mongo Id
 * * source                     -       ['web', 'sms', 'call']
 * * created_at                 -       datetime
 * * competition                -       Number (year)
 * * voter_id                   -       Mongo Id
 */

Votes = new Mongo.Collection('votes');

var updateOwnersVoteCount = function (userId, doc) {
  var nominee = Nominees.findOne(doc.nominee_id);
  nominee.updateTotalVoteCount();
};

Votes.after.insert(updateOwnersVoteCount);
Votes.after.remove(updateOwnersVoteCount);

Vote = Model(Votes);

Vote.extend({

});
