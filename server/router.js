const Authentication = require('./controllers/authentication');

const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false});
const requireLogin = passport.authenticate('local', { session: false});

module.exports = function(app) {
    app.get('/', requireAuth, function(req, res) {
        res.send({ message: 'Super secret code ABC123'})
    });
    app.post('/login', requireLogin, Authentication.login);
    app.post('/register', Authentication.register);

    //Get all registered users route
    app.get('/api/users', Authentication.getAllUsers);
}