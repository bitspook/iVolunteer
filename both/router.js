Router.configure({
  layoutTemplate: 'AppLayout'
});

Router.route('/', function() {
  this.redirect('/nominees/all');
});

Router.route('/nominees/:category', function() {
  var category = this.params.category || 'all';

  this.wait(Meteor.subscribe('nominees'));

  if(this.ready()) {
    var filter = category == 'all' ? {} : {type: category};

    var nominees = Nominees.find(filter);
    console.log("NOMINEES ARE", nominees.fetch());
    this.render('home', {data: {category: category, nominees: nominees}});
  } else
    this.render('home');

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
