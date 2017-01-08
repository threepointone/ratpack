magic pragmas
---

ratpack supports some magic incantations you can put at the top of your entry file 
to customize the webpack/babel backends. A simple example would look like this - 

```jsx
/* @ratpack {
  devtool: 'eval',
  alias: {
    react: 'preact-compat',
    react-dom: 'preact-compat'
  }
}
*/
require('react-dom').render(<div>look, preact!</div>, window.root)
```
(assuming preact-compat is available locally or in `.ratpack/node_modules`)

Here's a full list of 'somewhat working' pragmas

devtool
---

`devtool: 'source-map'` [(ref.)](https://webpack.js.org/configuration/devtool/#devtool)

public 
---

`public: './my/public/folder'` [(ref.)](https://webpack.js.org/configuration/dev-server/#devserver-contentbase)

jsx 
---

`jsx: 'Inferno.createElement'`

This is different from babel's `@jsx` pragma, in that it will apply to *all* js files, not just the one 

proxy
---

`proxy: { '/api': 'http://localhost:3000' }` [(ref.)](https://webpack.js.org/configuration/dev-server/#devserver-proxy)


provide 
---

`provide: { 'Glamor': 'glamor/react' }` [(ref.)](https://webpack.js.org/guides/shimming/#provide-plugin)

alias 
---

```
alias: {
  react: 'preact-compat',
  react-dom: 'preact-compat'
}
```
 [(ref.)](https://webpack.js.org/configuration/resolve/#resolve-alias)

define 
---

`define: { 'process.env.NODE_ENV': 'test' }` [(ref.)](https://webpack.js.org/plugins/define-plugin/)

rules 
---

`rules: [ { files: '*.vue', loader: 'vue-loader', options: { some: 'options' } } , ...]` 

nb: `files` is a glob, which gets converted to a regex for webpack's `test` prop 

babel presets and plugins
---
```
babel: {
  presets: ['vue', [ 'a11y', {...} ],
  plugins: ['./some/path', ... ]
}
```

---

These don't 'work' yet, but sharing possible syntax 

target
---

`target: 'node'` [(ref.)](https://webpack.js.org/configuration/target/#target)

offline 
---

`offline: <options>` [(ref.)](https://github.com/NekR/offline-plugin)

autoinstall
---

`autoinstall: true` [(ref.)](https://github.com/ericclemmons/npm-install-webpack-plugin)

plugins
---

`plugins: [ {<module> <options>}, ... ]`


thoughts/questions/ideas?