module.exports = function(app) {

  var contatoController = app.controllers.contatoController;
  app.route("/search")
          .post(contatoController.search);

  app.route("/contatos/show")
          .get(contatoController.show);

};
