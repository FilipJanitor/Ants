import express from 'express';
import mysql from 'mysql';
import bcrypt from 'bcryptjs';
import { Validator, ValidationError } from 'express-json-validator-middleware';
import bodyParser from 'body-parser';
import crypto from 'crypto';
const  validator = new Validator({allErrors: true});
const  validate = validator.validate;
const  app = express();



const NOT_LOOKING_FOR_MATCH = 0;

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
    const query = 'SELECT token, userId FROM users WHERE name=' + db.escape(data.name) + ' AND password=sha2(' + db.escape(data.password) + ')';
    db.query(query, (err, rows, fields) => {
        if(err){
            console.log(err);
            res.send({result: false, error: 'LoginError'});
            return;
        }
        if(rows.length == 1){
            res.send({result: true, token: rows.token, userId: rows.userId});
        } else {
            res.send({result: false, error: 'Invalid credentials'});
        }
    });
});

app.post('/register',validate({body: loginSchema}), bodyParser.json(), catchValidationErrors, function(req,res){
    const data = req.body;
    const query = 'SELECT token, userId FROM users WHERE name=' + db.escape(data.name) + ' AND password=sha2(' + db.escape(data.password) + ')';
    const querySelect = 'SELECT token, userId FROM users WHERE name=' + db.escape(data.name) + ')';
    const userToken = crypto.randomBytes(64).toString('hex');
    /*userId je autoincrement*/
    const queryInsert = 'INSERT INTO users( token, name, password, lookingForMatch, score) VALUES('+
                                userToken + ',' +
                                db.escape(data.name) + 'sha2(' +
                                db.escape(data.password) + ',' +
                                NOT_LOOKING_FOR_MATCH.toString() + ',' +
                                0 + ')';
    db.beginTransaction(function(err) {
        if (err) {
            res.send({
                result: false,
                error: err
            });
        }
        db.query(querySelect, function (error, results, fields) {
            if(err){
                return db.rollback(function() {
                    res.send({result: false, error: 'RegisterError1'});
                });
            }
            if(rows.length != 0){
                return db.rollback(function() {
                    res.send({result: false, error: 'NameTaken'});
                });
            }
            db.query(queryInsert, function (error, results, fields) {
                if (error) {
                    return db.rollback(function() {
                        res.send({result: false, error: 'RegisterError2'});
                    });
                }
                db.query(query, (err, rows, fields) => {
                    if(err){
                        return db.rollback(function() {
                            res.send({result: false, error: 'RegisterError3'});
                        });
                    }
                    if(rows.length == 1){
                        db.commit(function(err) {
                            if (err) {
                                return db.rollback(function() {
                                    res.send({result: false, error: 'RegisterError4'});
                                });
                            }
                            res.send({result: true, token: rows.token, userId: rows.userId});
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