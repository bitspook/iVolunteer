Template.AppLayout.helpers({
  activeRoute: function(routePath) {
    if (Router.current().route._path === routePath)
      return 'active';
    return '';
  }
});
