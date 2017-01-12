
import qs from 'querystring'
import autoprefixer from 'autoprefixer'
import React from 'react'
import path from 'path'
import { render } from 'react-dom'
import 'glamor/reset'
import hash from 'glamor/lib/hash'
import pragmas from './pragmas'
import glob2regexp from 'glob-to-regexp'
import openBrowser from 'react-dev-utils/openBrowser'
import OfflinePlugin from 'offline-plugin'

const electron = require('electron')
const app = electron.app || electron.remote.app


import WebpackDevServer from 'webpack-dev-server'
import webpack from 'webpack'

import { css, presets } from 'glamor'
const yellow = '#f7df1e'


import DataStore from 'nedb'
let db = new DataStore({
  filename: path.join(app.getPath('userData'), 'store.db'),
  autoload: true
})
db.find({ _id: 'recently' }, (err, docs) => {
  if(docs.length === 0) {
    db.insert({ _id: 'recently', files: [] }, err => {
      if(err) return console.error(err) //eslint-disable-line no-console
      console.log('db initialized') //eslint-disable-line no-console
    })
  }
  else console.log('db restarted')  //eslint-disable-line no-console
})

// todo - move this to main.js 
import mkdirp from 'mkdirp'
import touch from 'touch'
import fs from 'fs'


// todo - windows
mkdirp(path.join(app.getPath('home'), '.ratpack'), err => {
  if(err) {
    throw err
  }
  let pkjson = path.join(app.getPath('home'), '.ratpack/package.json')
  if(!fs.existsSync(pkjson)) {
    touch.sync(pkjson)
    fs.writeFileSync(pkjson, JSON.stringify({
      name: 'ratpack-local',
      description: 'these modules are available to all scripts launched by ratpack'
    }))  
  }
  // among other things, this makes loaders defined in pragmas to work 
  require('module').globalPaths.push(path.join(app.getPath('home'), '.ratpack/node_modules'))
  
})

function times(n, fn) {
  let arr = []
  for(let i= 0; i< n; i++) {
    arr.push(fn(i))
  }
  return arr
}

css.global('html, body, #root', { position: 'relative', width: '100%', height: '100%', display: 'block', backgroundColor: yellow })

const Logo = () => <div css={{ width: 100, height: 100, position: 'absolute', bottom: 0, right: 0, [presets.Phablet]: { width: 200, height: 200 } }}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 630 630" >
    <path d="m423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.37-38.1-25.37-17.34 0-28.33 11-28.33 25.37 0 17.76 11 24.95 36.4 35.95l14.8 6.34c50.3 21.57 78.7 43.56 78.7 93 0 53.3-41.87 82.5-98.1 82.5-54.98 0-90.5-26.2-107.88-60.54zm-209.13 5.13c9.3 16.5 17.76 30.45 38.1 30.45 19.45 0 31.72-7.61 31.72-37.2v-201.3h59.2v202.1c0 61.3-35.94 89.2-88.4 89.2-47.4 0-74.85-24.53-88.81-54.075z" />
  </svg>
</div>

