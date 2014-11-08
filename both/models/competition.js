Competition = {
  current: function() {
    return moment().year();
  },
  isActive: function() {
    return /nov/i.test(moment().toDate().toString());
  }
};
