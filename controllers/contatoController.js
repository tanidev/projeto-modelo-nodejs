var models = require("../models");

exports.show = function(req, res){
  models.contatos.findOne({
    where: {
      id: req.params.id,
      usuario_id: req.user.id
    }
  }).then(function(value) {
    console.log(value);
    res.render("show", {contato: value});
  });
}

exports.create = function(req, res) {
  res.render("contatos/create");
}

exports.save = function(req, res) {

  var contatoValidator = require("../validators/contatoValidator");

  if(!contatoValidator(req,res)) {
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
  } else {

    // var errors = req.validationErrors();
    //
    // errors.forEach(function(e) {
    //   req.flash("warning", e.param + ":" + e.msg);
    // })

    res.render("contatos/create", {contato: req.body, errors: req.validationErrors(true)});
  }


}

exports.delete = function(req, res) {
  models.contatos.findById(req.params.id).then(function(contato){
    return contato.destroy();
  }).then(function() {
    req.flash("success", "Contato excluido com sucesso!");
    res.redirect("/");
  });
}
