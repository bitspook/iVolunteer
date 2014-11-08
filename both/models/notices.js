/**
 * Atrributes:
 *
 * * created_at
 * * valid_till
 * * message
 */

Notices = new Mongo.Collection('notices');

Notice = Model(Notices);

Notice.extend({
  isValid: function() {
    return moment().toDate() < moment(this.valid_till).toDate();
  }
});
