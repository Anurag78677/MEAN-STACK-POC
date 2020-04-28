const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();
const PORT = 3000;


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, DELETE, POST, PUT,")
    next();
});

app.use(express.static(__dirname + '././public'));
console.log(__dirname);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// Configuring the database
const dbConfig = require('./app/config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


app.get('/', (req, res) => {
    res.sendfile('./public/index.html');
    res.json({ "message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes." })
});

require('./app/routes/note.routes.js')(app);
// , respondStatic

const httpServer = http.createServer(app);
httpServer.listen(PORT, () => {
    console.log(`API running on localhost:${PORT}`)
});