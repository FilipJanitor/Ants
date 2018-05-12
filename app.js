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
console.log("STARTING TESTING")
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


// ________________________________INIT___________________________________
const catchValidationErrors = function(err,req,res,next) {
    console.log("Validation error encountered");
    console.log(err.ValidationErrors);
    res.send({result: false, error: 'SchemaError'});
}

const debugMiddleware = function(req,res,next) {
    next();
}
/*
if(process.argv.length != 3){
    console.log("Invalid arguments provided. Aborting!");
    process.exit(-1);
}*/
console.log("CONNNN " + {
    host: process.env.CLEARDB_HOST,
    user: process.env.CLEARDB_USER,
    password: process.env.CLEARDB_PASS,
    database: process.env.CLEARDB_DB
});
const db = mysql.createPool({
    connectionLimit : 100,
    host: process.env.CLEARDB_HOST,
    user: process.env.CLEARDB_USER,
    password: process.env.CLEARDB_PASS,
    database: process.env.CLEARDB_DB
});/*
const db = mysql.createPool({
    connectionLimit : 100,
    host: 'localhost',
    user: 'root',
    password: process.argv[2],
    database: 'main',
    port: 3306
});*/
console.log("PORT "+ process.env.PORT);
const server = app.listen(process.env.PORT || 8080, function(){
    console.log("Server listening...");
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

// __________________basics____________________________________________________

app.get('/client.bundle.js', function(req,res){
    res.sendFile(__dirname + '/public/client.bundle.js');
});

app.get('/theme.min.css', function(req,res){
    res.sendFile(__dirname + '/public/theme.min.css');
});

app.get('/style.css', function(req,res){
    res.sendFile(__dirname + '/public/style.css');
});

app.get('/gameStyle.css', function(req,res){
    res.sendFile(__dirname + '/public/gameStyle.css');
});

//___________________images____________________________________________________
app.get('/rank:id', function(req,res){
    const filename = sanitize('rank' + req.params.id);
    res.sendFile(__dirname + '/public/img/' + filename + '.png');
});

app.get('/AL', function(req,res){
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
    const filename = sanitize('IMG' + req.params.id);
    res.sendFile(__dirname + '/public/img/' + filename + '.png');
});

// __________________interaction_______________________________________________
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
            res.send({result: false, error: 'Invalid credentials'});
        }
    });
});

app.get('/scoreboard', function(req,res){
    const query = 'SELECT name, score, wins, loses, ties FROM users ORDER BY score DESC LIMIT 10';
    db.query(query, (err, rows, fields) => {
        if(err){
            console.log(err);
            res.send({result: false, error: 'ScoreboardError'});
            return;
        }
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
            res.send({
                result: true,
                score: rows[0].score,
                wins: rows[0].wins,
                loses: rows[0].loses,
                ties: rows[0].ties,
                rank: rows[0].rank
            });
        } else {
            res.send({result: false, error: 'Invalid id or token'});
        }
    });
});

app.post('/myMatches', debugMiddleware, bodyParser.json(), debugMiddleware, validate({body: rankSchema}), catchValidationErrors, function(req,res){
    const data = req.body;
    const validateQuery = 'SELECT ID FROM users WHERE ID=' + db.escape(data.userId) +' AND token=' + db.escape(data.token);
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
    ') res ORDER BY id DESC';
    db.query(validateQuery, (err, rows, fields) => {
        if(err){
            console.log(err);
            res.send({result: false, error: 'MatchboardError'});
            return;
        }
        if(rows.length == 1){
            db.query(query, (err, rows, fields) => {
                if(err){
                    console.log(err);
                    res.send({result: false, error: 'MatchboardError'});
                    return;
                }
                res.send({
                    result: true,
                    matches: rows
                });
            });
        } else {
            res.send({result: false, error: 'Invalid id or token'});
        }
    });
});

