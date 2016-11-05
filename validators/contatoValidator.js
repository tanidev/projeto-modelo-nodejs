module.exports = function(req, res) {

  req.assert("nome", "Preencha o campo nome.").notEmpty();
  req.assert("email", "E-mail inválido.").isEmail().notEmpty();
  req.assert("aniversario")
    .notEmpty().withMessage("Preencha o campo aniverśario.")
    .len(10).withMessage("Tamanho da data inválida. Ex: dd/mm/yyyy")
    .isDate().withMessage("Preencha uma data válida.");

  req.assert("telefonefixo")
    .notEmpty().withMessage("Preencha o campo telefone")
    .len(14).withMessage("Tamanho de telefone inválido. Ex: (00) 2222-2222");

  req.assert("telefonecelular")
    .optional({checkFalsy: true}).len(14,15).withMessage("Tamanho de telefone inválido. " +
      "Ex: (00) 9999-9999 ou (00) 99999-9999");

  req.assert("telefonecomercial")
    .optional({checkFalsy: true}).len(14,15).withMessage("Tamanho de telefone inválido. " +
      "Ex: (00) 9999-9999 ou (00) 99999-9999");

  var errors = req.validationErrors();

  if(errors) {
    return true;
  } else {
    return false;
  }

};
