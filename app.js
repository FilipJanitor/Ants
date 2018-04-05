const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const schemaValidator = require('ajv');
const bodyParser = require('body-parser')
const app = express();

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

app.use(bodyParser.json());
