const passport = require('passport');

const authenticateUser = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
    failureMessage: true,
});

module.exports = authenticateUser;