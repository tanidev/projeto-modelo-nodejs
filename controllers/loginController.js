exports.login = function(req, res) {
  res.render("login", {layout: false});
};

exports.logout = function(req, res) {
  req.logout();
  res.redirect("/login");
};
