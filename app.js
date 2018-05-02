const express = require('express');

const mysql = require('mysql');
const { Validator, ValidationError } = require('express-json-validator-middleware');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const sanitize = require("sanitize-filename");
const validator = new Validator({allErrors: true});
const validate = validator.validate;
const app = express();
var expressWs = require('express-ws')(app);
const { generateNewCard, Tournament, HARDCORE, NORMAL } = require('./cardsTournaments.js');

// ________________________________CONSTANTS___________________________________

const NOT_LOOKING_FOR_MATCH = 0;
const LOOKING_FOR_NORMAL_MATCH = 1;
const LOOKING_FOR_HARDCORE_MATCH = 2;
const LOOKING_FOR_CORRESPONDENCE_MATCH = 3;
const LOOKING_FOR_HARDCORE_CORRESPONDENCE_MATCH = 4;
const USER_ON_TURN = 0;
const OPPONENT_ON_TURN = 1;

const INITIATE_GAME = 5;
const NEW_GAME_STATE = 6;
const NEXT_TURN = 7;
const YOU_WON = 8;
const YOU_LOST = 9;

const GIVE_UP = 30;
const GAME_ONGOING = 0;

const TIE = 40;
const WIN = 10;
const CONTINUE = 11;

/*console.log(process.env); heroku*/

// ________________________________INIT___________________________________
const catchValidationErrors = function(err,req,res,next) {
    console.log("Validation error encountered");
    console.log(err.ValidationErrors);
    res.send({result: false, error: 'SchemaError'});
}

const debugMiddleware = function(req,res,next) {
    next();
}

/*if(process.argv.length != 3){
    console.log("Invalid arguments provided. Aborting!");
    process.exit(-1);
}*/

const db = mysql.createConnection({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

const server = app.listen(process.env.PORT || 8080, '0.0.0.0', function(){
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

let lookingForMatch = {[LOOKING_FOR_NORMAL_MATCH]: [], [LOOKING_FOR_HARDCORE_MATCH]: []};
console.log("lookingforMatch " + lookingForMatch);
let loggedUsersToTournament = {};
let tournaments = {};

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
    //console.log('send js TODO');
    res.sendFile(__dirname + '/public/client.bundle.js');
});

app.get('/theme.min.css', function(req,res){
    //console.log('send css TODO');
    res.sendFile(__dirname + '/public/theme.min.css');
});

app.get('/style.css', function(req,res){
    //console.log('send css TODO');
    res.sendFile(__dirname + '/public/style.css');
});

app.get('/gameStyle.css', function(req,res){
    //console.log('send css TODO');
    res.sendFile(__dirname + '/public/gameStyle.css');
});

//___________________images____________________________________________________
app.get('/rank:id', function(req,res){
    //poslat obrazok
    const filename = sanitize('rank' + req.params.id);
    //console.log(filename);
    res.sendFile(__dirname + '/public/img/' + filename + '.png');
});

app.get('/AL', function(req,res){
    //console.log("image sent");
    res.sendFile(__dirname + '/public/img/AL.svg');
});

app.get('/AO', function(req,res){
    res.sendFile(__dirname + '/public/img/AO.png');
});

app.get('/background.jpg', function(req,res){
    res.sendFile(__dirname + '/public/img/background.jpg');
});

app.get('/card.png', function(req,res){
    res.sendFile(__dirname + '/public/img/card.png');
});

app.get('/IMG:id', function(req,res){
    //poslat obrazok
    const filename = sanitize('IMG' + req.params.id);
    //console.log(filename);
    res.sendFile(__dirname + '/public/img/' + filename + '.png');
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
            //console.log(err);
            res.send({result: false, error: 'LoginError'});
            return;
        }
        if(rows.length == 1){
            //console.log("login successful");
            //console.log(rows);
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
            //console.log("no such user");
            res.send({result: false, error: 'Invalid credentials'});
        }
    });
});

