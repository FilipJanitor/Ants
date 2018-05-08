//requirements, img, name, description, effects

const NORMAL = 0;
const HARDCORE = 1;
const TIE = 40;
const WIN = 10;
const CONTINUE = 11;

const generator = [0,0,0,0,1,1,1,2,2,3,3,3,3,4,4,4,4,5,5,5,6,7,7,8,8,9,9,
    10,10,10,10,11,11,11,12,12,12,12,13,13,14,14,15,15,15,16,16,17,17,17,
    18,18,18,19,19,19,20,20,20,21,21,21,22,22,22,23,23,24,24,25,25,26,26,
    27,27,28];
const cards  = [
    {
        id:0,
        name: "wall",
        description: [["wall", "+3"]],
        img: "IMGwall",
        requirements: { bricks: 1 },
        effects: { wall: 3 }
    },
    {
        id:1,
        name: "defense",
        description: [["wall", "+6"]],
        img: "IMGdefense",
        requirements: { bricks: 6 },
        effects: { wall: 6 }
    },
    {
        id:2,
        name: "fence",
        description: [["wall", "+22"]],
        img: "IMGfence",
        requirements: { bricks: 12 },
        effects: { wall: 22 }
    },
    {
        id:3,
        name: "base",
        description: [["castle", "+2"]],
        img: "IMGbase",
        requirements: { bricks: 1 },
        effects: { castle: 2 }
    },
    {
        id:4,
        name: "tower",
        description: [["castle", "+5"]],
        img: "IMGtower",
        requirements: { bricks: 5 },
        effects: { castle: 5 }
    },
    {
        id:5,
        name: "fort",
        description: [["castle", "+20"]],
        img: "IMGfort",
        requirements: { bricks: 18 },
        effects: { castle: 20 }
    },
    {
        id:6,
        name: "babylon",
        description: [["castle", "+32"]],
        img: "IMGbabylon",
        requirements: { bricks: 39 },
        effects: { castle: 32 }
    },
    {
        id:7,
        name: "reserves",
        description: [["castle", "+8"], ["wall", "-4"]],
        img: "IMGreserves",
        requirements: { bricks:3 },
        effects: { castle: 8, wall: -4 }
    },
    {
        id:8,
        name: "pixies",
        description: [["castle", "+22"]],
        img: "IMGpixies",
        requirements: { crystals: 22 },
        effects: { castle: 22 }
    },
    {
        id:9,
        name: "wain",
        description: [["castle" ,"+8"],["enemy castle", "-4"]],
        img: "IMGwain",
        requirements: { bricks: 10 },
        effects: { castle: 8, e_castle: -4 }
    },
    {
        id:10,
        name: "archer",
        description: [["attack", "2"]],
        img: "IMGarcher",
        requirements: { weapons: 1 },
        effects: { attack: 2 }
    },
    {
        id:11,
        name: "raider",
        description: [["attack", "4"]],
        img: "IMGraider",
        requirements: { weapons: 2 },
        effects: { attack: 4 }
    },
    {
        id:12,
        name: "platoon",
        description: [["attack", "6"]],
        img: "IMGplatoon",
        requirements: { weapons: 4 },
        effects: { attack: 6 }
    },
    {
        id:13,
        name: "siege",
        description: [["attack", "12"]],
        img: "IMGsiege",
        requirements: { weapons:10 },
        effects: { attack: 12 }
    },
    {
        id:14,
        name: "banshee",
        description: [["attack", "32"]],
        img: "IMGbanshee",
        requirements: { weapons: 28 },
        effects: { attack: 32 }
    },
    {
        id:15,
        name: "swat",
        description: [["enemy castle", "-10"]],
        img: "IMGswat",
        requirements: { weapons: 18 },
        effects: { e_castle: -10 }
    },
    {
        id:16,
        name: "dragon",
        description: [["attack", "25"]],
        img: "IMGdragon",
        requirements: { crystals: 21 },
        effects: { attack: 25 }
    },
    {
        id:17,
        name: "conjure bricks",
        description: [["bricks", "+8"]],
        img: "IMGconjureBricks",
        requirements: { crystals: 4 },
        effects: { bricks: 8 }
    },
    {
        id:18,
        name: "conjure crystals",
        description: [["crystals", "+8"]],
        img: "IMGconjureCrystals",
        requirements: { crystals: 4 },
        effects: { crystals: 8 }
    },
    {
        id:19,
        name: "conjure weapons",
        description: [["weapons", "+8"]],
        img: "IMGconjureWeapons",
        requirements: { crystals: 4 },
        effects: { weapons: 8 }
    },
    {
        id:20,
        name: "destroy bricks",
        description: [["enemy bricks", "-8"]],
        img: "IMGdestroyBricks",
        requirements: { crystals: 4 },
        effects: { e_bricks: -8 }
    },
    {
        id:21,
        name: "destroy crystals",
        description: [["enemy crystals", "-8"]],
        img: "IMGdestroyCrystals",
        requirements: { crystals: 4 },
        effects: { e_crystals: -8 }
    },
    {
        id:22,
        name: "destroy weapons",
        description: [["enemy weapons", "-8"]],
        img: "IMGdestroyWeapons",
        requirements: { crystals: 4 },
        effects: { e_weapons: -8 }
    },
    {
        id:23,
        name: "saboteur",
        description: [["enemy stock", "-4"]],
        img: "IMGsaboteur",
        requirements: { weapons: 12 },
        effects: { e_bricks: -4, e_weapons: -4, e_crystals: -4 }
    },
    {
        id:24,
        name: "thief",
        description: [["Transfer stock", "5"]],
        img: "IMGthief",
        requirements: { weapons: 15 },
        effects: { weapons: 5, bricks: 5, crystals: 5, e_weapons: -5, e_crystals: -5, e_bricks: -5 }
    },
    {
        id:25,
        name: "wizard",
        description: [["wizards", "+1"]],
        img: "IMGwizard",
        requirements: { crystals: 8 },
        effects: { mages: 1 }
    },
    {
        id:26,
        name: "recruit",
        description: [["warriors", "+1"]],
        img: "IMGrecruit",
        requirements: { weapons: 8 },
        effects: { warriors: 1 }
    },
    {
        id:27,
        name: "school",
        description: [["builders", "+1"]],
        img: "IMGschool",
        requirements: { bricks: 8 },
        effects: { builders: 1 }
    },
    {
        id:28,
        name: "curse",
        description: [["all", "+1"], ["all of enemy", "-1"]],
        img: "IMGcurse",
        requirements: { crystals: 25 },
        effects: {
            bricks: 1,
            crystals: 1,
            weapons: 1,
            builders: 1,
            mages: 1,
            warriors: 1,
            castle: 1,
            wall: 1,
            e_bricks: -1,
            e_crystals: -1,
            e_weapons: -1,
            e_builders: -1,
            e_mages: -1,
            e_warriors: -1,
            e_castle: -1,
            e_wall: -1
        }
    }
];
//tu nejak este achievementy

