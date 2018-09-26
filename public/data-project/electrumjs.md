<!--
key: electrumjs
name: electrumjs: an ElectrumX communication layer for Node.js
tags: js,typescript,crypto
-->

# electrumjs: an ElectrumX communication layer for Node.js

> [electrumjs on Github](https://github.com/DaniGuardiola/electrumjs)

> [electrumjs on npm](https://www.npmjs.com/package/electrumjs)

When I was just getting started on my [lightweight bitcoin wallet project](/project/coinwallet), one of the main challenges remained the connection and communication with the Electrum servers.

Electrum is a lightweight bitcoin (and many other cryptocurrencies nowadays) wallet software that involves a client (desktop and Android apps) and a server that provides it with the requested data from the blockchain. Both the [client](https://github.com/spesmilo/electrum) and the [server](https://github.com/kyuupichan/electrumx) are opensource.

It is, however, possible to ditch the client and use the server for any purposes. [Electrum servers](https://electrumx.readthedocs.io/en/latest/protocol-methods.html) provide different methods like `blockchain.transaction.get` that return some data (transaction data in this case) and subscriptions like `blockchain.headers.subscribe` that notify you of new data in the blockchain (in this case, the headers of every new block).

The protocol used by electrum is JSON RPC 2.0 (1.0 is supported but 2.0 is preferred) over a TCP socket connection (optionally using TLS).

Now let me give you some context about my project to further clarify what the challenge was about. I'm trying to build a React Native app for Android and iOS, more specifically a lightweight bitcoin wallet. That means that the platform I'm gonna be using is a Javascript engine without the NodeJS environment. React Native has a bunch of APIs, as Expo does, but all of the NodeJS functionality layer is unavailable.

That means no `fs`, no `crypto`, no `Buffer`, no `net`, etc. That last one is very relevant for this specific problem, as `net` is the package that enables TCP socket connections through the `TCPSocket` class. Quick example of how it usually looks ([source](https://www.hacksparrow.com/tcp-socket-programming-in-node-js.html)):

```javascript
var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;

var client = new net.Socket();
client.connect(PORT, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
    client.write('I am Chuck Norris!');

});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {
    
    console.log('DATA: ' + data);
    // Close the client socket completely
    client.destroy();
    
});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});
```