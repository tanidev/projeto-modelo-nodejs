module.exports = function(app) {

  var contatoController = app.controllers.contatoController;

  app.route("/contatos/show/:id")
          .get(contatoController.show);

  app.route("/contatos/create")
          .get(contatoController.create)
          .post(contatoController.save)

  app.route("/contatos/edit/:id")
          .get(contatoController.edit)
          .post(contatoController.update)

  app.route("/contatos/delete/:id")
          .get(contatoController.delete);




};
