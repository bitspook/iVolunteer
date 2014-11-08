Router.configure({
  layoutTemplate: 'AppLayout'
});

Router.route('/', function() {
  this.redirect('/nominees/all');
}, {
  name: 'home'
});

Router.route('/nominees/:category', function() {
  var category = this.params.category || 'all';

  this.wait(Meteor.subscribe('nominees'));

  if(this.ready()) {
    var filter = category == 'all' ? {} : {type: category};

    var nominees = Nominees.find(filter);
    this.render('home', {data: {category: category, nominees: nominees}});
  } else
    this.render('loading');

}, {
  name: 'nominees'
});

Router.route('/nominee/:id', function() {
  var id = this.params.id;
  this.wait(Meteor.subscribe('nominee', id));

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
  var data = {};

  if(this.params.query)
    data.query = this.params.query;

  if(Meteor.user() && Roles.userIsInRole(Meteor.userId(), ['admin']))
    this.redirect('/admin', data);
  else
    if (Meteor.user()) this.redirect('/',data);
  else
    this.render('login', {data: data});
});

Router.route('/logout', function() {
  Meteor.logout(function(){
    this.redirect('/login');
  }.bind(this));
});

Router.route('/admin', function() {
  this.wait(Meteor.subscribe('nominees'));

  if(this.ready()) {
    var nominees = Nominees.find({}, { sort: { vote_count: -1 }});
    this.render('AdminDashboard', {data: {nominees: nominees}});
  } else
    this.render('loading');
});

Router.route('/admin/edit/:nomineeId', function() {
  var nomineeId = this.params.nomineeId;
  this.render('AddNominee', {data: nomineeId});
});
