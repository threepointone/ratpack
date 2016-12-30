class App extends React.Component {
  state = {
    stdout: []
  }
  bundle(){
    this.exec(`browserify src/index.js -o public/bundle.js`).pipe(x => this.setState({
      stdout: [...this.state.stdout, x]
    }))
  }
  render() {
    return <div>      
      <button onClick={this.bundle}>
        build
      </button>
      <div>
        {this.state.stdout}
      </div>
    </div>
  }
}

class Server extends React.Component {  
  componentDidMount(){
    this.server = new http.Server({ port: this.props.port })    
    this.stdout = this.server.pipe()
  } 
  componentWillUnMount() {
    
  }
  render(){
    let s = this.server 
    return <div>
      server is {s.starting ? 'starting' : s.running: ''}
    </div>
  }
}