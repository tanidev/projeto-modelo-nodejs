module.exports = function(req, res) {

  req.assert("nome", "Preencha o campo nome.").notEmpty();
  req.assert("email", "E-mail inválido.").isEmail().notEmpty();
  req.assert("aniversario")
    .notEmpty().withMessage("Preencha o campo aniverśario.")
    .len(10).withMessage("Tamanho da data inválida. Ex: dd/mm/yyyy")
    .isDate().withMessage("Preencha uma data válida.");

  var errors = req.validationErrors();

  if(errors) {
    return true;
  } else {
    return false;
  }

};
