var path = require("path"),
    rootPath = path.normalize(__dirname + "/.."),
    env = process.env.NODE_ENV || "development";

var config = {
    development: {
        root: rootPath,
        app: {
            name: "ProjetoModelo"
        },
        port: 3000,
        db: {
            database: "projeto_modelo",
            user: "flash",
            password: "flash00",
            options: {
                host: "localhost",
                dialect: "postgres",
                define: {
                  timestamps: false
                },
                pool: {
                    max: 100,
                    min: 0,
                    idle: 10000
                }
            }
        }
    }
}

module.exports = config[env];
