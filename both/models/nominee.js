/**
 * Attributes:
 * * first_name                                 String
 * * image                                      url
 * * owner_id                                   String
 * * last_name                                  String
 * * nominee_slug                               String
 * * type                                       String ['volunteer', 'ngo', 'corporate']
 * * competition                                Number (YEAR)
 * * vote_count                                 Number
 * * sex                                        String
 * * dob                                        Date
 * * email                                      Email
 * * contact_no                                 Number
 * * location                                   String
 * * profession                                 String
 * * description                                String
 */

Nominees = new Mongo.Collection('nominees');

Nominee = Model(Nominees);

Nominee.extend({
  defaultValues: {
    vote_count: 0
  },
  updateTotalVoteCount: function() {
    if(Meteor.isClient)
      this.vote_count = Counts.get('total_votes_for_nominee', this._id);
    if(Meteor.isServer)
      this.vote_count = Votes.find({nominee_id: this._id}).count();
    this.save();
  },
  fullName: function() {
    return [this.first_name, ' ', this.last_name].join('');
  },
  votingPhoneNumber: function () {
    return "09847347126";
  },
  smsToVote: function () {
    return "(+91)8282228267";
  },
  websiteURL: function () {
    return "www.xyz.com";
  }
});

Nominee.topVoted = function() {
  var topVoted = Nominees.find({}, {sort: {vote_count: 1}});
  return topVoted;
};
