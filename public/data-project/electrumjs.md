<!--
key: electrumjs
name: electrumjs: an ElectrumX communication layer for Node.js, the browser and React Native
tags: js,typescript,crypto
-->

# electrumjs: an ElectrumX communication layer for Node.js, the browser and React Native

> [electrumjs on Github](https://github.com/DaniGuardiola/electrumjs)

> [electrumjs on npm](https://www.npmjs.com/package/electrumjs)

When I was just getting started on my [lightweight bitcoin wallet project](/project/coinwallet), one of the main challenges remained the connection and communication with the Electrum servers.

Electrum is a lightweight bitcoin (and many other cryptocurrencies nowadays) wallet software that involves a client (desktop and Android apps) and a server that provides it with the requested data from the blockchain. Both the [client](https://github.com/spesmilo/electrum) and the [server](https://github.com/kyuupichan/electrumx) are opensource.

It is, however, possible to ditch the client and use the server for any purposes. [Electrum servers](https://electrumx.readthedocs.io/en/latest/protocol-methods.html) provide different methods like `blockchain.transaction.get` that return some data (transaction data in this case) and subscriptions like `blockchain.headers.subscribe` that notify you of new data in the blockchain (in this case, the headers of every new block).

The protocol used by electrum is JSON RPC 2.0 (1.0 is supported but 2.0 is preferred) over a TCP socket connection (optionally using TLS).

## The challenge

I'm trying to build a React Native app for Android and iOS, more specifically a lightweight bitcoin wallet. That means that the platform I'm gonna be using is a Javascript engine without the NodeJS environment. React Native has a bunch of APIs, as Expo does, but all of the NodeJS functionality layer is unavailable.

That means no `fs`, no `crypto`, no `Buffer`, no [`net`](https://nodejs.org/api/net.html), etc. That last one is very relevant for this specific problem, as `net` is the package that enables TCP socket connections through the `Socket` class. Here's an example I found ([source](https://www.hacksparrow.com/tcp-socket-programming-in-node-js.html)):

```javascript
const net = require('net')

const HOST = '127.0.0.1'
const PORT = 6969

const client = new net.Socket()
client.connect(PORT, HOST, () => {
    console.log(`CONNECTED TO: ${HOST}:${PORT}`)
    // write a message to the socket as soon as the client is connected
    // the server will receive it as message from the client 
    client.write('I am Chuck Norris!')
})

// add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', data => {    
    console.log(`DATA: ${data}`)
    // close the client socket completely
    client.destroy()    
})

// add a 'close' event handler for the client socket
client.on('close', () => console.log('Connection closed'))
```

## The options

After some intense googling, these are the options I found:

- Using [`react-native-tcp`](https://github.com/PeelTechnologies/react-native-tcp)

When I first found this native (not pure Javascript) package for React Native I thought it was the most straightforward solution. However, after taking a deeper look I found a few problems with it, like the complications of using native code (Android and iOS have different setups, Expo cannot be used anymore, the project has to be ejected...), but the killer issue was the [lack of support for TLS](https://github.com/PeelTechnologies/react-native-tcp/issues/15) connections, which I believe is a must for any Bitcoin-related piece of software (wallet addresses could be intercepted and be correlated, rendering the privacy of BIP32 useless).

If I was gonna go with this options, I would have to somehow re-code the TLS layer on top of the `net` package, which likely means some native iOS and Android code. After taking a look at the [`nodejs` implementation of TLS](https://github.com/nodejs/node/blob/master/lib/tls.js) (as mentioned in the project issue) I decided that this was probably overkill.

- Using a proxy service like [`websockify`](https://github.com/novnc/websockify)

Another option is having a middleman connect to clients and ElectrumX servers in order to create a bridge. One option would be to provide a REST API, but that would quickly become a mess with subscriptions as polling overloads servers and is frequently laggy. The other option is a websocket interface, which can be achieved with `websockify` and looks pretty automagical.

The main issue with this solution is that new servers have to be added, and all of the traffic from the use of this client would need to be sustained by these specific servers, when there's a whole bunch of ElectrumX servers already up and running and maintained by the community. I don't think the overhead is worth it.

- Implementing websocket support directly in the ElectrumX codebase

