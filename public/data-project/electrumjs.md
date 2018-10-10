<!--
key: electrumjs
name: electrumjs: an ElectrumX client for Node.js, the browser and React Native
tags: js,typescript,crypto
-->

# electrumjs: an ElectrumX client for Node.js, the browser and React Native

> **Work in progress!** I'm still working on this project and it's not ready for production yet
>
> [electrumjs on Github](https://github.com/DaniGuardiola/electrumjs)
>
> [electrumjs on npm](https://www.npmjs.com/package/electrumjs) (not published yet, coming soon)

## TL;DR ⚡️

I'm working on a Javascript module to interface with Electrum servers through TCP sockets and websockets. Electrum is lightweight bitcoin wallet software. The reason I started this project is that I need it for my React Native bitcoin wallet project, [⚙️Coinwallet](/project/coinwallet).

## About 📃

When I was just getting started on my [⚙️lightweight bitcoin wallet project](/project/coinwallet), one of the main challenges remained the connection and communication with the Electrum servers.

Electrum is a lightweight bitcoin (and many other cryptocurrencies nowadays) wallet software that involves a client (desktop and Android apps) and a server that provides it with the requested data from the blockchain. Both the [client](https://github.com/spesmilo/electrum) and the [server](https://github.com/kyuupichan/electrumx) are opensource.

It is, however, possible to ditch the client and use the server for any purposes. [Electrum servers](https://electrumx.readthedocs.io/en/latest/protocol-methods.html) provide different methods like `blockchain.transaction.get` that return some data (transaction data in this case) and subscriptions like `blockchain.headers.subscribe` that notify you of new data in the blockchain (in this case, the headers of every new block).

The protocol used by electrum is JSON RPC 2.0 (1.0 is supported but 2.0 is preferred) over a TCP socket connection (optionally using TLS).

## The challenge 🔒

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

Websockets and normal requests are supported out-of-the-box though.

## The options 🔑

After some intense googling, these are the options I found:

- Using [`react-native-tcp`](https://github.com/PeelTechnologies/react-native-tcp) ❌

When I first found this native (not pure Javascript) package for React Native I thought it was the most straightforward solution. However, after taking a deeper look I found a few problems with it, like the complications of using native code (Android and iOS have different setups, Expo cannot be used anymore, the project has to be ejected...), but the killer issue was the [lack of support for TLS](https://github.com/PeelTechnologies/react-native-tcp/issues/15) connections, which I believe is a must for any Bitcoin-related piece of software (addresses could be intercepted by an attacker that can then link them as part of the same wallet, rendering the privacy of BIP32 useless).

If I was gonna go with this option, I would have to somehow re-code the TLS layer on top of the `net` package, which likely means some native iOS and Android code. After taking a look at the [`nodejs` implementation of TLS](https://github.com/nodejs/node/blob/master/lib/tls.js) (as mentioned in the project issue) I decided that this was probably overkill.

- Using a proxy service like [`websockify`](https://github.com/novnc/websockify) ❌

Another option is having a middleman connect to clients and ElectrumX servers in order to create a bridge. One option would be to provide a REST API, but that would quickly become a mess with subscriptions as polling overloads servers and is frequently buggy. The other option is a websocket interface, which can be achieved with `websockify` and looks pretty automagical.

The main issue with this solution is that new servers have to be added, and all of the traffic from this client would need to be sustained by these specific servers, when there's a whole bunch of ElectrumX servers already up and running and maintained by the community. I didn't think the overhead is worth it.

- Implementing websocket support directly in the ElectrumX codebase ✔️

ElectrumX is [open-source and actively maintained on Github](https://github.com/kyuupichan/electrumx/), so it doesn't hurt to consider this option. It is the most straightforward way to get good support for ElectrumX on React Native applications, but it involves learning about ElectrumX's basecode and creating an implementation with tests, documentation and all that, which is not completely trivial.

To explore this option, [I created an issue](https://github.com/kyuupichan/electrumx/issues/499) asking the maintainer about it, and I got a positive answer: the PR will be accepted if everything (tests, quality, etc) is in order. I also did [some preliminary research](https://gitlab.com/DaniGuardiola/electrum-websocket-demo) and my plan was to delegate the task to a Python developer instead of tackling it myself. Python was the first programming language I learned but it's been a while since I last used it, so coding this myself would have involved re-learning it. However, in the end I ended up doing just that, and working on the [⚙️WePlayBot](/project/weplaybot) project was really helpful, as it involved a lot of Python programming. The work on the ElectrumX repo is not really relevant to `electrumjs`, so I wrote a separate blog post about it:

> [📝Adding websocket support to ElectrumX servers](/b/adding-websocket-support-to-electrumx-servers)

## Trying not to reinvent the wheel 🔄

> "If you wish to make an apple pie from scratch, you must first invent the universe" - [Carl Sagan](https://www.youtube.com/watch?v=7s664NsLeFM)

All good programmers know that 99.99% of the time the best approach to a programming challenge of any kind is to offload as much of the work as possible to existing software libraries. At the end of the day, what you really want is to have something that works well without creating everything from scratch. Because to get an apple pie made it's easier to use the already existing oven than to create the universe and then wait 13.8 billion years.

And so I went on a search for prior work: