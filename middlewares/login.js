module.exports = function(req, res, next) {
  console.log("Autenticando!");
  if(req.isAuthenticated() && req.url == "/login") {
    res.redirect("/");
  } else if(req.isAuthenticated() || req.url == "/login") {
    next();
  } else {
    res.redirect("/login");
  }
};
