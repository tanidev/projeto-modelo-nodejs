var models = require("../models");

exports.show = function(req, res){
  models.contatos.find({
    where: {
      id: req.params.id,
      usuario_id: req.user.id
    }
  }).then(function(contato) {
    res.render("contatos/show", {contato: contato});
  });
}

exports.create = function(req, res) {
  res.render("contatos/create");
}

exports.save = function(req, res) {

  var contato = models.contatos.build(req.body);
  contato.usuario_id = req.user.id;

  contato.save()
            .then(function() {
              req.flash("success", "Contato: " + contato.nome + " cadastrado com sucesso!");
              res.redirect("/");
            })
            .catch(function(error) {
              req.flash("error", "Não foi possivel cadastrar esse contato");
              res.redirect("/contatos/create");
            });
}

exports.delete = function(req, res) {
  models.contatos.findById(req.params.id).then(function(contato){
    return contato.destroy();
  }).then(function() {
    req.flash("success", "Contato excluido com sucesso!");
    res.redirect("/");
  });
}
