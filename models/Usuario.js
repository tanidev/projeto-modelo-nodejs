var bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
  var Usuario = sequelize.define('usuarios', {
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
        senha: {
          type: DataTypes.STRING
        },
        site: {
          type: DataTypes.STRING
        },
        datacadastro: {
          type: DataTypes.DATE
        }
      }, {
        instanceMethods: {
          generateHash: function(password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
          },
          validPassword: function(password) {
            return bcrypt.compareSync(password, this.senha);
          }
        },
        classMethods: {
          associate: function(models) {
            Usuario.hasMany(models.contatos, {
              foreignKey: "usuario_id"
            });
          }
        }
      });

  return Usuario;
};
