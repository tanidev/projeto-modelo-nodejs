var models = require("../models");

exports.index = function(req, res) {

  models.usuarios.findById(req.user.id, {include: [ models.contatos ]}).then(function(usuario) {
    res.render("index", {contatos: usuario.contatos, user: req.user});
  });
};
