var moment = require("moment");

module.exports = function(sequelize, DataTypes) {
  var Contato = sequelize.define("contatos", {
        id: {
          type:DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        nome: {
          type: DataTypes.STRING
        },
        email: {
          type: DataTypes.STRING
        },
        datacadastro: {
          type: DataTypes.DATE,
          default: sequelize.NOW
        },
        aniversario: {
          type: DataTypes.DATEONLY
        },
        telefonefixo: {
          type: DataTypes.STRING
        },
        telefonecelular: {
          type: DataTypes.STRING
        },
        telefonecomercial: {
          type: DataTypes.STRING
        }
      }, {
        classMethods: {
          associate: function(models) {
            Contato.belongsTo(models.usuarios, {
              foreignKey: "usuario_id"
            });
          }
        }
  });

  return Contato;
};
