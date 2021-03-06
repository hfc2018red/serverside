const Thread = require('./models/Thread');
const uuidv4 = require('uuid/v4');

module.exports = (app, io) => {
  app.get('/threads', (req, res) => {
    Thread.find().sort({ updated_at: 'desc' }).lean().exec((err, threads) => {
      if (!err) {
        res.json(threads);
      }
    });
  });

  app.get('/threads/:threadId', (req, res) => {
    Thread.find({
      uuid: req.params.threadId
    }).lean().exec((err, thread) => {
      if (!err) {
        res.json(thread);
      } else {
        res.json({ msg: 'error' });
      }
    });
  });

  app.post('/message', (req, res) => {
    console.log(req.body);
    Thread.findOne({
      uuid: req.body.threadId
    }, (err, thread) => {
      if (!err) {
        if (!thread) {
          thread = new Thread({
            uuid: uuidv4()
          });
          thread.messages = [];
        }
        thread.messages.push({
          body: req.body.body,
          creator: req.body.uuid || undefined
        });

        thread.save((err, thread) => {
          if (!err) {
            res.json(thread);
            io.emit('message', 'new');
          } else {
            res.json({ messages: [] });
          }
        });
      } else {
        res.json({ msg: 'err' });
      }
    });
  });
};
