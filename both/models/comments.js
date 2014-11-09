/**
 * Atrributes:
 *
 * * nominee_id
 * * competition
 * * commenter_id
 * * comment
 * * created_at
 * * commenter_name
 */

Comments = new Mongo.Collection('comments');

Comments.before.insert(function (userId, doc) {
  doc.created_at = moment().toDate();
});


Comment = Model(Comments);

Comment.extend({

});
