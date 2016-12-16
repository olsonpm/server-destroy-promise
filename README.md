# server-destroy-promise

Copied from Isaacs' server-destroy, with a few changes  
1. lib exposes `attachDestroyMethod` property instead of returning the function.  See example below.
2. use `once` instead of `on` per [issue #6](https://github.com/isaacs/server-destroy/issues/6)
3. `attachDestroyMethod` returns the server to allow for more functional use (*still mutates the server, the method just also returns it*)
4. `destroy()` now returns a promise instead of taking a callback
5. Uses (some) es6 syntax that should be node v4+ compatible.  If this library ends up
  being used by more than just myself, then I'll ensure older node version
  compatibility via babel.


## Usage

```js
import { attachDestroyMethod } from 'server-destroy-promise';

let server = http.createServer(function(req, res) {
  /* do something */
});

server.listen(PORT);

// assignment is not necessary, just shows the return value
server = attachDestroyMethod(server);

// some time later...
server.destroy()
  .then(/* do something */)
  .catch(/* do something with the error */)
  ;
```
