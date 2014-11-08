/**
 * Atrributes:
 *
 * * nominee_id
 * * competition
 * * commenter_id
 * * comment
 * * created_at
 */

Comments = new Mongo.Collection('notice');

Comment = Model(Comments);

Comment.extend({

});
