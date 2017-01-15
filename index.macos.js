/**
 * Sample React Native macOS App
 * https://github.com/ptmt/react-native-macos
 */
import React from 'react';
import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   ART,
   NativeModules,
   Alert,
} from 'react-native-macos';

const { exec } = NativeModules.ChildProcess;

const {
   Shape,
   Group,
   Surface,
} = ART;

function times(n, fn) {
  let arr = []
  for(let i= 0; i< n; i++) {
    arr.push(fn(i))
  }
  return arr
}

const LOGO_PATH = "m 423.2 492.19 c 12.69 20.72 29.2 35.95 58.4 35.95 c 24.53 0 40.2 -12.26 40.2 -29.2 c 0 -20.3 -16.1 -27.49 -43.1 -39.3 l -14.8 -6.35 c -42.72 -18.2 -71.1 -41 -71.1 -89.2 c 0 -44.4 33.83 -78.2 86.7 -78.2 c 37.64 0 64.7 13.1 84.2 47.4 l -46.1 29.6 c -10.15 -18.2 -21.1 -25.37 -38.1 -25.37 c -17.34 0 -28.33 11 -28.33 25.37 c 0 17.76 11 24.95 36.4 35.95 l 14.8 6.34 c 50.3 21.57 78.7 43.56 78.7 93 c 0 53.3 -41.87 82.5 -98.1 82.5 c -54.98 0 -90.5 -26.2 -107.88 -60.54 Z m -209.13 5.13 c 9.3 16.5 17.76 30.45 38.1 30.45 c 19.45 0 31.72 -7.61 31.72 -37.2 v -201.3 h 59.2 v 202.1 c 0 61.3 -35.94 89.2 -88.4 89.2 c -47.4 0 -74.85 -24.53 -88.81 -54.075 Z"
const Logo = () => (
  <View style={styles.logo}>
   <Surface width={640} height={640}>
     <Shape
       fill={'black'}
       d={LOGO_PATH} />
   </Surface>
  </View>
)

class Ratpack extends React.Component {
  state = {
    tick: 0,
    filepath: undefined,
    webpackCompiler: null,
    webpackServer: null,
    recently: [],
    errors: [],
    port: 0,
    running: false,
    dragOver: false,
  }
  onDrop(e) {
    this.setState({ dragOver: false })
    this.loadFile(e.nativeEvent.files[0])
  }

  async loadFile(filepath) {
     const result = await exec(`node ./ratpack.app/Contents/Resources/node_onLoad.js ${filepath}`);
     this.setState({
       filepath: filepath.split('/').slice(-1)[0],
       running: true,
       port: 8001
     })
     Alert.alert('Execute result', result);
     // exec(`node ${filepath}`)
  }

  render() {
    const { dragOver, running, filepath } = this.state;

    return (
      <View
        style={[ styles.container, { backgroundColor: dragOver ? '#FFEF73' : '#f7df1e' }]}
        draggedTypes={[ 'NSFilenamesPboardType' ]}
        onDragEnter={() => this.setState({ dragOver: true })}
        onDragLeave={() => this.setState({ dragOver: false })}
        onDrop={e => this.onDrop(e)}>

        <Text style={styles.mainHeader}>
          { running ?
            `${filepath} running at localhost:${this.state.port}${times(this.state.tick, () => '.').join('')}`
            : 'Drop a .js file here to get started '}
        </Text>

        { this.state.recently.length > 0 && <div css={{ padding: 20 }}>
          <h1>previously...</h1>
          {this.state.recently.map(x => <div key={x.path} onClick={() => this.loadFile(x.path)}>{x.path}</div>)}
          <h4 onClick={() => this.clearRecentList()}>clear list</h4>
        </div>}

        <Logo />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7df1e',
  },

  mainHeader: {
    fontWeight: 'bold',
    fontSize: 80,
    padding: 20,
    fontFamily: 'Helvetica',
  },

  logo: {
    width: 320,
    height: 320,
    position: 'absolute',
    bottom: 0,
    right: 0,
    transform: [
      { scaleX: 0.5 },
      { scaleY: 0.5 }
    ]
  },
});

AppRegistry.registerComponent('ratpack', () => Ratpack);
