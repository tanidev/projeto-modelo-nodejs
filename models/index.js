// thanks to the sequelize docs
var fs = require('fs'),
    path = require('path'),
    Sequelize = require('sequelize'),
    config = require('../config/config'),
    db = {};

var sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, config.db.options);

fs.readdirSync(__dirname).filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
}).forEach(function (file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
});

Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