const generateNewCard = function() {
    const id = Math.floor((Math.random()*generator.length));
    return cards[generator[id]];
};
class Tournament {
    constructor(player1, player2, type, id, db) {
        //este by sa to dalo zlepsit tak, ze by hrac mal v sebe vsetko, aj staty, aj karty
        this.playerCards = [[],[]];
        for(let i = 0; i < 8; i++){
            this.playerCards[0].push(generateNewCard());
            this.playerCards[1].push(generateNewCard());
        }
        this.tournamentId = id;
        this.rounds = 0;
        this.players = [ player1, player2 ];
        this.onTurn = 0;
        this.playedCard = -1;
        this.playerStats = [ {
            builders: 2,
            bricks: 5,
            warriors: 2,
            weapons: 5,
            mages: 2,
            crystals: 5,
            wall: 10,
            castle: 35
        },
        {
            builders: 2,
            bricks: 5,
            warriors: 2,
            weapons: 5,
            mages: 2,
            crystals: 5,
            wall: 10,
            castle: 35
        } ],
        this.firstTurn = true;
        this.type = type,
        this.tieProposed = false,
        this.finished = false
        this.winner = undefined;
        this.db = db;
    }

    applyAchievement(user, achievementNumber) {
        const query = "INSERT IGNORE INTO users_achievements(userId,achievementId) VALUES("+this.db.escape(user)+","+this.db.escape(achievementNumber)+")";
        this.db.query(queryInsert, (error) => {
            if(error){ console.log("insertFailed"); console.log(error); }
        });
    }

    foldCard(cardIndex) {
        this.playerCards[this.onTurn][cardIndex] = generateNewCard();
        this.playedCard = -1;
    }

