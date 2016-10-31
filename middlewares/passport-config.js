var Strategy = require('passport-local').Strategy;

module.exports = function(passport, db) {
  passport.use("local-login", new Strategy(
    function(username, password, done) {

      db.usuarios.findOne({where : {email : username}})
        .then(function(user) {
          if (!user) {
            return done(null, false);
          }
          if (!user.validPassword(password)) {
            return done(null, false);
          }

          return done(null, user);
        }).catch(function(err) {
          return done(err);
        });

  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    db.usuarios.findById(id).then(function(user) {
        done(null, user);
    });
  });
};
