module.exports = function(sequelize, DataTypes) {
  var Contato = sequelize.define('contatos', {
        id: {
          type:DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4
        },
        nome: {
          type: DataTypes.STRING
        },
        email: {
          type: DataTypes.STRING
        },
        datacadastro: {
          type: DataTypes.DATE
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
              foreignKey: "usuario_id", as: "usuario"
            });
          }
        }
      });

  return Contato;
};
