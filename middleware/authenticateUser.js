const passport = require('passport');

const authenticateUser = passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/',
    failureMessage: true,
});

module.exports = authenticateUser;