//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express();

// Body Parser Middleware
app.use(bodyParser.json());

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Setting up server
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

//Initiallising connection string
var dbConfig = {
    user: "sa",
    password: "Passw0rdDark2008",
    server: "204.48.17.145",
    database:"TestApi"
        };
        
        //Function to connect to database and execute query
var  executeQuery = function(res, query){
                    sql.connect(dbConfig, function (err) {
                        if (err) {
                            console.log("Error conectándose a la base :- " + err);
                            res.send(err);
                        }
                        else {
                            // create Request object
                            var request = new sql.Request();
                            // query to the database
                            request.query(query, function (err, result) {
                                if (err) {
                                    console.log("Error al consultar la base :- " + err);
                                    res.send(err);
                                }
                                else {
                                    res.send(result);
                                }
                            });
                        }
                    });
                }
                
                //GET API
app.get("/api/user", function(req , res){
                var query = "select * from Alumnos";
                executeQuery (res, query);
});

//POST API
 app.post("/api/user", function(req , res){
     var query = "INSERT INTO Alumnos (ALM_Nombre) VALUES (" + req.body.Name + ")";
                executeQuery (res, query);
});

//PUT API
 app.put("/api/user/:id", function(req , res){
                var query = "UPDATE Alumnos SET ALM_Nombre= " + req.body.Name + "  WHERE Id= " + req.params.id;
                executeQuery (res, query);
});

// DELETE API
 app.delete("/api/user /:id", function(req , res){
                var query = "DELETE FROM Alumnos WHERE Id=" + req.params.id;
                executeQuery (res, query);
});