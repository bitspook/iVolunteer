Template.AddNotice.events({
  "submit form": function (event, template) {
  	event.preventDefault();
    var noticeType = event.target.noticeType.value;
    var noticeDescription = event.target.description.value;

    var n = new Notice();

    n.type = noticeType;
    n.message = noticeDescription;
    n.save();

    event.target.reset();

  }
});