module.exports = function(app) {

  var contatoController = app.controllers.contatoController;

  app.route("/contatos/create")
          .get(contatoController.create)
          .post(contatoController.save)

  app.route("/contatos/delete/:id")
          .get(contatoController.delete);

  app.route("/contatos/show/:id")
          .get(contatoController.show);

};
