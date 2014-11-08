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

Router.route('/nominee/:id', function() {
  var id = this.params.id;
  this.wait('nominee', id);

  if(this.ready()) {
    var nominee = Nominees.findOne(id);
    this.render('NomineeProfile', {data: nominee});
  } else
    this.render('loading');
}, {
  name: 'nomineeProfile'
});

Router.route('/add-nominee', function() {
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

Router.route('/logout', function() {
  this.redirect('/login');
});

Router.route('/admin', function() {
  this.render("AdminDashboard");
});

Router.route('/admin/edit/:nomineeId', function() {
  var nomineeId = this.params.nomineeId;
  this.render('AddNominee', {data: nomineeId});
});
