const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = new mongoose.Schema({
  body: String,
  creator: { type: Schema.Types.ObjectId, ref: 'User' }
});

const ThreadSchema = mongoose.Schema({
  messages: [Message],
  uuid: String
});

module.exports = mongoose.model('Thread', ThreadSchema);
