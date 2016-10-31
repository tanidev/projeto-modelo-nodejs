var connection = require("./postgres");

connection(function(error, connection, done){
  connection.query("SELECT * FROM hawbs", function(error, results) {
    done();
    console.log(results.rows);
  });
});
