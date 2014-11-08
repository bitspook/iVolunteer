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
    comment.commenter_name = Meteor.user().fullName();
    comment.save();

    document.getElementById("currComment").value = '';
  }
});
