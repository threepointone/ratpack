import React from 'react'
import path from 'path'
import { render } from 'react-dom'
import 'glamor/reset'

import WebpackDevServer from 'webpack-dev-server'
import webpack from 'webpack'

import { css, presets } from 'glamor'
const yellow = '#f7df1e'

css.global('html, body, #root', { position: 'relative', width: '100%', height: '100%', display: 'block', backgroundColor: yellow })

// const PORT = 3000
// const 


const logo = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 630 630" >
  <path  d="m423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.37-38.1-25.37-17.34 0-28.33 11-28.33 25.37 0 17.76 11 24.95 36.4 35.95l14.8 6.34c50.3 21.57 78.7 43.56 78.7 93 0 53.3-41.87 82.5-98.1 82.5-54.98 0-90.5-26.2-107.88-60.54zm-209.13 5.13c9.3 16.5 17.76 30.45 38.1 30.45 19.45 0 31.72-7.61 31.72-37.2v-201.3h59.2v202.1c0 61.3-35.94 89.2-88.4 89.2-47.4 0-74.85-24.53-88.81-54.075z" />
</svg>

class App extends React.Component {
  state = {
    filepath: undefined,
    webpackCompiler: null,
    webpackServer: null
  }
  onDrop = e => {
    e.preventDefault()
    e.stopPropagation()
    let filepath = e.nativeEvent.dataTransfer.files[0].path
    // todo - clear previous instances 
    let webpackCompiler = webpack({
      entry: filepath,
      output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
      },
      module: {
        rules: [ {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel'
        } ]
      }
    })
    let webpackServer = new WebpackDevServer(webpackCompiler, {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      compress: true,
      // port
      // proxy 
      // setup()
      // staticOptions 
      clientLogLevel: 'info',
      // quiet: false,
      // noInfo: false,
      // lazy: true,
      // filename: 'bundle.js',
      // watchOptions: {
      //   aggregateTimeout: 300,
      //   poll: 1000
      // },
      // publicPath: '/public/',
      // headers: { "X-Custom-Header": "yes" },
      stats: { colors: false }

    })
    webpackServer.listen(3000)
    this.setState({ webpackCompiler, webpackServer })

    // start webpack, babel shindig 
    // expose react, react-dom, react-router, glamor, fetch/superagent    
    // maybe expose redux, saga
    // redbox for compilation / real time errors 
    // open a browser window 
    // hot reload (hmr?)
    // show webpack logs in a window 
  }
  
  render() {
    return <div 
      css={{ width: '100%', height: '100%', fontFamily: 'helvetica' }} 
      onDragOver={e => e.preventDefault()} // chrome bug 
      onDrop={this.onDrop}>      
        
      <div css={{ fontWeight: 'bolder', fontSize: 32, padding: 20, [presets.Phablet]: { fontSize: 64 } }}>
        Drop a .js file here to get started 
      </div>      

    
      <div css={{ width: 100, height: 100, position: 'absolute', bottom: 0, right: 0, [presets.Phablet]: { width: 200, height: 200 } }}>
        {logo}  
      </div>
    </div>
    
  }
}
 
render(<App/>, document.getElementById('root'))

