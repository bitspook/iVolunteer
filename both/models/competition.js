Competition = {
  current: function() {
    return moment().year();
  },
  isActive: function() {
    return /nov/i.test(moment().toDate().toString());
  },
  isSelection: function() {
    var end_date = moment("12-25-2014", "MM-DD-YYYY");

    return (! this.isActive() && moment(end_date).toDate() > moment().toDate());
  }
};
