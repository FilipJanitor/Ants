const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const { Validator, ValidationError } = require('express-json-validator-middleware');
const bodyParser = require('body-parser')
const validator = new Validator({allErrors: true});
const validate = validator.validate;
const app = express();

const catchValidationErrors = function(err,req,res,next) {
    console.log(err.ValidationErrors);
    res.send({result: false, error: 'SchemaError'});
}

if(process.argv.length != 3){
    console.log("Invalid arguments provided. Aborting!");
    process.exit(-1);
}

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.argv[2],
    database: 'main',
    port: 3306
});

const server = app.listen(8080, function(){
    console.log("Server listening...");
});

db.connect((err) => {
    if(err){
        console.log("Connecting with database failed. Aborting!");
        console.log(err);
        process.exit(-1);
    } else {
        console.log("Connection to database estabilished.");
    }
});

// __________________schemas___________________________________________________
const loginSchema = {
    "type": "object",
    "properties": {
        "name":     {"type": "string"},
        "password": {"type": "string"}
    },
    "required": ["name","password"]
}


//sample usage
//app.post('/route',validate({requestProperty: schemaToUse}), bodyParser.json(), catchValidationErrors, function(req,res){res.send()});

// __________________basics____________________________________________________

app.get('/client.bundle.js', function(req,res){
    console.log('send js TODO');
    res.sendFile(__dirname + '/public/client.bundle.js');
});

app.get('/style.css', function(req,res){
    console.log('send css TODO');
    res.sendFile(__dirname + '/public/style.css');
});

// __________________interaction_______________________________________________

app.post('/login',validate({body: loginSchema}), bodyParser.json(), catchValidationErrors, function(req,res){
    const data = req.body;
    const query = 'SELECT token, userId FROM users where name=' + db.escape(data.name) + ' AND password=sha2(' + db.escape(data.password) + ')';
    db.query(query, (err, rows, fields) => {
        if(err){
            consloe.log(err);
            res.send({result: false, error: 'LoginError'});
            return;
        }
        if(rows.length == 1){
            res.send({result: true, token: rows.token, userId: rows.userId});
        } else {
            res.send({result: false, error: 'LoginError'});
        }
    });
});

app.use(function (req, res){
    console.log("default sender");
    res.sendFile(__dirname + '/public/index.html');
})