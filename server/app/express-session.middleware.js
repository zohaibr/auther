var session = require('express-session');
app.use(session({
  // this mandatory configuration ensures that session IDs are not predictable
  secret: 'whatever', // or whatever you like
  // these options are recommended and reduce session concurrency issues
  resave: false,
  saveUnitialized: false
}));
