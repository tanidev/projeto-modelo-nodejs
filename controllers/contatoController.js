var models = require("../models");

exports.show = function(req, res){
  console.log(req.query.id);
  models.contatos.findById(req.query.id, {
    where: {
      usuario: req.user
    }
  }).then(function(contato) {
    console.log(contato);
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
              req.flash("info", "Contato: " + contato.nome + " cadastrado com sucesso!");
              res.redirect("/");
            })
            .catch(function(error) {
              req.flash("error", "Não foi possivel cadastrar esse contato");
              res.redirect("/contatos/create");
            });
}
