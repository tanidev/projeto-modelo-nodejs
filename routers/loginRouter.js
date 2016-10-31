module.exports = function(app) {

  var loginController = app.controllers.loginController;
  var passport = app.get("passport");

  app.route("/login")
          .get(loginController.login)
          .post(function(req, res, next) {
            passport.authenticate("local-login", function(err, user, info) {
              if (err) {
                req.flash("error", "Erro ao logar no sistema!");
                return next(err);
              }
              if (!user) {
                req.flash("error", "Usuário/senha incorretos!")
                return res.redirect("/login");
              }
              req.logIn(user, function(err) {
                if (err) {
                  return next(err);
                }
                return res.redirect("/");
              });
            })(req, res, next);
          });

    app.route("/logout")
            .get(loginController.logout);

};
