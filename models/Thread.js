const mongoose = require('mongoose');

const Message = new mongoose.Schema({
  body: String,
  creator: String,
  location: String,
  method: String,
  contact: String
});

const ThreadSchema = mongoose.Schema({
  messages: [Message],
  uuid: String
}, { timestamps: true });

module.exports = mongoose.model('Thread', ThreadSchema);
