const jsdom = require('jsdom');

beforeEach(done => {
  jsdom.env({
    html: '<!doctype html><html><body></body></html>',
    scripts: [],
    done(err, createdWindow) {
      if (err) {
        return done(err);
      }

      global['window'] = createdWindow;
      global['document'] = createdWindow.document;
      global['navigator'] = createdWindow.navigator;

      done();
    }
  });
});