    checkCanPlayCard(cardIndex) {
    //check requirements
        //hocico < undefined je false
        const tur = this.onTurn;
        const car = this.playerCards[tur][cardIndex];
        return (! ( this.playerStats[tur].bricks < car.requirements.bricks ||
            this.playerStats[tur].weapons < car.requirements.weapons ||
            this.playerStats[tur].crystals < car.requirements.crystals));
        //better do it this way instead of feature jumble
    }
    playCard(cardIndex) {
        //save writing
        const tur = this.onTurn;
        const opp = (this.onTurn + 1) % 2;
        //requirements are matched
        this.playedCard = this.playerCards[this.onTurn][cardIndex];
        this.playerCards[this.onTurn][cardIndex] = generateNewCard();
        //substract requirements

        //math max is redundant as requirements are matched
        if( this.playedCard.requirements.bricks ) {//check if defined
            this.playerStats[tur].bricks = Math.max(0,this.playerStats[tur].bricks - this.playedCard.requirements.bricks);
        }
        if( this.playedCard.requirements.weapons ) {//check if defined
            this.playerStats[tur].weapons = Math.max(0,this.playerStats[tur].weapons - this.playedCard.requirements.weapons);
        }
        if( this.playedCard.requirements.crystals ) {//check if defined
            this.playerStats[tur].crystals = Math.max(0,this.playerStats[tur].crystals - this.playedCard.requirements.crystals);
        }

        // apply effects

        //only for thief
        let currentCard = JSON.parse(JSON.stringify(this.playedCard));
        if(currentCard.name === "thief") {
            currentCard.crystals = Math.min(currentCard.crystals,this.playerStats[opp].crystals);
            currentCard.bricks = Math.min(currentCard.bricks,this.playerStats[opp].bricks);
            currentCard.weapons = Math.min(currentCard.weapons,this.playerStats[opp].weapons);
        }
        //this could be better, but for sake of clarity I will leave it as it is
        if( currentCard.effects.crystals ) {//check if defined
            this.playerStats[tur].crystals = Math.max(0,this.playerStats[tur].crystals + this.playedCard.effects.crystals);
        }
        if( currentCard.effects.weapons ) {//check if defined
            this.playerStats[tur].weapons = Math.max(0,this.playerStats[tur].weapons + this.playedCard.effects.weapons);
        }
        if( currentCard.effects.bricks ) {//check if defined
            this.playerStats[tur].bricks = Math.max(0,this.playerStats[tur].bricks + this.playedCard.effects.bricks);
        }
        if( currentCard.effects.mages ) {//check if defined
            this.playerStats[tur].mages = Math.max(1,this.playerStats[tur].mages + this.playedCard.effects.mages);
        }
        if( currentCard.effects.warriors ) {//check if defined
            this.playerStats[tur].warriors = Math.max(1,this.playerStats[tur].warriors + this.playedCard.effects.warriors);
        }
        if( currentCard.effects.builders ) {//check if defined
            this.playerStats[tur].builders = Math.max(1,this.playerStats[tur].builders + this.playedCard.effects.builders);
        }
        if( currentCard.effects.wall ) {//check if defined
            this.playerStats[tur].wall = Math.max(0,this.playerStats[tur].wall + this.playedCard.effects.wall);
        }
        if( currentCard.effects.castle ) {//check if defined
            this.playerStats[tur].castle = this.playerStats[tur].castle + this.playedCard.effects.castle;
        }

        if( currentCard.effects.e_crystals ) {//check if defined
            this.playerStats[opp].crystals = Math.max(0,this.playerStats[opp].crystals + this.playedCard.effects.e_crystals);
        }
        if( currentCard.effects.e_weapons ) {//check if defined
            this.playerStats[opp].weapons = Math.max(0,this.playerStats[opp].weapons + this.playedCard.effects.e_weapons);
        }
        if( currentCard.effects.e_bricks ) {//check if defined
            this.playerStats[opp].bricks = Math.max(0,this.playerStats[opp].bricks + this.playedCard.effects.e_bricks);
        }
        if( currentCard.effects.e_mages ) {//check if defined
            this.playerStats[opp].mages = Math.max(1,this.playerStats[opp].mages + this.playedCard.effects.e_mages);
        }
        if( currentCard.effects.e_warriors ) {//check if defined
            this.playerStats[opp].warriors = Math.max(1,this.playerStats[opp].warriors + this.playedCard.effects.e_warriors);
        }
        if( currentCard.effects.e_builders ) {//check if defined
            this.playerStats[opp].builders = Math.max(1,this.playerStats[opp].builders + this.playedCard.effects.e_builders);
        }
        if( currentCard.effects.e_wall ) {//check if defined
            this.playerStats[opp].wall = Math.max(0,this.playerStats[opp].wall + this.playedCard.effects.e_wall);
        }
        if( currentCard.effects.e_castle ) {//check if defined
            this.playerStats[opp].castle = this.playerStats[opp].castle + this.playedCard.effects.e_castle;
        }

        if( currentCard.effects.attack ) {//check if defined
            if( this.playerStats[opp].wall >= currentCard.effects.attack ) {
                this.playerStats[opp].wall -= currentCard.effects.attack;
            } else {
                this.playerStats[opp].castle -= currentCard.effects.attack - this.playerStats[opp].wall;
                this.playerStats[opp].wall = 0;
            }
        }
        /*achievementy */
    }

