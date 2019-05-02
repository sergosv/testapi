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
