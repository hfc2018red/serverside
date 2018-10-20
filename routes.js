const Thread = require('./models/Thread');

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
    const thread = Thread.findOne({
      uuid: req.body.threadId
    });
    thread.messages.push({
      body: req.body.body
    });

    thread.save(() => {
      res.send('Saved');
    });
  });
};