    checkGameState() {
        if(this.rounds >= 1000){
            return TIE;
        }
        const tur = this.onTurn;
        const opp = (this.onTurn + 1) % 2;
        //kedze nie je karta, ktora by hracovi znizila hrad, alebo oponentovi zvysila, ak niekto vyhra, je to hrac na tahu
        //our hardcore match will be different. Original wins if player castle is >= 100 AND opponent castle <= 0. We are interested in difference only.
        if(this.type === HARDCORE && (this.playerStats[tur].castle - this.playerStats[opp].castle) >= 100 ) {
            return WIN;
        }
        if(this.type === NORMAL && (this.playerStats[tur].castle >= 100 || this.playerStats[opp].castle <= 0)){
            return WIN;
        }
        return CONTINUE;
    }

    nextTurn() {
        this.rounds += 1;
        if(this.firstTurn) {
            //musi byt onTurn 0
            this.onTurn = 1;
            this.firstTurn = false;
            return;
        } else {
            this.onTurn = (this.onTurn + 1) % 2;
            this.playerStats[this.onTurn].bricks += this.playerStats[this.onTurn].builders;
            this.playerStats[this.onTurn].weapons += this.playerStats[this.onTurn].warriors;
            this.playerStats[this.onTurn].crystals += this.playerStats[this.onTurn].mages;
            return;
        }
    }

    win() {
        const queryInsert = "INSERT INTO tournaments(userId1,userId2,gameResult, gameType) VALUES(" + this.db.escape(this.players[0].id) + "," + this.db.escape(this.players[1].id) + ","+ this.players[this.onTurn].id +", " + this.db.escape(this.type) +")";
        const queryUpdateWin = "UPDATE users SET wins = wins + 1, score = score + 2 WHERE id=" + this.players[this.onTurn].id;
        const queryUpdateLose = "UPDATE users SET loses = loses + 1 WHERE id=" + this.db.escape(this.players[(this.onTurn + 1) % 2].id);
        this.db.query(queryInsert, (error) => {
            if(error){ console.log("insertFailed"); console.log(error); }
        });
        this.db.query(queryUpdateWin, (error) => {
            if(error){ console.log("updateWinFailed"); console.log(error); }
        });
        this.db.query(queryUpdateLose, (error) => {
            if(error){ console.log("updateLoseFailed"); console.log(error); }
        });

        this.finished = true;
        this.winner = this.players[this.onTurn].id;
    }

    tie() {
        this.finished = true;
        this.winner = -1;
        /*
            ID int(11) NOT NULL AUTO_INCREMENT,
    userId1 int(11) NOT NULL,
    userId2 int(11) NOT NULL,
    gameResult int(11) NOT NULL,
    gameType int(11) NOT NULL,
        */
        const queryInsert = "INSERT INTO tournaments(userId1,userId2,gameResult, gameType) VALUES(" + this.db.escape(this.players[0].id) + "," + this.db.escape(this.players[1].id) + ", 0, " + this.db.escape(this.type) +")";
        const queryUpdate = "UPDATE users SET ties = ties + 1, score = score + 1 WHERE id=" + this.db.escape(this.players[0].id) + " OR id=" + this.db.escape(this.players[1].id);
        this.db.query(queryInsert, (error) => {
            if(error){ console.log("insertFailed"); console.log(error); }
        });
        this.db.query(queryUpdate, (error) => {
            if(error){ console.log("updateFailed"); console.log(error); }
        });
    }
}

module.exports = {
    generateNewCard: generateNewCard,
    Tournament: Tournament,
    NORMAL: NORMAL,
    HARDCORE: HARDCORE
}
