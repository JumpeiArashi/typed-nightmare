import test = require('blue-tape');

import Nightmare = require('nightmare');

new Nightmare({show: true}).goto('https://google.com').wait(5000).evaluate((hoge) => {}, 'st').end().then(a => {a});