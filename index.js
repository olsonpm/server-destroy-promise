'use strict';


//---------//
// Imports //
//---------//

const promisify = require('pify');


//------//
// Main //
//------//

const attachDestroyMethod = server => {
  const connections = {};

  server.on('connection', conn => {
    const key = conn.remoteAddress + ':' + conn.remotePort;
    connections[key] = conn;
    conn.once(
      'close'
      , () => {
        delete connections[key];
      }
    );
  });

  server.destroy = () => {
    const pRes = promisify(server.close.bind(server))();

    for (var key in connections) {
      connections[key].destroy();
    }

    return pRes;
  };
};


//---------//
// Exports //
//---------//

module.exports = { attachDestroyMethod };