app.get('/scoreboard', /*debugMiddleware, bodyParser.json(), debugMiddleware, validate({body: loginSchema}),  catchValidationErrors, */function(req,res){
    const query = 'SELECT name, score, wins, loses, ties FROM users ORDER BY score DESC LIMIT 10';
    db.query(query, (err, rows, fields) => {
        if(err){
            //console.log(err);
            res.send({result: false, error: 'ScoreboardError'});
            return;
        }
        //console.log("scoreboard sent")
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
            //console.log(err);
            res.send({result: false, error: 'ScoreboardError'});
            return;
        }
        if(rows.length == 1){
            //console.log(rows);
            res.send({
                result: true,
                score: rows[0].score,
                wins: rows[0].wins,
                loses: rows[0].loses,
                ties: rows[0].ties,
                rank: rows[0].rank
            });
        } else {
            //console.log("invalid token");
            res.send({result: false, error: 'Invalid id or token'});
        }
    });
});

app.post('/myMatches', debugMiddleware, bodyParser.json(), debugMiddleware, validate({body: rankSchema}), catchValidationErrors, function(req,res){
    const data = req.body;
    const validateQuery = 'SELECT ID FROM users WHERE ID=' + db.escape(data.userId) +' AND token=' + db.escape(data.token);
    //mozno pridat aj correspondence filter?
    const query =
    'SELECT id,opponent,result FROM ('+
    '(SELECT t.id AS id, u.name AS opponent, "tie" AS result FROM tournaments AS t, users AS u WHERE t.userId1='+ db.escape(data.userId) +' AND t.userId2=u.ID AND t.gameResult=0 )'+
    ' UNION ' +
    '(SELECT t.id AS id, u.name AS opponent, "tie" AS result FROM tournaments AS t, users AS u WHERE t.userId2='+ db.escape(data.userId) +' AND t.userId1=u.ID AND t.gameResult=0 )'+
    ' UNION ' +
    '(SELECT t.id AS id, u.name AS opponent, "win" AS result FROM tournaments AS t, users AS u WHERE t.userId1='+ db.escape(data.userId) +' AND t.userId2=u.ID AND t.gameResult=t.userId1 )'+
    ' UNION ' +
    '(SELECT t.id AS id, u.name AS opponent, "win" AS result FROM tournaments AS t, users AS u WHERE t.userId2='+ db.escape(data.userId) +' AND t.userId1=u.ID AND t.gameResult=t.userId2 )'+
    ' UNION ' +
    '(SELECT t.id AS id, u.name AS opponent, "loss" AS result FROM tournaments AS t, users AS u WHERE t.userId1='+ db.escape(data.userId) +' AND t.userId2=u.ID AND t.gameResult=t.userId2 )'+
    ' UNION ' +
    '(SELECT t.id AS id, u.name AS opponent, "loss" AS result FROM tournaments AS t, users AS u WHERE t.userId2='+ db.escape(data.userId) +' AND t.userId1=u.ID AND t.gameResult=t.userId1 )'+
    ') res ORDER BY id DESC';    //console.log(query);
    console.log(query);
    db.query(validateQuery, (err, rows, fields) => {
        if(err){
            //console.log(err);
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
                //console.log(rows);
                res.send({
                    result: true,
                    matches: rows
                });
            });
        } else {
            //console.log("invalid token");
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
            //console.log(err);
            res.send({result: false, error: 'AchievementsError'});
            return;
        }
        if(rows.length == 1){
            //validation successful
            db.query(queryObtained, (err, rows, fields) => {
                if(err){
                    //console.log(err);
                    res.send({result: false, error: 'AchievementsError'});
                    return;
                }
                db.query(queryLocked,
                    (function(obtained){
                        return function(err ,rows, fields){
                            if(err){
                               // console.log(err);
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
            //console.log("invalid token");
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
    //console.log("registering");
    db.beginTransaction(function(err) {
        if (err) {
            //console.log("registering1");
            //console.log(err);
            res.send({
                result: false,
                error: err
            });
        }
        db.query(querySelect, function (error, rows, fields) {
            if(error){
                //console.log("registering2");
                //console.log(error);
                return db.rollback(function() {
                    res.send({result: false, error: 'RegisterError1'});
                });
            }
            if(rows.length != 0){
                //console.log("nametaken");
                return db.rollback(function() {
                    res.send({result: false, error: 'NameTaken'});
                });
            }
            db.query(queryInsert, function (error, rows, fields) {
                if (error) {
                    //console.log("registering3");
                    //console.log(error);
                    return db.rollback(function() {
                        res.send({result: false, error: 'RegisterError2'});
                    });
                }
                db.query(query, (err, rows, fields) => {
                    if(err){
                        //console.log("registering4");
                        //console.log(err);
                        return db.rollback(function() {
                            res.send({result: false, error: 'RegisterError3'});
                        });
                    }
                    if(rows.length == 1){
                        db.commit(function(err) {
                            if (err) {
                                //console.log("registering5");
                                //console.log(err);
                                return db.rollback(function() {
                                    res.send({result: false, error: 'RegisterError4'});
                                });
                            }
                            //console.log("succ");
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

const getUserIdFromToken = (token) => {

};

app.ws('/game', (ws,req) => { /*Nemusime odpovedat hned, odpovie sa, az ked sa najde match */
    ws.on('message', function(message){
        const msg = JSON.parse(message);
        console.log("UUUU");
        console.log(msg);
        const query = 'SELECT ID FROM users WHERE name=' + db.escape(msg.name) + ' AND token=' + db.escape(msg.token) ;
        db.query(query, (err, rows, fields) => {
            if(err || rows.length !== 1){
                //console.log(err);
                ws.close(1003,"LoginError");
                return;
            } else {
                const userId = rows[0].ID;
                let tournament = {};
                switch (msg.typeOfRequest){
                    case INITIATE_GAME:
                    //noncorrespondence matches are inmemory
                        if(loggedUsersToTournament[userId] !== undefined){
                            ws.close(1003,"already matched"); // this should not happen
                            return;
                        }
                        if (lookingForMatch[msg.lookingForGame].length === 0) {
                            // there is no one to match us
                            lookingForMatch[msg.lookingForGame].push({
                                name: msg.name,
                                id: userId, //res is from database
                                //ukladame ws objekt, aby sme mohli posielat superovi
                                socket: ws
                            });
                            return;
                        } else {
                            const opponent = lookingForMatch[msg.lookingForGame].shift();
                            //construct tournament, notify everyone
                            if(msg.lookingForGame === LOOKING_FOR_HARDCORE_MATCH ){
                                tournament = new Tournament({
                                    name: msg.name,
                                    id: userId, //res is from database
                                    //ukladame ws objekt, aby sme mohli posielat superovi
                                    socket: ws
                                }, opponent, HARDCORE, userId);
                            } else if(msg.lookingForGame === LOOKING_FOR_NORMAL_MATCH){
                                tournament = new Tournament({
                                    name: msg.name,
                                    id: userId, //res is from database
                                    //ukladame ws objekt, aby sme mohli posielat superovi
                                    socket: ws
                                }, opponent, NORMAL, userId);
                            } else {
                                ws.close(1003,"InvalidMatch");
                            return;
                            }
                            //tournament name will be id of the initializer (there is only one user running)
                            loggedUsersToTournament[ userId ] = userId;
                            loggedUsersToTournament[ opponent.id ] = userId;
                            tournaments[ userId ] = tournament;
                            //console.log(tournament);
                            ws.send(JSON.stringify({
                                typeOfResponse: NEW_GAME_STATE,
                                data: {
                                    opponentName: opponent.name,
                                    playerStats: tournament.playerStats[0],
                                    opponentStats: tournament.playerStats[1],
                                    onTurn: true,
                                    playedCard: -1,
                                    cards: tournament.playerCards[0]
                                }
                                //typeOfResponse: 99
                            }));
                            opponent.socket.send(JSON.stringify({
                                typeOfResponse: NEW_GAME_STATE,
                                data: {
                                    opponentName: msg.name,
                                    playerStats: tournament.playerStats[1],
                                    opponentStats: tournament.playerStats[0],
                                    onTurn: false,
                                    playedCard: -1,
                                    cards: tournament.playerCards[1]
                                }
                                // typeOfResponse: 100
                            }));
                            return;
                        }
                    case NEXT_TURN:
                        if(loggedUsersToTournament[userId] === undefined){
                            ws.close(1003,"No tournament running"); // this should not happen
                            return;
                        }
                        tournament = tournaments[loggedUsersToTournament[userId]];
                        if(tournament === undefined) {

                        }
                        if (tournament.players[tournament.onTurn].id !== userId){
                            ws.close(1003,"Player not on turn");
                            return;
                        }
                        if (typeof(msg.cardIndex) !== "number" || msg.cardIndex >= 8 || msg.cardIndex < 0) {
                            ws.close(1003,"Invalid card index");
                            return;
                        }
                        //ak chce foldnut
                        if (msg.folds) {
                            tournament.foldCard(msg.cardIndex);
                        } else {
                            //kontrola, ci moze hrat kartu
                            if (!tournament.checkCanPlayCard(/*index of card in client array*/msg.cardIndex)){
                                ws.close(1003,"Player requesting invalid card");
                                return;
                            }
                            /*award achievements too*/
                            tournament.playCard(msg.cardIndex);
                        }
                        //check win
                        const gameResult = tournament.checkGameState();
                        console.log("gameresult = " + gameResult);
                        console.log("rounds "+ tournament.rounds);
                        if(gameResult === WIN){
                             //currentplayer won
                            tournament.win(db);
                            tournament.players[tournament.onTurn].socket.send(JSON.stringify({
                                typeOfResponse: YOU_WON
                            }));
                            tournament.players[(tournament.onTurn + 1)%2].socket.send(JSON.stringify({
                                typeOfResponse: YOU_LOST
                            }));
                            //unregister tournament
                            loggedUsersToTournament[ tournament.players[0].id ] = undefined;
                            loggedUsersToTournament[ tournament.players[1].id ] = undefined;
                            tournaments[ tournament.tournamentId ] = undefined;
                            return;
                        } else if (gameResult === CONTINUE ){
                            //hra sa dalej
                            tournament.nextTurn();
                            const curPl = (tournament.onTurn + 1)%2;

                            ws.send(JSON.stringify({
                                typeOfResponse: NEW_GAME_STATE,
                                data: {
                                    opponentName: tournament.players[tournament.onTurn].name,
                                    playerStats: tournament.playerStats[curPl],
                                    opponentStats: tournament.playerStats[tournament.onTurn],
                                    onTurn: false,
                                    playedCard: tournament.playedCard,
                                    cards: tournament.playerCards[curPl]
                                }
                            }));
                            tournament.players[tournament.onTurn].socket.send(JSON.stringify({
                                typeOfResponse: NEW_GAME_STATE,
                                data: {
                                    opponentName: msg.name,
                                    playerStats: tournament.playerStats[tournament.onTurn],
                                    opponentStats: tournament.playerStats[curPl],
                                    onTurn: true,
                                    playedCard: tournament.playedCard,
                                    cards: tournament.playerCards[tournament.onTurn]
                                }
                            }));
                        } else {
                            tournament.tie(db);
                            tournament.players[tournament.onTurn].socket.send(JSON.stringify({
                                typeOfResponse: TIE
                            }));
                            tournament.players[(tournament.onTurn + 1)%2].socket.send(JSON.stringify({
                                typeOfResponse: TIE
                            }));
                            //unregister tournament
                            loggedUsersToTournament[ tournament.players[0].id ] = undefined;
                            loggedUsersToTournament[ tournament.players[1].id ] = undefined;
                            tournaments[ tournament.tournamentId ] = undefined;
                            return;
                        }
                }
            }
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
