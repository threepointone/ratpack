import React, { PropTypes } from 'react'
import { render } from 'react-dom'

import express from 'express'

class Server extends React.Component {
  static propTypes = {
    port: PropTypes.number    
  }
  static defaultProps = {
    port: 3000
  }
  state = {
    running: false,
    app : express()
  }
  componentDidMount() {
    this.state.app.get('/', (req, res) => res.send('hell22222!'))
    this.server = this.state.app.listen(this.props.port, () => {
      this.setState({ running: true })
    })
  }
  componentWillUnmount() {
    this.server.close()
    delete this.server 
  }
  render() {
    return <div>
      { this.state.running && 
        `running on port ${this.props.port}` }
    </div>
  }
}

import { exec } from 'child_process'

class Shell extends React.Component {
  static propTypes = {
    cmd: PropTypes.string
  }
  state = {
    running: false,
    buffer: [],
    error: null
  }
  start() {
    this.child = exec(this.props.cmd)
    this.child.on('error', error => {
      this.setState({ error })
    })

    this.child.on('exit', () => {
      this.setState({ running: false })
    })

    // todo - do these cause memory leaks? do they have to be cleaned up when restarting/stopping?
    this.child.stdout.on('data', chunk => {
      this.setState({ buffer: this.state.buffer + chunk })
    })

    this.child.stderr.on('data', chunk => {
      this.setState({ buffer: this.state.buffer + chunk })
    })

    this.setState({ running: true })    
  }
  componentDidMount() {
    
    this.start()    

  }
  onRestart = () => {
    this.child.kill()
    this.setState({ buffer: [] })
    this.start()
    // shut down currently executing process 
    // clean buffer 
    // start again
  }
  componentWillUnmount() {
    this.child.kill()
    delete this.child 
    // shut down , cleanup
  }
  render() {
    return <pre>
      <button disabled={this.state.running} onClick={this.onRestart}>againsssss</button> <br/>
      {this.state.buffer}
    </pre>
  }
}

class App extends React.Component {
  render() {
    return <div>
      <Shell cmd='ls -al' />
      <Server/>

    </div>
  }
}

 
render(<App/>, document.getElementById('root'))

// <div>
//   <Shell cmd='ls -al' />
// <div>
