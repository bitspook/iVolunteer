/**
 * Atrributes:
 *
 * * created_at
 * * valid_till
 * * message
 * * type       ['warning', 'good', 'info']
 */

Notices = new Mongo.Collection('notices');

Comments.before.insert(function (userId, doc) {
  doc.created_at = moment().toDate();
});

Notice = Model(Notices);

Notice.extend({
  isValid: function() {
    return moment().toDate() < moment(this.valid_till).toDate();
  }
});
