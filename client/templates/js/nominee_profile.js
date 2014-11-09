Template.NomineeProfile.rendered = function () {
  var goto = location.href.indexOf('?') > 0 && location.href.split('?')[1].split('=')[1];
  if(!goto) return;

  $('html, body').animate({
          scrollTop: $("#comments-row").offset().top
  }, 600);
};

Template.NomineeProfile.events({
  "submit #comment-form": function(e) {
    e.preventDefault();

    if(!Meteor.user()) {
      Router.go('login', {}, {query: 'next='+Router.path('nomineeProfile', {id: this._id})});
      return;
    }

    window.ct = e.currentTarget;
    var text = document.getElementById("currComment").value.trim();

    if(! text) {
      alert("Please Enter Comment");
      return;
    }

    var comment = new Comment();
    comment.nominee_id = this._id;
    comment.competition = this.competition;
    comment.commenter_id = Meteor.userId();
    comment.comment = text;
    comment.commenter_name = Meteor.user().emails[0].address.split('@')[0];
    comment.save();

    document.getElementById("currComment").value = '';
  },
  "click .vote": function() {
    Meteor.user().vote(this._id);
  }
});

Template.NomineeProfile.helpers({
  votedClass: function() {
    //we can subscribe here because templates are reactive
    Meteor.subscribe('votes_from_user', Meteor.userId());
    var suffix = Meteor.user()
          ? Meteor.user().hasAlreadyVoted(this._id)
          ? 'success'
          : 'danger'
        : 'success';

    return 'btn-'+suffix;
  }
});
