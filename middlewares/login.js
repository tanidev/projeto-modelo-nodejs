var publicUrls = ['/login', '/signup']

module.exports = function(req, res, next) {
  console.log("Autenticando!");
  if(req.isAuthenticated() && publicUrls.indexOf(req.url) > -1) {
    res.redirect("/");
  } else if(req.isAuthenticated() || publicUrls.indexOf(req.url) > -1) {
    next();
  } else {
    res.redirect("/login");
  }
};
