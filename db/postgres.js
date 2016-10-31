var pg = require("pg");

var config = {
  user: 'flash', //env var: PGUSER
  database: 'flash', //env var: PGDATABASE
  password: 'flash00', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

var pool = new pg.Pool(config);

module.exports = function(callback) {
  pool.connect(function(error, connection, done) {
    if(error) {
      return console.error("Erro na abertura de conexão com o banco de dados");
    }
    callback(error, connection, done);
  });
};
