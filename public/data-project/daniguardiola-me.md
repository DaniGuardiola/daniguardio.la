<!--
key: daniguardiola-me
name: My personal website (yes, this one)
tags: js,react,web
-->

# My personal website (yes, the one you're currently looking at)

> [Repo on github](https://github.com/DaniGuardiola/daniguardiola-me/)
>
> Hosted in **daniguardiola.me** (right here :D)

## A little bit of history

I've had many websites since I was very young. I remember being a little kid, maybe 7 or 8, and playing around with Microsoft Frontpage (a WYSIWYG webpage editor) on my already-outdated Windows 98 machine. Someone gifted me at some point an introductory book on HTML and I remember looking at the code generated trying to understand the soup of tags.

Some years later I created a few different websites and blogs that I would abandon after a while, with anything from a music "newspaper" to a "comedy" (or whatever "comedy" meant to 12yo me) blog called [elASDFblog](https://web.archive.org/web/20120509105202/http://elasdfblog.blogspot.com.es/) that I maintained with my cousin and a dear internet friend of mine. Now that I think about it, that was shitposting before shitposting was cool on the internets...

Fast forward a few years: I had just turned 18 and I was already working on my first development job, so I felt the need to have something professional and public. I bought the `daniguardiola.me` domain, copied a cool template and built a simple single-page portfolio on top of it. [Then I never ever updated it again other than to change my age.](https://web.archive.org/web/20171221154558/http://daniguardiola.me:80/)

After some time I decided that I needed a decent (and up-to-date) website so I started building one from scratch, using mainly vanilla Javascript, HTML and CSS with a little bit of Polymer Material Design components here and there. [Here's what it looked like!](https://web.archive.org/web/20180927120528/http://daniguardiola.me/daniguardiola-dotme/) It had some very nice parallax and the buttons had a cool ripple effect that colorfully expands to cover the whole container ([I made a gist explaining how it works](https://gist.github.com/DaniGuardiola/c4c623e58dee2a324900)). Please disregard the cringey SJW text- I was young. Also the dude in the picture is not me, it's a stock photo.

![Look at those ripples](/data-project/daniguardiola-me_old-website.gif)

However, I got really busy with my job and my projects at the time and I never finished it. It was really fun building it though. And... that was my last attempt at a personal website until now.

_\* I *still am* an activist, I just realized I needed to take a step back and go with a more professional and focused approach._

## Motivation

My main goal with this website is to have a personal public record of my projects, creations and thoughts. I want it to act as a portfolio of my open-source work and also as a mirror of what's on my mind. And I want to keep it as simple as possible.

## Design

To keep things simple, I decided to go with a minimalistic layout and navigation. The website cannot get any simpler: a header, a menu and a content area. The `projects` and `blog` sections are nothing more than lists of articles (just two layers of navigation), and the `about me` section is just another article where I get to be egocentric in a socially acceptable context.

To make it work as a portfolio, some of my coolest projects are listed in the `projects` section plus some contact links are in the header. To write or post about anything else I have the `blog` section.

The theme I went for is minimalistic / hacky, hence the programming comment style for the navigation menu, and the monospaced font for the list of articles. For the content of the articles I went with a slab font with some additional styling to improve readability.

As a `TODO`, I still need to design and implement the mobile layout.

## Implementation

The website has been implemented in React from scratch, using `create-react-app` as a starting point (boilerplate can be messy so thank you benevolent React Gods for this blessed tooling!).

I was able to hack this together in a couple of days, without fancy stuff like Redux, pre-made components or CSS libs. I didn't even use a routing module because for such a small website, coding it from scratch is not too crazy (and it's fun!).

There is no pagination or infinite scrolling whatsoever in both the blog and the projects lists because I don't think I will ever write as much as to actually make the website slow. The lists of both the projects and the blog posts are preloaded in javascript files containing JSON-structured data, as part of the source itself.

The articles are just plain markdown files that are requested from the server in raw format and are parsed and rendered on the client using [marked](https://github.com/markedjs/marked). The files are stored in the `public` directory, either on the root (the "about me" and the "404" pages are articles) or in the `projects` or `blog` directories.

The main advantage to having the content of the website in the repo itself is that changing it is very easy, with the main drawback being version control pollution (every edit is a commit), but that's not so bad and I can always edit it even from the website interface of the repo host and let the webhooks do their magic to pull and build the changes on my server almost instantly.

## Dotting the is and crossing the ts

### Load time optimization

One of the best ways to significantly improve the user experience is making sure that the webpage is fast and responsive. With a good connection and a fast computer almost any website is fast, no matter how unoptimized it might be, but many **many** times the connection can be poor due to shitty ISPs or spotty mobile networks.

There's a very useful feature on the `network` tab of Chromium's devtools, network throttling, that allows you to simulate different network scenarios (fast or slow 3G, offline or a custom download/upload speed and latency profile) in the webpage. I choose the `slow 3G` preset which, in combination with the `disable cache` and `empty cache and hard reload` options, makes it possible to get accurate data about the whole loading process in an average poor connection and as if the browser had never visited the website before.

With this setup I ran an initial test on a production build:

![no code splitting](/data-project/daniguardiola-me_devtools-no-splitting.png)

Woah! 24 seconds to load a simple list of articles! And this screenshot is one of the better ones, let's not talk about the ones in which it takes 50+ seconds... Look at that bundle size, it's almost a whole megabyte: `822kb`. I had to do something about it.

The bundle includes the following content:

- The source code of the website itself
- `react` and `react-dom` packages
- `marked` package for parsing markdown and rendering it in HTML
- `highlight.js` package for parsing code blocks and rendering them stylized in HTML

Of course, it also includes all of the dependencies for each package.

#### Code splitting

Code splitting is nothing more than serving your code in chunks and only when needed, asynchronously. It allows the website to load faster because it will only download the code (and modules) it needs to load initially. The rest of it will be downloaded on demand. This can be achieved through [`dynamic import`](https://developers.google.com/web/updates/2017/11/dynamic-import). With standard `import` you load all of the required dependencies every time, like this:

```javascript
import aModule from 'a-module'

const someFunction = () => aModule.doSomething()
```

It doesn't matter if `someFunction` is ever executed, even if `aModule` is not used anywhere else, the module will be loaded every time the application (or in this case, website) starts. Instead, you can load the module only when it is required by using `dynamic import`:

```javascript
const someFunction = () => import('a-module')
  .then(aModule => aModule.doSomething())
```

Of course, `someFunction` becomes asynchronous (`Promise`-returning) and the `async / await` syntax can be used, making life easier for everyone:

```javascript
const someFunction = async () => {
  const aModule = await import('a-module')
  aModule.doSomething()
}
```

[`Dynamic import`](https://github.com/tc39/proposal-dynamic-import) (or `import()`) is in stage 3 of the [TC39](https://tc39.github.io/process-document/) process, but thanks to Webpack and babel, it is possible to use it now for the web, as I'm doing in my website.

Now that you know what code splitting and the `dynamic import` are, let's take a look at what could be made with my code... Well, all of the markdown and code highlighting stuff is only needed when an article is being loaded, so let's lazy load it. The responsible for requesting and parsing the markdown files is the method `get()` of the `Article` component, and it is already asynchronous as it involves a network request, so let's try moving the imports there. This is how it looks now (simplified):

```javascript
async get (article) {
  // create and execute the request, then get the body as text
  const request = new Request(`/data-${article}.md`)
  const response = await fetch(request)
  const text = await response.text()

  // dynamically require the marked and highlight.js libs
  const marked = await import('marked')
  const highlightjs = await import('highlight.js')
  marked.setOptions({
    highlight: (code, lang) => highlightjs.highlight(lang, code).value
  })

  // parse and render markdown
  const result = marked(text)
  return result
}
```

After re-building the project, this is the result of the network test:

![code splitting](/data-project/daniguardiola-me_devtools-splitting.png)

That's a different story! Now the main bundle weights just `134kb`, and the website loads in roughly 10 seconds. Not bad for a slow 3G connection! And as soon as I click on any article, the `marked` and `highlight.js` bundles download, just when I needed them.

This was already a great improvement (50%+), but I felt like I could still do more. It is nice that the initial webpage doesn't need the libraries to load, but then whenever I want to load an article I still need to wait to get the libraries I need before anything shows up on screen, even if the webpage has been idle for 2 hours. That doesn't seem right, the goal of code splitting was to make the initial load faster, not to make the website feel irresponsive. This brings me to the next point.

#### Pre-loading

Once the page is loaded (completely loaded and responsive), there's no reason to hold back any additional network requests, even for code that is not yet needed. For this reason, I decided to try and pre-load the markdown and code highlighting libs as soon as the website loads. Thanks to `dynamic import`, I was able to implement it in my `index.js` easy and quick:

```javascript
window.addEventListener('load', () => {
  import('marked')
  import('./lib/highlight.pack')
})
```

Of course, this barely has any appreciable effect if the user clicks on an article as soon as the list loads, or if they navigate directly into an article on first load, but it does help when the user navigates for some seconds through a list before opening an article, and I suspect that will usually be the case.

Indeed, after manually testing it for a while, it does improve the user experience, as the articles now only take as long to load as the article request itself takes to complete, if the user has previously navigated a list for a few seconds.

This was another succesful optimization, but something was not right with the bundle sizes, so I took a deeper look into it and I found a nasty surprise.

#### Removing unused code (duh)

After taking a deeper look at the bundle contents I discovered that the `highlight.js` module was huge, as it contained every single language supported. That was an oversigh on my part, and it had an easy solution: creating my own bundle of the library with only the languages I need from [their website](https://highlightjs.org/download/) and copying it into the project, instead of using the NPM package.

I didn't write down the previous size of the bundle, but the `highlight.js` part of it got reduced into about `30kb`, which I believe is more than `1000%` smaller. That's a huge improvement in size, and the tests proved it to be much faster.

> Note: I had to modify the library [in a kind of dirty way](https://github.com/highlightjs/highlight.js/issues/1245#issuecomment-242865524), but it works fine

#### Pre-rendering markdown

This one's a TODO, but at some point I would like to just pre-render the articles' HTML code with a script and serve it like that directly to the client. This includes the markdown, the code highlighting and any potential extensions of the parser. This offloads the network and some of the work from the client. Also, it ironically renders useless all of the code splitting and preloading stuff.

#### Pre-rendering React

Another TODO. Simple enough: serve the rendered HTML along with the CSS styles directly so that the load is almost instantaneous (although it will still take a while for the website to be responsive, as the react code needs to download and initialize).

### Indicating loading state

When something is loading, an empty interface can be experienced as confusing and frustrating, so it is critical to make sure that the user knows what going on and to give them a sense of motion, let them know that everything is running smoothly and they just need to wait for some content to load.

This is what loading screens and animations are for.

TODO!!!!!!!!!!

## To do

Some details that I want to take care of are:

- Some polish, like scrolling to the top every time the article changes (because currently the scroll position is saved, as the article component is not destroyed at any point, only its content changes).
- Make it work for mobile screens.
- Make tags work, so that a list (either `projects` or `blog`) will be limited to articles containing whatever tag is selected.
- Extend the markdown functionality a bit with support for rich media like tweets or YouTube videos.
- Detect links to the website itself to avoid refreshing the page and use Javascript to navigate instead.
- Get a decent favicon.
- The `create-react-app` template comes with a service worker built-in, and I want to figure out how it works exactly to make it work seamlessly to download and refresh the website with updates, cache the articles correctly and work offline without a problem.

And of course, the most important thing: **fill it up with content**. I will be updating this article as I keep working on my website.

That's all folks!