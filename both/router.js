Router.configure({
  layoutTemplate: 'AppLayout'
});

Router.route('/', function() {
  this.redirect('/nominees/all');
}, {
  name: 'home'
});

Router.route('/nominee/:id', function() {
  var id = this.params.id;
  this.wait(Meteor.subscribe('nominee', id));

  if(this.ready()) {
    var nominee = Nominees.findOne(id);

    nominee.comments = Comments.find({nominee_id: id}, {sort: {created_at: -1}});
    if(this.params.query) nominee.goto = this.params.query;

    this.render('NomineeProfile', {data: nominee});
  } else
    this.render('loading');
}, {
  name: 'nomineeProfile'
});

Router.route('/nominees/:category', function() {
  var category = this.params.category || 'all';

  this.wait(Meteor.subscribe('nominees'));

  if(this.ready()) {
    var filter = category == 'all' ? {} : {type: category};

    // var nominees = Nominees.find(filter);
    var search = Session.get('homeSearch') ? Session.get('homeSearch') : '';

    var nominees = _.reject(Nominees.find(filter).fetch(), function(nom) {
      var str = nom.first_name + ' ' + nom.last_name + ' ' + nom.type;
      return str.toLowerCase().indexOf(search) < 0;
    });

    var notices = Notices.find();

    this.render('home', {data: {category: category, nominees: nominees, notices: notices}});
  } else
    this.render('loading');

}, {
  name: 'nominees'
});


Router.route('/add-nominee', function() {
  this.render('AddNominee');
});

Router.route('/add-notice', function() {
  this.render('AddNotice');
});

Router.route('/login', function() {
  var data = {};

  if(this.params.query)
    data.query = this.params.query;

  if(Meteor.user() && Roles.userIsInRole(Meteor.userId(), ['admin']))
    this.redirect('/admin');
  else if (Meteor.user() && !data.query.next)
    this.redirect('/');
  else
    this.render('login', {data: data});
});

Router.route('/logout', function() {
  Meteor.logout(function(){
    this.redirect('/');
  }.bind(this));
});

Router.route('/admin', function() {
  if(!Meteor.user() || !Roles.userIsInRole(Meteor.userId(), ['admin'])) {
    this.redirect('/login');
    return;
  }

  this.wait(Meteor.subscribe('nominees'));

  if(this.ready()) {
    var nominees = Nominees.find({}, { sort: { vote_count: -1 }});

    var search = Session.get("adminSearch") ? Session.get("adminSearch") : '';

    nominees = _.reject(nominees.fetch(), function(nom) {
      var str = nom.type + ' ' + nom.first_name + ' ' + nom.last_name;
      return str.toLowerCase().indexOf(search) < 0;
    });

    this.render('AdminDashboard', {data: {nominees: nominees}});
  } else
    this.render('loading');
}, {
  name: 'admin'
});

Router.route('/new/nominees/:category', function() {
  var category = this.params.category;
  if(Meteor.user() || Roles.userIsInRole(Meteor.userId(), ['admin']))
    this.render(category);
  else
    this.redirect('login');
});

Router.route('/participate', function(){
  if(! Meteor.user()) {
    Router.go('login', {}, {query: 'next=/participate'});
    return;
  }

  this.redirect('/participate/volunteer');
})

Router.route('/participate/:category', function() {
  var category = this.params.category || 'volunteer';

  var templates = {volunteer: 'volunteer', ngo: 'ngo', corporate: 'corporate'};

  this.render(templates[category]);
});

Router.route('/admin/edit/:id', function() {
  var id = this.params.id;
  if(Meteor.user() || Roles.userIsInRole(Meteor.userId(), ['admin'])) {
    this.wait(Meteor.subscribe('nominee', id));

    if(this.ready()) {
      var nominee = Nominees.findOne(id);
      nominee.update = true;
      var category = nominee.type;
      this.render(category, {data: nominee});
      // this.render('NomineeProfile', {data: nominee});
    } else
      this.render('loading');
  }
  else
    this.redirect('login');

});
