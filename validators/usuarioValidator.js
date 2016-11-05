module.exports = function(req, res) {

  req.assert("nome", "Preencha o campo nome.").notEmpty();
  req.assert("email", "E-mail inválido.").isEmail().notEmpty();

  req.assert("password")
    .notEmpty().withMessage("Preencha o senha.")
    .len(6,10).withMessage("Sua senha deve conter de 6 à 10 caracteres.");

  req.assert("passwordconfirm")
    .notEmpty().withMessage("Preencha o campo confirmação de senha.");

  var errors = req.validationErrors();

  if(errors) {
    return true;
  } else {
    return false;
  }

};