app.post('/myAchievements', debugMiddleware, bodyParser.json(), debugMiddleware, validate({body: rankSchema}), catchValidationErrors, function(req,res){
    const data = req.body;
    const validateQuery = 'SELECT ID FROM users WHERE ID=' + db.escape(data.userId) +' AND token=' + db.escape(data.token);
    const queryObtained = 'SELECT a.name, a.description FROM achievements AS a, users_achievements AS ua WHERE a.ID=ua.achievementId AND ua.userId=' + db.escape(data.userId);
    const queryLocked = 'SELECT a.name FROM achievements AS a WHERE a.ID NOT IN (SELECT ach.ID FROM achievements AS ach, users_achievements AS ua WHERE ach.ID=ua.achievementId AND ua.userId=' + db.escape(data.userId) +')';

    db.query(validateQuery, (err, rows, fields) => {
        if(err){
            console.log(err);
            res.send({result: false, error: 'AchievementsError'});
            return;
        }
        if(rows.length == 1){
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

    db.getConnection((err,connection) => {
        if (err) {
            console.log(err);
            res.send({
                result: false,
                error: err
            });
        }
        connection.beginTransaction(function(err) {
            if (err) {
                console.log(err);
                res.send({
                    result: false,
                    error: err
                });
            }
            connection.query(querySelect, function (error, rows, fields) {
                if(error){
                    console.log(error);
                    return connection.rollback(function() {
                        res.send({result: false, error: 'RegisterError1'});
                    });
                }
                if(rows.length != 0){
                    return connection.rollback(function() {
                        res.send({result: false, error: 'NameTaken'});
                    });
                }
                connection.query(queryInsert, function (error, rows, fields) {
                    if (error) {
                        console.log(error);
                        return connection.rollback(function() {
                            res.send({result: false, error: 'RegisterError2'});
                        });
                    }
                    connection.query(query, (err, rows, fields) => {
                        if(err){
                            console.log(err);
                            return connection.rollback(function() {
                                res.send({result: false, error: 'RegisterError3'});
                            });
                        }
                        if(rows.length == 1){
                            connection.commit(function(err) {
                                if (err) {
                                    console.log(err);
                                    return connection.rollback(function() {
                                        res.send({result: false, error: 'RegisterError4'});
                                    });
                                }
                                res.send({result: true, token: rows[0].token, userId: rows[0].ID});
                            });
                        } else {
                            return connection.rollback(function() {
                                res.send({result: false, error: 'RegisterError5'});
                            });
                        }
                    });
                });
            });
        });
        connection.release();
    });
});

const getUserIdFromToken = (token) => {

};


app.ws('/game', (ws,req) => {
    const a = setInterval(() => {
        console.log("pinging");
        try{
            if(ws.readyState !== 1 ){
                return;
            }
            ws.ping("heartbeat");
        } catch(err) {
            console.log("pingpong error"+err);
        }
    },10000);

    console.log("connectionOpened");
    ws.on('close', () => {
        clearInterval(a);
        console.log("unsubbed" );
    })


    ws.on('message', function(message){
        const msg = JSON.parse(message);
        const query = 'SELECT ID FROM users WHERE name=' + db.escape(msg.name) + ' AND token=' + db.escape(msg.token) ;
        db.query(query, (err, rows, fields) => {
            if(err || rows.length !== 1){
                ws.close(1003,"LoginError");
                return;
            } else {
                const userId = rows[0].ID;
                let tournament = {};
                switch (msg.typeOfRequest){
                    case INITIATE_GAME:
                        if(loggedUsersToTournament[userId] !== undefined){
                            tournament = tournaments[loggedUsersToTournament[userId]];
                            if(tournament.players[tournament.onTurn].id === userId){
                                tournament.nextTurn();
                            }
                            tournament.win();
                            tournament.players[tournament.onTurn].socket.send(JSON.stringify({
                                typeOfResponse: YOU_WON
                            }));
                            tournament.players[(tournament.onTurn + 1)%2].socket.send(JSON.stringify({
                                typeOfResponse: YOU_LOST
                            }));
                            loggedUsersToTournament[ tournament.players[0].id ] = undefined;
                            loggedUsersToTournament[ tournament.players[1].id ] = undefined;
                            tournaments[ tournament.tournamentId ] = undefined;
                            ws.close(1003,"already matched");
                            return;
                        }
                        if (lookingForMatch[msg.lookingForGame].length === 0) {
                            lookingForMatch[msg.lookingForGame].push({
                                name: msg.name,
                                id: userId,
                                socket: ws
                            });
                            return;
                        } else {
                            const opponent = lookingForMatch[msg.lookingForGame].shift();
                            if(msg.lookingForGame === LOOKING_FOR_HARDCORE_MATCH ){
                                tournament = new Tournament({
                                    name: msg.name,
                                    id: userId,
                                    socket: ws
                                }, opponent, HARDCORE, userId, db);
                            } else if(msg.lookingForGame === LOOKING_FOR_NORMAL_MATCH){
                                tournament = new Tournament({
                                    name: msg.name,
                                    id: userId,
                                    socket: ws
                                }, opponent, NORMAL, userId, db);
                            } else {
                                ws.close(1003,"InvalidMatch");
                            return;
                            }
                            loggedUsersToTournament[ userId ] = userId;
                            loggedUsersToTournament[ opponent.id ] = userId;
                            tournaments[ userId ] = tournament;
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
                            }));
                            return;
                        }
                    case NEXT_TURN:
                        if(loggedUsersToTournament[userId] === undefined){
                            ws.close(1003,"No tournament running");
                            return;
                        }
                        tournament = tournaments[loggedUsersToTournament[userId]];
                        if(tournament === undefined) {
                            ws.close(1003,"tournament error");
                        }
                        if (tournament.players[tournament.onTurn].id !== userId){
                            if(tournament.players[tournament.onTurn].id === userId){
                                tournament.nextTurn();
                            }
                            tournament.win();
                            tournament.players[tournament.onTurn].socket.send(JSON.stringify({
                                typeOfResponse: YOU_WON
                            }));
                            tournament.players[(tournament.onTurn + 1)%2].socket.send(JSON.stringify({
                                typeOfResponse: YOU_LOST
                            }));
                            loggedUsersToTournament[ tournament.players[0].id ] = undefined;
                            loggedUsersToTournament[ tournament.players[1].id ] = undefined;
                            tournaments[ tournament.tournamentId ] = undefined;
                            ws.close(1003,"Player not on turn");
                            return;
                        }
                        if (typeof(msg.cardIndex) !== "number" || msg.cardIndex >= 8 || msg.cardIndex < 0) {
                            if(tournament.players[tournament.onTurn].id === userId){
                                tournament.nextTurn();
                            }
                            tournament.win();
                            tournament.players[tournament.onTurn].socket.send(JSON.stringify({
                                typeOfResponse: YOU_WON
                            }));
                            tournament.players[(tournament.onTurn + 1)%2].socket.send(JSON.stringify({
                                typeOfResponse: YOU_LOST
                            }));
                            loggedUsersToTournament[ tournament.players[0].id ] = undefined;
                            loggedUsersToTournament[ tournament.players[1].id ] = undefined;
                            tournaments[ tournament.tournamentId ] = undefined;
                            ws.close(1003,"Invalid card index");
                            return;
                        }
                        if (msg.folds) {
                            tournament.foldCard(msg.cardIndex);
                        } else {
                            if (!tournament.checkCanPlayCard(msg.cardIndex)){
                                if(tournament.players[tournament.onTurn].id === userId){
                                    tournament.nextTurn();
                                }
                                tournament.win();
                                tournament.players[tournament.onTurn].socket.send(JSON.stringify({
                                    typeOfResponse: YOU_WON
                                }));
                                tournament.players[(tournament.onTurn + 1)%2].socket.send(JSON.stringify({
                                    typeOfResponse: YOU_LOST
                                }));
                                loggedUsersToTournament[ tournament.players[0].id ] = undefined;
                                loggedUsersToTournament[ tournament.players[1].id ] = undefined;
                                tournaments[ tournament.tournamentId ] = undefined;
                                ws.close(1003,"Player requesting invalid card");
                                return;
                            }
                            tournament.playCard(msg.cardIndex);
                        }
                        const gameResult = tournament.checkGameState();
                        if(gameResult === WIN){
                            tournament.win();
                            tournament.players[tournament.onTurn].socket.send(JSON.stringify({
                                typeOfResponse: YOU_WON
                            }));
                            tournament.players[(tournament.onTurn + 1)%2].socket.send(JSON.stringify({
                                typeOfResponse: YOU_LOST
                            }));
                            loggedUsersToTournament[ tournament.players[0].id ] = undefined;
                            loggedUsersToTournament[ tournament.players[1].id ] = undefined;
                            tournaments[ tournament.tournamentId ] = undefined;
                            return;
                        } else if (gameResult === CONTINUE ){
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
                            tournament.tie();
                            tournament.players[0].socket.send(JSON.stringify({
                                typeOfResponse: TIE
                            }));
                            tournament.players[1].socket.send(JSON.stringify({
                                typeOfResponse: TIE
                            }));
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