class App extends React.Component {
  state = {
    tick: 0,
    filepath: undefined,
    webpackCompiler: null,
    webpackServer: null,
    recently: [],
    errors: [],
    port: 0,
    running: false
  }
  onOpenFile = (e, filepath) => {
    this.loadFile(filepath)
  }
  refreshRecentList(cb) {
    db.find({ _id: 'recently' }, (err, docs) => {
      if(err) {
        this.setState({
          errors: [ ...this.state.errors, err ]
        })
        return 
      }
      this.setState({
        recently: docs[0].files
      })
      if(cb) cb()
    })
  }
  componentDidMount() {
    app.on('open-file', this.onOpenFile)
    this.refreshRecentList(() => {
      if(window.location.search) {
        let filepath = qs.parse(window.location.search.slice(1)).startsWith
        filepath && this.loadFile(filepath)
      }
    })   
    this.interval = setInterval(() => {
      this.setState({
        tick: (this.state.tick + 1) % 4 
      })      
    }, 400)
 
  }
  componentWillUnmount() {
    clearInterval(this.interval)
    this.interval = null    

    if(this.state.webpackServer) {
      this.state.webpackServer.close()  
    }   
    if(this.watcher) {
      this.watcher.close()
      this.watcher = null
    } 
    app.removeEventListener('open-file', this.onOpenFile)
  }
  _loadFile(filepath){
    fs.readFile(filepath, 'utf8', (err, src) => {      
      if(err) throw err
      let options = pragmas(src)
      this.setState({ ...webpackify(filepath, options), filepath, running: true, pragmas: options })

      // simultaneously start watching the entry file 
      this.watcher = fs.watch(filepath, e => {
        if(e === 'rename') {
          // ???
          return          
        }        
        // if any of the pragmas change, redo this shindig 
        fs.readFile(filepath, 'utf8', (err, src) => {
          let options = pragmas(src)
          if(JSON.stringify(options) !== JSON.stringify(this.state.pragmas)) {
            this.loadFile(filepath)
          }
          // todo - prevent double read 
        })

      })
    })    
  }
  loadFile(filepath) {

    db.update({ _id: 'recently' }, { _id: 'recently', files: [ { path: filepath }, ...this.state.recently.filter(x => x.path !== filepath) ].slice(0, 10) }, {}, err => {
      if(err) {
        this.setState({
          errors: [ ...this.state.errors, err ]
        })
        return         
      } 
      this.refreshRecentList()           
    })
    if(this.watcher) {
      this.watcher.close()
      this.watcher = null
    }
    
    if(this.state.webpackServer) {
      this.state.webpackServer.close()
      setTimeout(() => {
        this._loadFile(filepath)
      }, 500)      
    }
    else {
      this._loadFile(filepath)
    }
            
  }
  onDrop = e => {
    e.preventDefault()
    e.stopPropagation()
    let filepath = e.nativeEvent.dataTransfer.files[0].path
    this.loadFile(filepath)
  }
  clearRecentList() {
    db.update({ _id: 'recently' }, { _id: 'recently', files: [] }, () => {
      this.refreshRecentList()
    })
  }
  
  render() {
    return <div 
      css={{ width: '100%', height: '100%', fontFamily: 'helvetica' }} 
      onDragOver={e => e.preventDefault()} // chrome bug 
      onDrop={this.onDrop}>      
        
      <div css={{ fontWeight: 'bolder', fontSize: 32, padding: 20, [presets.Phablet]: { fontSize: 64 } }}>
      { this.state.running ? 
        `${path.basename(this.state.filepath)} running at 
        localhost:${this.state.port}${times(this.state.tick, () => '.').join('')}`
        : 'Drop a .js file here to get started '}
        
      
      </div> 
      { this.state.recently.length > 0 && <div css={{ padding: 20 }}>
        <h1>previously...</h1>
        {this.state.recently.map(x => <div key={x.path} onClick={() => this.loadFile(x.path)}>{x.path}</div>)}
        <h4 onClick={() => this.clearRecentList()}>clear list</h4>
      </div>}
      
      <Logo/>
      
    </div>
    
  }
}

