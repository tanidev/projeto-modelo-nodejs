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
                timezone: "America/Sao_Paulo",
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
    },
    production: {
        root: rootPath,
        app: {
            name: "ProjetoModelo"
        },
        port: 3000,
        db: {
            database: "d9r8qlficvfj98",
            user: "glgqsblqunbbbs",
            password: "4AK6BI5zqk9_s_7pOaG63eaBKl",
            options: {
                host: "ec2-54-235-254-56.compute-1.amazonaws.com",
                dialect: "postgres",
                timezone: "America/Sao_Paulo",
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
