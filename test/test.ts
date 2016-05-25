import test = require('blue-tape');
import Nightmare = require('nightmare');

test('#engineVersions', t => {
  t.plan(2);
  new Nightmare().engineVersions()
    .end()
    .then(versions => {
      t.ok(versions.electron);
      t.ok(versions.chrome);
    });
});

test('#useragent', t => {
  t.plan(1);
  new Nightmare()
    .useragent('nightmare')
    .goto('https://example.com')
    .wait(50)
    .evaluate(() => {return navigator.userAgent;})
    .end()
    .then(ua => {
      t.is(ua, 'nightmare');
    });
});

test('#end', t => {
  t.plan(1);
  const nightmare = new Nightmare();
  nightmare
    .end()
    .then(() => {
      t.ok(nightmare['ending']);
    });
});

test('penetration', t => {
  t.skip();
  return new Nightmare({show: true})
    .goto('https://github.com/search')
    .wait('[placeholder="Search GitHub"]')
    .type('[placeholder="Search GitHub"]', 'nightmare')
    .click('.flex-table-item button')
    .wait('[href="/segmentio/nightmare"]')
    .insert('[value="nightmare"]', '')
    .insert('[value="nightmare"]', 'electron')
    .click('.flex-table-item button')
    .wait('[href="/electron/electron"]')
    .back()
    .forward()
    .refresh()
    .end();
});
