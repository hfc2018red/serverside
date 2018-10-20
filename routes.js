const Thread = require('./models/Thread');
const uuidv4 = require('uuid/v4');

module.exports = app => {
  app.get('/threads', (req, res) => {
    Thread.find().lean().exec((err, threads) => {
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
          body: req.body.body
        });

        thread.save(() => {
          res.send('Saved');
        });
      }
    });
  });
};
