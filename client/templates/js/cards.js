
if (Meteor.isClient) {
  // This code only runs on the client
  Template.NomineeProfile.helpers({
    tasks: [
      { url: "https://44cd8574c19e363b1af4-9bfca67f877491754ae0570b8c65e031.ssl.cf1.rackcdn.com/2493308_1415214247.2011.png",
        name : "Name 1"},
      { url: "https://44cd8574c19e363b1af4-9bfca67f877491754ae0570b8c65e031.ssl.cf1.rackcdn.com/2483193_1414907861.3307.jpg",
        name:"Name 2"}
    ]
  });
}
