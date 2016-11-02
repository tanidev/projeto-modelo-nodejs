var models = require("../models");

exports.index = function(req, res) {

  models.usuarios.findById(req.user.id, {include: [ models.contatos ]}).then(function(usuario) {
    res.render("index", {contatos: usuario.contatos, user: req.user});
  });
}
exports.search = function(req,res) {
  models.contatos.findAll({
    where: {
      usuario_id: req.user.id,
      $or: {
        nome: {
          $iLike: req.body.field + "%"
        },
        telefonefixo: {
          $iLike: "%" + req.body.field + "%"
        },
        telefonecelular: {
          $iLike: "%" + req.body.field + "%"
        },
        telefonecomercial: {
          $iLike: "%" + req.body.field + "%"
        }
      }
    }
  }).then(function(contatos) {
    if(contatos.length > 0) {
      req.flash("info", "Resultado da pesquisa: " + contatos.length + " contato(s) encontrado(s).");
      res.render("index", {contatos: contatos, user: req.user});
    } else {
      req.flash("info", "Nenhum contato foi encontrado!");
      res.render("index", {user: req.user});
    }
  });
}
