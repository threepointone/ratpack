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

Here's a full list of working pragmas

- `devtool: 'source-map'` [(ref.)](https://webpack.js.org/configuration/devtool/#devtool)
- `reload: false` toggle live reloads, defaults to `true`
- `port: 3999` 
- `public: './my/public/folder'` [(ref.)](https://webpack.js.org/configuration/dev-server/#devserver-contentbase)
- `jsx: 'Inferno.createElement'` This is different from babel's `@jsx` pragma, in that it will apply to *all* js files, not just the one 
- `proxy: { '/api': 'http://localhost:3000' }` [(ref.)](https://webpack.js.org/configuration/dev-server/#devserver-proxy)
- `provide: { 'Glamor': 'glamor/react' }` [(ref.)](https://webpack.js.org/guides/shimming/#provide-plugin)
- `alias`
  ```
  alias: {
    react: 'preact-compat',
    react-dom: 'preact-compat'
  }
  ```
  [(ref.)](https://webpack.js.org/configuration/resolve/#resolve-alias)
- `define: { 'process.env.NODE_ENV': 'test' }` [(ref.)](https://webpack.js.org/plugins/define-plugin/)
- `rules: [ { files: '*.vue', loader: 'vue-loader', options: { some: 'options' } } , ...]` 
  nb: `files` is a glob, which gets converted to a regex for webpack's `test` prop 
- babel presets and plugins
  ```
  babel: {
    presets: ['vue', [ 'a11y', {...} ],
    plugins: ['./some/path', ... ]
  }
  ```


These don't 'work' yet, but could/will in the future

- `target: 'node'` [(ref.)](https://webpack.js.org/configuration/target/#target)
- `hot: true` [(ref.)](https://webpack.js.org/concepts/hot-module-replacement/)
- `offline: <options>` [(ref.)](https://github.com/NekR/offline-plugin)
- `autoinstall: true` [(ref.)](https://github.com/ericclemmons/npm-install-webpack-plugin)
- `plugins: [ {<module> <options>}, ... ]`
- `production: true`


thoughts/questions/ideas?