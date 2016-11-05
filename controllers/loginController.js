var models = require("../models")

exports.login = function(req, res) {
  res.render("login", {layout: false});
};

exports.logout = function(req, res) {
  req.logout();
  res.redirect("/login");
};

exports.signup = function(req, res) {
  res.render("signup", {layout: false});
};

exports.save = function(req, res) {

  var usuario = models.usuarios.build(req.body);
  var usuarioValidator = require("../validators/usuarioValidator");

  //Create hash of the password
  usuario.senha = usuario.generateHash(req.body.password);

  if(req.body.password != req.body.passwordconfirm) {
    var errors = {};
    errors.passwordconfirm = {msg: "A confirmação não confere com a senha fornecida."}
    res.render("signup", {layout: false, usuario: req.body, errors: errors});
  } else if(!usuarioValidator(req,res)) {

      usuario.save()
              .then(function() {
                req.flash("success", "Conta criada com sucesso!");
                res.redirect("/");
              })
              .catch(function(error) {
                req.flash("error", "Não foi possivel cadastrar esse contato");
                res.redirect("/signup");
              });
  } else {
    res.render("signup", {layout: false, usuario: req.body, errors: req.validationErrors(true)});
  }
};
