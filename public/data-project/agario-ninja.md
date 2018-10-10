<!--
key: agario-ninja
name: Agar.io ninja: hacking a web game to allow keyboard controls
tags: js,chrome,fun
-->

# Agar.io ninja: hacking a web game to allow keyboard controls

> [Repo on Github](https://github.com/DaniGuardiola/agario-ninja) (unmaintained)
>
> [Chrome webstore listing](https://chrome.google.com/webstore/detail/agario-pro-controls/pbobiamfiefihckgfbppiigkfbkbmhlm) (broken due to agar.io updates)

## TL;DR ⚡️

I made a mod for the popular online game [Agar.io](https://agar.io) that allowed keyboard controls, in the form of a Chrome extension. It was downloaded and used by many users worldwide.

## About 📃

This project is a textbook example of the [Pareto principle](https://en.wikipedia.org/wiki/Pareto_principle). It was made as a fun way to kill time, taking barely an afternoon, and it ended up being one of my biggest sources of passive income for a while.

Let me give you some context. A few years ago, an online game named [Agar.io](https://agar.io) got insanely popular, everyone was playing it and YouTube was full of videos about it. It was crazy, I'm not exactly sure but I wouldn't be surprised if the total user count is in the seven digits.

The game is very simple, you play as a blob that eats little dots to grow in size, you can eat (or be eaten by) other players, shoot mass if you're teaming up with other player and split yourself to move faster, which is useful when attacking or escaping but also risky as the size of your blobs gets halved, which makes it easier for other players to eat you.

![A satisfying gameplay of Agar.io](/img/agario-ninja_demo.webp)

It is a lot of fun, but I had an issue with it when playing on my laptop: the game is controlled with the mouse and I didn't even have a mouse, I had a trackpad that barely worked and playing like that was not enjoyable at all. To fix this, I came up with the idea of modifying the game so that it would work with keyboard controls (WASD).

To make it even more interesting, I told a friend about my idea and we made a competition to see who would be able to implement it first. I don't remember who won but we both were able to get working prototypes in under an hour. It was pretty simple, we just had to find the element that was listening for mouse events and then programmatically recreate them every time a key was pressed. For example, if the user presses the right button, a mouse event is generated at the middle right of the screen.

The prototype worked but it was buggy as hell. Multiple simultaneous key presses didn't work (like up and left), the blob would sometimes keep going indefinitely after releasing all keys, shooting mass and splitting didn't work properly...

## Publishing it 💰

I turned my code into a Chrome extension and I kept working on it. After a few hours, I had all the details figured out and it was up on the webstore. I spent about 6 hours in total working on it. I added some nice details, like optionally aiming with the mouse to shoot mass and perform a split (with a nice scope sprite), a switch to turn the mod on and off at any time, key bindings for the settings, etc. Then I asked a very talented friend, [Michael Cook](https://cookicons.co/), for a logo, and here it is:

![The logo](/img/agario-ninja_logo.png)

After some months, the user base grew to a surprising amount, translating into an increased income from the ads that were displayed on the website that opened after installing or updating the extension, which obviously came as a very positive surprise.