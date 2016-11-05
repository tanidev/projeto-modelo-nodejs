var models = require("../models");
var moment = require("moment");

exports.show = function(req, res){
  models.contatos.findOne({
    where: {
      id: req.params.id,
      usuario_id: req.user.id
    }
  }).then(function(contato) {
    res.render("contatos/show", {contato: contato});
  });
}

exports.create = function(req, res) {
  res.render("contatos/form", {create: true});
}

exports.edit = function(req,res) {
  models.contatos.findOne({
    where: {
      id: req.params.id,
      usuario_id: req.user.id
    }
  }).then(function(contato) {
    contato.aniversario = moment(contato.aniversario).format("DD/MM/YYYY");
    res.render("contatos/form", {contato: contato});
  });
}

exports.save = function(req, res) {

  var contatoValidator = require("../validators/contatoValidator");

  if(!contatoValidator(req,res)) {
    var contato = models.contatos.build(req.body);
    contato.usuario_id = req.user.id;

    contato.save()
              .then(function(contato) {
                req.flash("success", "Contato: " + contato.nome + " cadastrado com sucesso!");
                res.status(200).redirect("/");
              })
              .catch(function(error) {
                req.flash("error", "Não foi possivel cadastrar esse contato");
                res.status(500).redirect("/contatos/form", {create: true});
              });
  } else {
    res.render("contatos/form", {contato: req.body, errors: req.validationErrors(true), create:true});
  }


}

exports.update = function(req, res) {

  var contatoValidator = require("../validators/contatoValidator");

  if(!contatoValidator(req,res)) {

    models.contatos.findOne({
      where: {
        id: req.params.id,
        usuario_id: req.user.id
      }
    }).then(function(contato) {
      return contato.update(req.body);
    }).then(function(contato) {
      req.flash("success", "Contato: " + contato.nome + " atualizado com sucesso!");
      res.status(200).redirect("/");
    })
    .catch(function(error) {
      req.flash("error", "Não foi possivel atualizar esse contato");
      res.status(500).redirect("/contatos/form/", {contato: req.body});
    });

  } else {
    res.render("contatos/form", {contato: req.body, errors: req.validationErrors(true)});
  }

}

exports.delete = function(req, res) {
  models.contatos.findById(req.params.id).then(function(contato){
    return contato.destroy();
  }).then(function() {
    req.flash("success", "Contato excluido com sucesso!");
    res.status(200).redirect("/");
  });
}
