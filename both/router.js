Router.configure({
  layoutTemplate: 'AppLayout'
});

Router.route('/', function() {
  this.redirect('/nominees/all');
});

Router.route('/nominees/:category', function() {
  var category = this.params.category || 'all';
  this.render('home', {data: {category: category}});
}, {
  name: 'nominees'
});

Router.route('/nominee/:nomineeSlug', function() {
  var slug = this.params.nomineeSlug;
  this.render('NomineeProfile', {data: {slug: slug}});
}, {
  name: 'nomineeProfile'
});

Route.route('/add-nominee', function() {
  this.render('AddNominee');
});

Router.route('/login', function() {
  if(Meteor.user() && Roles.userIsInRole(Meteor.userId(), ['admin']))
    this.redirect('/admin');
  else
    if (Meteor.user()) this.redirect('/');
  else
    this.render('login');
});

Router.route('/admin', function() {
  this.render("AdminDashboard");
});

Router.route('/admin/edit/:nomineeId', function() {
  var nomineeId = this.params.nomineeId;
  this.render('AddNominee', {data: nomineeId});
});
