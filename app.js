const express = require('express');
const mysql = require('mysql');
const { Validator, ValidationError } = require('express-json-validator-middleware');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const sanitize = require("sanitize-filename");
const validator = new Validator({allErrors: true});
const validate = validator.validate;
const app = express();

// ________________________________CONSTANTS___________________________________

const NOT_LOOKING_FOR_MATCH = 0;
const LOOKING_FOR_NORMAL_MATCH = 1;
const LOOKING_FOR_HARDCORE_MATCH = 2;
const LOOKING_FOR_CORRESPONDENCE_MATCH = 3;
const LOOKING_FOR_HARDCORE_CORRESPONDENCE_MATCH = 4;

const USER_ON_TURN = 0;
const OPPONENT_ON_TURN = 1;

const GAME_ONGOING = 0;


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

const rankSchema = {
    "type": "object",
    "properties": {
        "userId":   {"type": "integer"},
        "token":    {"type": "string"}
    },
    "required": ["userId","token"]
}

//sample usage
//app.post('/route',validate({requestProperty: schemaToUse}), bodyParser.json(), catchValidationErrors, function(req,res){res.send()});

// __________________basics____________________________________________________

app.get('/client.bundle.js', function(req,res){
    console.log('send js TODO');
    res.sendFile(__dirname + '/public/client.bundle.js');
});

app.get('/theme.min.css', function(req,res){
    console.log('send css TODO');
    res.sendFile(__dirname + '/public/theme.min.css');
});

app.get('/style.css', function(req,res){
    console.log('send css TODO');
    res.sendFile(__dirname + '/public/style.css');
});

//___________________images____________________________________________________
app.get('/rank:id', function(req,res){
    //poslat obrazok
    const filename = sanitize('rank' + req.params.id);
    console.log(filename);
    res.sendFile(__dirname + '/public/img/' + filename + '.png');
});

app.get('/AL', function(req,res){
    //poslat obrazok
    console.log("image sent");
    res.sendFile(__dirname + '/public/img/AL.svg');
});

app.get('/AO', function(req,res){
    //poslat obrazok
    res.sendFile(__dirname + '/public/img/AO.png');
});

// __________________interaction_______________________________________________

