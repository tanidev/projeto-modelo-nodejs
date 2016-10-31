var Sequelize = require("sequelize");

var sequelize = new Sequelize('flash', 'flash', 'flash00', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

module.exports = function() {

  console.log(Sequelize);
  return {
    sequelize: sequelize,
    DataTypes: Sequelize.DataTypes
  }

}();
