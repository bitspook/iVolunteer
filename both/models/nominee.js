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
 * *
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
  },
  isTopVoted: function() {
    var topVotedIds = Nominee.topVoted().map(function(doc) {
      return doc._id;
    });

    return _.contains(topVotedIds, this._id);
  },
  isSelected: function() {
    var alreadySelectedIds = Nominees.find({selected: true}, {limit: 10}).map(function(doc) {
      return doc._id;
    });

    return _.contains(alreadySelectedIds, this._id);
  },
  saveTopVoted: function() {
    Nominee.topVoted().forEach(function(doc) {
      doc.selected = true;
      doc.save();
    });
  },
  toggleSelect: function() {
    var selectedCount = Nominees.find({selected: true}).count();

    if(Meteor.isClient)
      Session.set('snCount', selectedCount);

    // if(selectedCount < 5)
    //   this.saveTopVoted();

    if(selectedCount > 10 && !this.selected) return false;

    this.selected = !this.selected;
    this.save();
  }
});

Nominee.topVoted = function() {
  var topVoted = Nominees.find({}, {sort: {vote_count: -1}, limit: 5});
  return topVoted;
};