function webpackify(filepath, options = {}) {
  
  let webpackCompiler = webpack({
    devtool: options.production ? false : (options.devtool || 'cheap-module-source-map'),
    entry: [ 
      ((options.reload !== false) || (options.production !== true) ) ? 
        require.resolve('react-dev-utils/webpackHotDevClient.js') : 
        undefined, 
      options.stats ? require.resolve('./stats.js') : undefined,
      require.resolve('./polyfills'), 
      options.offline ? require.resolve('./offline-plugin-runtime.js') : undefined,
      filepath 
    ].filter(x => !!x),
    output: {
      path: path.join(__dirname, '../public'),
      pathinfo: true,
      filename: 'bundle.js'
    },
    performance: {
      hints: false
    },
    module: {
      rules: [ 
        ...(options.rules || []).map(({ loader, files, options }) => ({ loader: require.resolve(loader), options, test: glob2regexp(files || '*') })), 
        {
          enforce: 'pre',
          test: /\.(js|jsx)$/,
          loader: require.resolve('eslint-loader'),
          exclude: /node_modules/,
          options: {
            configFile: path.join(__dirname, '../resources/.eslintrc')
          }
        }, 
        {
          exclude: [
            /\.html$/,
            /\.(js|jsx)$/,
            /\.css$/,
            /\.json$/,
            /\.svg$/
          ],
          loader: require.resolve('url-loader'),
          query: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]'
          }
        }, 
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: require.resolve('babel-loader'),
          options: {
            'presets': [ 
              [ require('babel-preset-env'), { 
                'targets': {
                  'browsers': [ 'last 2 versions', 'safari >= 7' ]
                }, 
                modules: false 
              } ], 
              require('babel-preset-stage-0'), 
              require('babel-preset-react'),              
              ...(options.babel || {}).presets || []
            ],
            'plugins': [
              [ require.resolve('babel-plugin-transform-runtime'), {
                helpers: false,
                polyfill: false,
                regenerator: true
                // Resolve the Babel runtime relative to the config.
                // moduleName: path.dirname(require.resolve('babel-runtime/package'))
              } ],
              options.jsx ? [ require('babel-plugin-transform-react-jsx'),
                { 'pragma': options.jsx } ] : undefined,
              require('babel-plugin-transform-decorators-legacy').default,
              require('babel-plugin-transform-react-require').default,
              
              ...(options.babel || {}).plugins || []
            ].filter(x => !!x),
            cacheDirectory: false
          }
        }, 
        {
          test: /\.css$/,
          use: [
            require.resolve('style-loader'), 
            {
              loader: require.resolve('css-loader'),
              options: { importLoaders: 1 } 
            }, 
            require.resolve('postcss-loader')  // options in the plugins section below             
          ]
        }, 
        // {
        //   test: /\.json$/,
        //   loader: require.resolve('json-loader')
        // },
         {
          test: /\.svg$/,
          loader: require.resolve('file-loader'),
          query: {
            name: 'static/media/[name].[hash:8].[ext]'
          }
        } 
      ]
    },
    resolve: {
      alias: options.alias || {},
      extensions: [ '.js', '.json', '.jsx' ],
      // todo - windows
      modules: [ 'node_modules', path.join(app.getPath('home'), '.ratpack/node_modules'),  path.join(__dirname, '../node_modules') ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify((options.production && 'production') || process.env.NODE_ENV || 'development'),
        ...Object.keys(options.define || {}).reduce((o, key) => ({ ...o, [key]: JSON.stringify(options.define[key]) }), {})
      }),
      options.offline ? new OfflinePlugin(options.offline === true ? {} : options.offline) : undefined,
      new webpack.ProvidePlugin(options.provide || {}),
      new webpack.LoaderOptionsPlugin({
        test: /\.css$/,
        debug: true,
        options: {
          postcss: [
            autoprefixer({
              browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9' // React doesn't support IE8 anyway
              ]
            })
          ]
        }
      })
    ].filter(x => !!x),
    stats: 'errors-only',
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    }
  })
  
  let webpackServer = new WebpackDevServer(webpackCompiler, {
    // todo - windows
    contentBase: [ options.public ? path.join(path.dirname(filepath), options.public) : '', path.join(path.dirname(filepath), 'public'), path.join(__dirname, '../public') ].filter(x => !!x),
    historyApiFallback: true,
    compress: true,
    proxy: options.proxy || {},
        // setup()
        // staticOptions 

    quiet: true,      
    stats: { colors: false }  
  })
    // this is to workaround some weird bug where webpack keeps the first loaded file 
    // also makes it look cool ha
  let h = hash(filepath, filepath.length)+ ''
  let port = options.port || (3000 + parseInt(h.substr(h.length - 4), 10))
  webpackServer.listen(port)
  openBrowser('http://localhost:' + port)
  return { webpackServer, webpackCompiler, port }

}
 
render(<App/>, document.getElementById('root'))
