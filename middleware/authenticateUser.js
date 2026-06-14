const passport = require('passport');

// passport authentication
const authenticateUser = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
    failureMessage: true,
});

module.exports = authenticateUser;