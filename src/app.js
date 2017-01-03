import React from 'react'
import path from 'path'
import { render } from 'react-dom'
import 'glamor/reset'
import hash from 'glamor/lib/hash'

import openBrowser from 'react-dev-utils/openBrowser'

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
      if(err) return console.error(err)
      console.log('db initialized')
    })
  }
  else console.log('db restarted')
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
  refreshRecentList() {
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
    })
  }
  componentDidMount() {
    this.refreshRecentList()
    this.interval = setInterval(() => {
      if(this.state.running) {
        this.setState({
          tick: (this.state.tick + 1)%4 // (new Date()).getSeconds() % 4
        })  
      }
      
    }, 400)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
    if(this.state.webpackServer) {
      this.state.webpackServer.close()  
    }    
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
    if(this.state.webpackServer) {
      this.state.webpackServer.close()
    }
    let webpackCompiler = webpack({
      entry: [ require.resolve('react-dev-utils/webpackHotDevClient.js'), filepath ],
      output: {
        path: path.join(__dirname, '../public'),
        filename: 'bundle.js'
      },
      performance: {
        hints: false
      },
      module: {
        rules: [ {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: require.resolve('babel-loader'),
          options: {
            'presets': [ [ require('babel-preset-env'), { 'targets': {
              'browsers': [ 'last 2 versions', 'safari >= 7' ]
            }, modules: false } ], require('babel-preset-stage-0'), require('babel-preset-react') ],
            'plugins': [
              require('glamor/babel-hoist'),
              require('babel-plugin-transform-react-require').default,
              [ require('babel-plugin-transform-react-jsx'), {
                'pragma': 'Glamor.createElement' // default pragma is React.createElement
              } ]
            ]
          }
        } ]
      },
      resolve: {
        modules: [ 'node_modules', path.join(__dirname, '../node_modules') ]
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new webpack.ProvidePlugin({
          Glamor: 'glamor/react'
        })
      ],
      stats: 'errors-only'
    })
    let webpackServer = new WebpackDevServer(webpackCompiler, {
      contentBase: [ path.join(path.dirname(filepath), 'public'), path.join(__dirname, '../public') ],
      historyApiFallback: true,
      compress: true,
      // proxy 
      // setup()
      // staticOptions 

      quiet: true,      
      stats: { colors: false }

    })
    // this is to workaround some weird bug where webpack keeps the first loaded file 
    // also makes it look cool ha
    let h = hash(filepath, filepath.length)+ ''
    let port = 3000 + parseInt(h.substr(h.length - 4), 10)
    webpackServer.listen(port)
    openBrowser('http://localhost:' + port)
    this.setState({ webpackCompiler, webpackServer, port, filepath, running: true })
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
        {this.state.recently.map(x => <div onClick={() => this.loadFile(x.path)}>{x.path}</div>)}
        <h4 onClick={() => this.clearRecentList()}>clear list</h4>
      </div>}
      
      <Logo/>
      
    </div>
    
  }
}
 
render(<App/>, document.getElementById('root'))
