const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 3000;

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.set('origins', '*:*');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;

require('./routes')(app, io)

app.use(express.static('serverpublic'));
app.use(express.static('build'));

db.on('error', () => {
  console.error(`Cannot connect to db ${process.env.MONGODB_URI}`);
});

db.on('open', () => {
  server.listen(port, () => {
    console.log(`Listening on ${port}`);
  });
});
