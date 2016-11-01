var models = require("../models");
var moment = require("moment");

exports.search = function(req,res) {
  models.contatos.findOne({
    where: {
      nome: {
        $iLike: req.body.field + "%"
      }
    }
  }).then(function(contato) {
    if(contato) {
      req.flash("info", "Contato encontrado!");
      res.redirect("/contatos/show?id=" + contato.id);
    } else {
      req.flash("info", "Contato não encontrado!");
      res.redirect("/");
    }
  });

}

exports.show = function(req, res){
  console.log(req.query.id);
  models.contatos.findById(req.query.id, {
    where: {
      usuario: req.user
    }
  }).then(function(contato) {
    res.render("contatos/show", {contato: contato, moment: moment});
  });
};
