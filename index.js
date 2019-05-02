var Connection = require('tedious').Connection;
  var config = {
    userName: 'sa',
    password: 'Passw0rdDark2008',
    server: '201,48,17,145',
    
   
    options: {encrypt: true}
  };
  var connection = new Connection(config);
  connection.on('connect', function(err) {
         executeStatement();
    }
  );

var Request = require('tedious').Request;
  function executeStatement() {
    request = new Request("select 42, 'hello world'", function(err, rowCount) {
      if (err) {
        console.log(err);
      } else {
        console.log(rowCount + ' rows');
      }
    });
    request.on('row', function(columns) {
      columns.forEach(function(column) {
        console.log(column.value);
      });
    });
    connection.execSql(request);
  }
