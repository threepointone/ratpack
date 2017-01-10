ratpack
---

[work in progress]

![ratpack](https://i.imgur.com/eEtI35w.png)

ratpack is for beginners, tinkerers, ents, cylons.

quickstart
---

- write a javascript file, save it somewhere. maybe it looks like this - 
  
  ```jsx
    require('react-dom').render(
      <div>hello world</div>, 
      document.getElementById('root'))
  ```
- drag it on to the app.
- *magic*


more 
---

ratpack gets rid of all the starting boilerplate for building and running the so-called
'modern' javascript stack, letting you immediately jump into the core of your problem. 

- steals a bunch of code/tools from create-react-app for live reloading, in-browser error messaging, 
file loaders for css, images, etc, and you can load your own loaders with js pragmas
- comes with liberal babel defaults, including future facing extensions (and decorators!). You can also use a 
local `.babelrc` file (experimental).
- preloads libraries like react, react-router@4, and glamor. It'll also use modules from 
your own `node_modules` folder, *and* you can add your own 'globally' by installing with npm/yarn to `~/.ratpack`
- use a local `public` folder to serve static assets that can't be imported (todo - and / or to serve a custom `index.html`)
- todo - will autoupdate itself whenever I make a 'release', so you're using the latest versions of presets and packaged libs almost as soon they're out
- todo - a preferences pane to edit 'global' settings; toggle presets, add libs, etc




long, rambly rationale
---

tl;dr - old school flow, new age ride.

So, you're reading a tutorial on requestIdleCallback / render callbacks with react / javascript thoughtlording. Or you've just had an idea for a new algorithm for reversing a binary tree. Or maybe you need to write a shitty benchmark to convince your boss that yes, immutable data is fast enough. In any case, you need to quickly write and run some code. What do you do?

These first 2 minutes are critical. The idea you've just had is ephemeral, and needs to be written down fast. It'll be dirty, and you might just throw it away later. At this point, you don't care about the framework wars and modularity shaming and whatever. This is all about you. 

Back in my day, I would write a javascript file (and a dumb html holder), and just run it in a browser. Sure, I had a bajillion other problems, but I liked the brutal efficiency of being seconds away from taking a random idea and turning it into pixels. Bikeshedding over 'build systems' was never the first step.

Mind you, we still had build systems, and we bikeshedded a lot over them and how we built our apps, but those 'apps' were a different context; built for teams and stability. Indeed, deep inside those app folders it wasn't uncommon to find 'demo' pages and `.md` scratchpads for ideas. 

But 'personal' coding? Totally different rules. For one, you'd usually want the latest versions of libs. You want as little boilerplate as possible, to jump into the meat of the problem immediately. Maybe you'd have a little `/code` folder with all your commonly used libs and personal experiments. Even in the context of a larger project, maybe you want to work on a component in isolation, but don't want / need to use the project's main infrastructure.

Times change.

Transpiled languages rose as a way of papering over some javascript's problems, and to use and experiment with future features in browsers that don't support it yet. And it's been absolutely *fantastic*. The pipeline of new features should keep us busy for a couple of years, if not more. Extensions like JSX and TypeScript make writing code an absolute joy (...well, mostly). I'll be blunt - I can't do UI programming without JSX anymore; having a first class UI construct in your programming language makes soooo much sense. Further, having a React dialect at arm's length means I'm not spending any mindspace on dom mutations. It's the small things, y'know?

The setup process to use transpiled languages though... not so great. You need to install and configure a pipeline of tools, usually cli + node based, in a terminal, and pay this cost almost every time you need to run a new file. nwb, create-react-app, etc get *so* close, but by nature of their being designed for 'apps', don't achieve the lightweight, experimental feel I'm looking for. Also, CLIs, ick.

We're UI developers. We can do better. By building beginner/tinkerer friendly tooling, we can automate some of our own pain away, and increase how inclusive we are as a community and as a technology. Here's my attempt. 

First, some of my 'requirements' - 
- I'd like to be able to write a javascript file, with es6 and jsx and whatnot, and just run it in a browser. This could be on my desktop, my downloads folder, wherever.
- I do *not* want to have to install or configure anything 'build' related every time.
- I'd like some liberal defaults, and include some prepackaged libraries like react, react-router, glamor, polyfills for fetch etc.
- *maybe* I'll have a local node_modules, or in a folder higher up my path 
- *perhaps* I'll have a local `public` folder too, with images and css or whatever I'll need 
- *perchance* if I need to, I'd like a custom babel config to mess with a plugin or preset 


Let's imagine the core experience - I'd like to have an app (like a legit, macOS/windows/linux desktop app), and I'd like to drag and drop my `.js` file into it / onto its dock icon, and it would "just work". It could open a browser tab to that file running in a simple html page, and reload whenever I make file changes. A list of previously opened files would be nice.

Hence... *drum roll*... ratpack. Hope you like it. Lemme know what I could do better, and what you'd like to see!


feature wishlist 
---

- better design
- frictionless mobile web dev
- build / deploy to now / surge / etc
- the service worker treatment 
- end to end encrypted share ala ngrok
- multiple languages; flow, reason, node, whatevs 
- eject config, for carrying on a 'real' project
- a smaller package

the shoulders of giants
---

this couldn't exist without the work of thousands of people in the OSS world. Some projects specifically -

- nwb, create-react-app, and the whole family of CLI apps to bootstrap, run and build your javascript apps
- webpack2, the giant swiss army knife of javascript bundlers 
- babel, for all your javascript transformation needs
- electron, giving a truly desirable target for building javascript tooling 
- and of course, react and its entire ecosystem.


project status
---

This is stil *very* early work, with a large number of todos to get through before it's 'production ready'. 
That said, this is already pretty useful. If you'd like to try it out, either try out the 
prototype mac release, or clone this repo and run `npm run && npm run package-app` to generate the binary for 
your computer. Have fun!

