'use strict';


//---------//
// Imports //
//---------//

const net = require('net')
  , { attachDestroyMethod } = require('./index.js')
  ;


//------//
// Main //
//------//

let server = net.createServer(conn => {
  const i = setInterval(
    () => {
      conn.read();
      conn.write('hi\n');
    }
    , 100
  );
  i.unref();
});
server.listen(1337);
attachDestroyMethod(server);

let connected = 0;
for (let i = 0; i < 10; i++) {
  const client = net.connect(1337);
  client.on('connect', () => {
    connected++;
    if (connected === 10) setTimeout(destroy);
  });

  // just ignore the resets
  client.on('error', () => {});
}

function destroy() {
  server.destroy()
    .then(() => { console.log('ok'); })
    .catch(err => { console.error(err); })
    ;
}