//warning, callback hell
//Ineeddis: https://stackoverflow.com/a/9097804
//https://stackoverflow.com/a/25496872
app.post('/login', debugMiddleware, bodyParser.json(), debugMiddleware, validate({body: loginSchema}),  catchValidationErrors, function(req,res){
    const data = req.body;
    const query = 'SELECT score, wins, loses, ties, lookingForMatch, token, ID FROM users WHERE name=' + db.escape(data.name) + ' AND password=sha2(' + db.escape(data.password) + ',256)';
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
                userId: rows[0].ID,
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

app.get('/scoreboard', /*debugMiddleware, bodyParser.json(), debugMiddleware, validate({body: loginSchema}),  catchValidationErrors, */function(req,res){
    const query = 'SELECT name, score, wins, loses, ties FROM users ORDER BY score DESC LIMIT 10';
    db.query(query, (err, rows, fields) => {
        if(err){
            console.log(err);
            res.send({result: false, error: 'ScoreboardError'});
            return;
        }
        console.log("scoreboard sent")
        res.send({
            result: true,
            scores: rows
        });
    });
});

app.post('/myRank', debugMiddleware, bodyParser.json(), debugMiddleware, validate({body: rankSchema}),  catchValidationErrors, function(req,res){
    const data = req.body;
    const query = 'SELECT score, wins, loses, ties, rank FROM users WHERE ID=' + db.escape(data.userId) +' AND token=' + db.escape(data.token);
    db.query(query, (err, rows, fields) => {
        if(err){
            console.log(err);
            res.send({result: false, error: 'ScoreboardError'});
            return;
        }
        if(rows.length == 1){
            console.log(rows);
            res.send({
                result: true,
                score: rows[0].score,
                wins: rows[0].wins,
                loses: rows[0].loses,
                ties: rows[0].ties,
                rank: rows[0].rank
            });
        } else {
            console.log("invalid token");
            res.send({result: false, error: 'Invalid id or token'});
        }
    });
});

app.post('/myMatches', debugMiddleware, bodyParser.json(), debugMiddleware, validate({body: rankSchema}), catchValidationErrors, function(req,res){
    const data = req.body;
    const validateQuery = 'SELECT ID FROM users WHERE ID=' + db.escape(data.userId) +' AND token=' + db.escape(data.token);
    //mozno pridat aj correspondence filter?
    const query =
'(SELECT u.name AS name, u.ID AS id, ' + USER_ON_TURN + ' AS onTurn FROM tournaments AS t, users AS u WHERE t.userId1='+ db.escape(data.userId) +' AND t.userId2=u.ID AND t.playerOnTurn = 1 AND t.gameResult='+ GAME_ONGOING + ')' +
' UNION ' +
'(SELECT u.name AS name, u.ID AS id, ' + OPPONENT_ON_TURN + ' AS onTurn FROM tournaments AS t, users AS u WHERE t.userId1='+ db.escape(data.userId) +' AND t.userId2=u.ID AND t.playerOnTurn = 2 AND t.gameResult='+ GAME_ONGOING + ')' +
' UNION ' +
'(SELECT u.name AS name, u.ID AS id, ' + USER_ON_TURN + ' AS onTurn FROM tournaments AS t, users AS u WHERE t.userId2='+ db.escape(data.userId) +' AND t.userId1=u.ID AND t.playerOnTurn = 2 AND t.gameResult='+ GAME_ONGOING + ')' +
' UNION ' +
'(SELECT u.name AS name, u.ID AS id, ' + OPPONENT_ON_TURN + ' AS onTurn FROM tournaments AS t, users AS u WHERE t.userId2='+ db.escape(data.userId) +' AND t.userId1=u.ID AND t.playerOnTurn = 1 AND t.gameResult='+ GAME_ONGOING + ')';
    console.log(query);
    db.query(validateQuery, (err, rows, fields) => {
        if(err){
            console.log(err);
            res.send({result: false, error: 'MatchboardError'});
            return;
        }
        if(rows.length == 1){
            //validation successful
            db.query(query, (err, rows, fields) => {
                if(err){
                    console.log(err);
                    res.send({result: false, error: 'MatchboardError'});
                    return;
                }
                console.log(rows);
                res.send({
                    result: true,
                    matches: rows
                });
            });
        } else {
            console.log("invalid token");
            res.send({result: false, error: 'Invalid id or token'});
        }
    });
});

app.post('/myAchievements', debugMiddleware, bodyParser.json(), debugMiddleware, validate({body: rankSchema}), catchValidationErrors, function(req,res){
    const data = req.body;
    const validateQuery = 'SELECT ID FROM users WHERE ID=' + db.escape(data.userId) +' AND token=' + db.escape(data.token);
    const queryObtained = 'SELECT a.name, a.description FROM achievements AS a, users_achievements AS ua WHERE a.ID=ua.achievementId AND ua.userId=' + db.escape(data.userId);
    const queryLocked = 'SELECT a.name FROM achievements AS a WHERE NOT EXISTS (SELECT ach.ID FROM achievements AS ach, users_achievements AS ua WHERE ach.ID=ua.achievementId AND ua.userId=' + db.escape(data.userId) +')';

    //dame bez transakcie zatial
    db.query(validateQuery, (err, rows, fields) => {
        if(err){
            console.log(err);
            res.send({result: false, error: 'AchievementsError'});
            return;
        }
        if(rows.length == 1){
            //validation successful
            db.query(queryObtained, (err, rows, fields) => {
                if(err){
                    console.log(err);
                    res.send({result: false, error: 'AchievementsError'});
                    return;
                }
                db.query(queryLocked,
                    (function(obtained){
                        return function(err ,rows, fields){
                            if(err){
                                console.log(err);
                                res.send({result: false, error: 'AchievementsError'});
                                return;
                            }
                            res.send({
                                result: true,
                                achievementsLocked: rows,
                                achievementsObtained: obtained
                            });
                        };
                    })(rows)
                );
            });
        } else {
            console.log("invalid token");
            res.send({result: false, error: 'Invalid id or token'});
        }
    });
});

app.post('/register', debugMiddleware, bodyParser.json(), debugMiddleware, validate({body: loginSchema}), catchValidationErrors, function(req,res){
    const data = req.body;
    if(data.name === "" || data.password.length < 6){
        res.send({result: false, error: 'Too short'});
        return;
    }
    const query = 'SELECT token, ID FROM users WHERE name=' + db.escape(data.name) + ' AND password=sha2(' + db.escape(data.password) + ',256)';
    const querySelect = 'SELECT token, ID FROM users WHERE name=' + db.escape(data.name);
    const userToken = crypto.randomBytes(64).toString('hex');
    /*userId je autoincrement*/
    const queryInsert = 'INSERT INTO users(token, name, password, lookingForMatch, score, wins, loses, ties, rank) VALUES('+
                                db.escape(userToken) + ',' +
                                db.escape(data.name) + ', sha2(' +
                                db.escape(data.password) + ',256),' +
                                NOT_LOOKING_FOR_MATCH.toString() + ',' +
                                0 + ',' +
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
                            res.send({result: true, token: rows[0].token, userId: rows[0].ID});
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