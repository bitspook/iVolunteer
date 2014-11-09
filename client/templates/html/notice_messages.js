Template.NoticeMessage.helpers({
  typeClass: function() {
    var prefix = 'alert-';
    return this.type === 'good' ? prefix + 'success' : prefix + this.type;
  },
  fontClass: function() {
    var prefix = 'fa-';
    return this.type === 'good' ? prefix + 'check' : prefix + this.type;
  }
});


Template.NoticeMessage.events({
  "click .danger": function() {
    Notices.findOne(this._id).remove();
  }
});
