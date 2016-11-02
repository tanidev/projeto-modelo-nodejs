module.exports = function(app) {

  var indexController = app.controllers.indexController;
  app.route("/")
          .get(indexController.index)
          .post(indexController.search);

};
