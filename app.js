const express = require('express');
const mysql = require('mysql');
const { Validator, ValidationError } = require('express-json-validator-middleware');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const validator = new Validator({allErrors: true});
const validate = validator.validate;
const app = express();

// ________________________________CONSTANTS___________________________________

const NOT_LOOKING_FOR_MATCH = 0;
const LOOKING_FOR_NORMAL_MATCH = 1;
const LOOKING_FOR_HARDCORE_MATCH = 2;
const LOOKING_FOR_CORRESPONDENCE_MATCH = 3;
const LOOKING_FOR_HARDCORE_CORRESPONDENCE_MATCH = 4;


// ________________________________INIT___________________________________
const catchValidationErrors = function(err,req,res,next) {
    console.log("Validation error encountered");
    console.log(err.ValidationErrors);
    res.send({result: false, error: 'SchemaError'});
}

const debugMiddleware = function(req,res,next) {
    console.log("____________________");
    console.log(req.body);
    console.log("____________________");
    next();
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

//warning, callback hell
//Ineeddis: https://stackoverflow.com/a/9097804
//https://stackoverflow.com/a/25496872
app.post('/login', debugMiddleware, bodyParser.json(), debugMiddleware, validate({body: loginSchema}),  catchValidationErrors, function(req,res){
    const data = req.body;
    const query = 'SELECT score, wins, loses, ties, lookingForMatch, token, userId FROM users WHERE name=' + db.escape(data.name) + ' AND password=sha2(' + db.escape(data.password) + ',256)';
    db.query(query, (err, rows, fields) => {
        if(err){
            console.log(err);
            res.send({result: false, error: 'LoginError'});
            return;
        }
        if(rows.length == 1){
            console.log("login successful");
            console.log(rows);
            res.send({
                result: true,
                token: rows[0].token,
                userId: rows[0].userId,
                score: rows[0].score,
                wins: rows[0].wins,
                loses: rows[0].loses,
                ties: rows[0].ties,
                lookingForMatch: rows[0].lookingForMatch
            });
        } else {
            console.log("no such user");
            res.send({result: false, error: 'Invalid credentials'});
        }
    });
});

app.post('/register', debugMiddleware, bodyParser.json(), debugMiddleware, validate({body: loginSchema}), catchValidationErrors, function(req,res){
    const data = req.body;
    const query = 'SELECT token, userId FROM users WHERE name=' + db.escape(data.name) + ' AND password=sha2(' + db.escape(data.password) + ',256)';
    const querySelect = 'SELECT token, userId FROM users WHERE name=' + db.escape(data.name);
    const userToken = crypto.randomBytes(64).toString('hex');
    /*userId je autoincrement*/
    const queryInsert = 'INSERT INTO users(token, name, password, lookingForMatch, score, wins, loses, ties) VALUES('+
                                db.escape(userToken) + ',' +
                                db.escape(data.name) + ', sha2(' +
                                db.escape(data.password) + ',256),' +
                                NOT_LOOKING_FOR_MATCH.toString() + ',' +
                                0 + ',' +
                                0 + ',' +
                                0 + ',' +
                                0 + ')';
    console.log("registering");
    db.beginTransaction(function(err) {
        if (err) {
            console.log("registering1");
            console.log(err);
            res.send({
                result: false,
                error: err
            });
        }
        db.query(querySelect, function (error, rows, fields) {
            if(error){
                console.log("registering2");
                console.log(error);
                return db.rollback(function() {
                    res.send({result: false, error: 'RegisterError1'});
                });
            }
            if(rows.length != 0){
                console.log("nametaken");
                return db.rollback(function() {
                    res.send({result: false, error: 'NameTaken'});
                });
            }
            db.query(queryInsert, function (error, rows, fields) {
                if (error) {
                    console.log("registering3");
                    console.log(error);
                    return db.rollback(function() {
                        res.send({result: false, error: 'RegisterError2'});
                    });
                }
                db.query(query, (err, rows, fields) => {
                    if(err){
                        console.log("registering4");
                        console.log(err);
                        return db.rollback(function() {
                            res.send({result: false, error: 'RegisterError3'});
                        });
                    }
                    if(rows.length == 1){
                        db.commit(function(err) {
                            if (err) {
                                console.log("registering5");
                                console.log(err);
                                return db.rollback(function() {
                                    res.send({result: false, error: 'RegisterError4'});
                                });
                            }
                            console.log("succ");
                            res.send({result: true, token: rows[0].token, userId: rows[0].userId});
                        });
                    } else {
                        return db.rollback(function() {
                            res.send({result: false, error: 'RegisterError5'});
                        });
                    }
                });
            });
        });
    });
});


app.use(function (req, res){
    console.log("default sender");
    res.sendFile(__dirname + '/public/index.html');
})

//works just like
// app.get('/*', (req,res) => {
//     console.log("default sender");
//     res.sendFile(__dirname + '/public/index.html');
// })