Router.configure({
  layoutTemplate: 'AppLayout'
});

Router.route('/', function() {
  this.render('home', {});
});

Router.route('/nominee/:nomineeSlug', function() {
  var slug = this.params.nomineeSlug;
  this.render('NomineeProfile', {data: {slug: slug}});
}, {
  name: 'nomineeProfile'
});
