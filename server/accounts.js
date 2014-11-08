Accounts.onCreateUser(function(options, user) {
  user.profile = options.profile || {};

  if(_.contains(MasterConfig.admin_emails, user.emails[0].address))
    user.roles = ['admin', 'user'];
  else
    user.roles = ['user'];

  return user;
});

Accounts.validateNewUser(function(user) {
  if(!user.emails) return false;

  return true;
});
