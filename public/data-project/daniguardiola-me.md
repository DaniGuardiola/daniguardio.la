<!--
key: daniguardiola-me
name: Building my personal website (yes, this one)
tags: js,react,web
-->

# Building my personal website

> [Repo on github](https://github.com/DaniGuardiola/daniguardiola-me/)
>
> Available at **daniguardiola.me** (right here :D)

## TL;DR ⚡️

I built this portfolio / blog from scratch using React and a markdown parser. It was fun.

## A little bit of history 📅

I've had many websites since I was very young. I remember being a little kid, maybe 7 or 8, and playing around with Microsoft Frontpage (a WYSIWYG webpage editor) on my already-outdated Windows 98 machine. Someone gifted me at some point an introductory book on HTML and I remember looking at the code generated trying to understand the soup of tags.

Some years later I created a few different websites and blogs that I would abandon after a while, with anything from a music "newspaper" to a "comedy" (or whatever "comedy" meant to 12yo me) blog called [elASDFblog](https://web.archive.org/web/20120509105202/http://elasdfblog.blogspot.com.es/) that I maintained with my cousin and a dear internet friend of mine. Now that I think about it, that was shitposting before shitposting was cool on the internets...

Fast forward a few years: I had just turned 18 and I was already working on my first development job, so I felt the need to have something professional and public. I bought the `daniguardiola.me` domain, copied a cool template and built a simple single-page portfolio on top of it. [Then I never ever updated it again other than to change my age.](https://web.archive.org/web/20171221154558/http://daniguardiola.me:80/)

After some time I decided that I needed a decent (and up-to-date) website so I started building one from scratch, using mainly vanilla Javascript, HTML and CSS with a little bit of Polymer Material Design components here and there. [Here's what it looked like!](https://web.archive.org/web/20180927120528/http://daniguardiola.me/daniguardiola-dotme/) It had some very nice parallax and the buttons had a cool ripple effect that colorfully expands to cover the whole container ([I made a gist explaining how it works](https://gist.github.com/DaniGuardiola/c4c623e58dee2a324900)). Please disregard the cringey SJW text- I was young. Also the dude in the picture is not me, it's a stock photo.

![Look at those ripples](/img/daniguardiola-me_old-website.gif)

However, I got really busy with my job and my projects at the time and I never finished it. It was really fun building it though. And... that was my last attempt at a personal website until now.

_\* I *still am* an activist, I just realized I needed to take a step back and go with a more professional and focused approach._

## Motivation 🎯

My main goal with this website is to have a personal public record of my projects, creations and thoughts. I want it to act as a portfolio of my open-source work and also as a mirror of what's on my mind. And I want to keep it as simple as possible.

## Design 📐

To keep things simple, I decided to go with a minimalistic layout and navigation. The website cannot get any simpler: a header, a menu and a content area. The `projects` and `blog` sections are nothing more than lists of articles (just two layers of navigation), and the `about me` section is just another article where I get to be egocentric in a socially acceptable context.

To make it work as a portfolio, some of my coolest projects are listed in the `projects` section plus some contact links are in the header. To write or post about anything else I have the `blog` section.

The theme I went for is minimalistic / hacky, hence the programming comment style for the navigation menu, and the monospaced font for the list of articles. For the content of the articles I went with a slab font with some additional styling to improve readability.

As a `TODO`, I still need to design and implement the mobile layout.

## Implementation 🔨

The website has been implemented in React from scratch, using `create-react-app` as a starting point (boilerplate can be messy so thank you benevolent React Gods for this blessed tooling!).

I was able to hack this together in a couple of days, without fancy stuff like Redux, pre-made components or CSS libs. I didn't even use a routing module because for such a small website, coding it from scratch is not too crazy (and it's fun!).

There is no pagination or infinite scrolling whatsoever in both the blog and the projects lists because I don't think I will ever write as much as to actually make the website slow. The lists of both the projects and the blog posts are preloaded in javascript files containing JSON-structured data, as part of the source itself.

The articles are just plain markdown files that are requested from the server in raw format and are parsed and rendered on the client using [marked](https://github.com/markedjs/marked). The files are stored in the `public` directory, either on the root (the "about me" and the "404" pages are articles) or in the `projects` or `blog` directories.

The main advantage to having the content of the website in the repo itself is that changing it is very easy, with the main drawback being version control pollution (every edit is a commit), but that's not so bad and it allows me to let the webhooks do their magic to pull and build the changes on my server almost instantly.

## Load time optimization 🐢

Making the website load fast is critical for a good user experience. I wrote a blog post about how I did it:

> [📝Optimizing the load time of my website](/b/optimizing-the-load-time-of-my-website)

## To do ✔️

There are still a few details that I need to take care of, including:

- Make it work for mobile screens.
- Make #tags work, so that a list (either `projects` or `blog`) will be limited to articles containing whatever tag is selected.
- Extend the markdown functionality a bit with support for rich media like tweets or YouTube videos.
- Detect links to the website itself to avoid refreshing the page and use Javascript to navigate instead.
- Get a decent favicon.
- The `create-react-app` template comes with a service worker built-in, and I want to figure out how it works exactly to make it work seamlessly to download and refresh the website with updates, cache the articles correctly and work offline without a problem.

And of course, the most important thing: **fill it up with content**. I will be updating this article as I keep working on my website.

That's all folks!