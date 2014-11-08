/**
 * Attributes:
 * * first_name                                 String
 * * image                                      url
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
  updateTotalVoteCount: function() {
    this.vote_count = Counts('total_votes_for_nominee', this._id);
  }
});
