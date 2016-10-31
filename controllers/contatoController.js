var models = require("../models");
var moment = require("moment");

exports.search = function(req,res) {
  req.flash("info", "Nenhum usuário foi encontrado!");
  res.redirect("/");
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
