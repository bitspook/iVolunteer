/**
 * Attributes
 * * nominee_id                 -       Mongo Id
 * * source                     -       ['web', 'sms', 'call']
 * * created_at                 -       datetime
 * * competition                -       Number (year)
 * * voter_id                   -       Mongo Id
 */

Votes = new Mongo.Collection('votes');

Vote = Model(Votes);

Vote.extend({

});
