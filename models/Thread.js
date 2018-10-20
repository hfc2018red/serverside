const mongoose = require('mongoose');

const Message = new mongoose.Schema({
  body: String
});

const ThreadSchema = mongoose.Schema({
  messages: [Message],
  uuid: String
});

module.exports = mongoose.model('Thread', ThreadSchema);
