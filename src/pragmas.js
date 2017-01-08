import * as babylon from 'babylon'
import json5 from 'json5'

export default function parse(src) {
  let ast = babylon.parse(src, { plugins: [ '*' ], sourceType: 'module' })

  let config = ast.tokens
    .filter(x => [ 'CommentLine', 'CommentBlock' ].indexOf(x.type) >=0)
    .map(x => x.value)
    .filter(x => /^\s*@ratpack/gim.test(x))[0]

  if(!config) return

  config = json5.parse(config.substr(config.indexOf('@ratpack') + 8))


  Object.keys(config).forEach(key => {
    let value = config[key]
    switch(key) {
      case 'devtool': {
        let possibles = [ 'eval', 'cheap-eval-source-map', 'cheap-source-map', 'cheap-module-eval-source-map',
          'cheap-module-source-map', 'eval-source-map', 'source-map', 'nosources-source-map' ]
        if(!(possibles.indexOf(value) >= 0)) {
          throw new Error(`@devtool ${value} needs to be one of ` + possibles.join(', '))
        }
        break
      }

      case 'target': {
        let possibles = [ 'async-node', 'electron', 'electron-renderer', 'node', 'node-webkit', 'web', 'webworker' ] 
        if(!(possibles.indexOf(value) >= 0)) {
          throw new Error(`@target ${value} needs to be one of ` + possibles.join(', '))
        }
        console.warn('target doesn\'t work yet') //eslint-disable-line no-console
        break
      }

      case 'public': break
      
      case 'jsx': break
      
      case 'offline': // vvv      
      case 'autoinstall': {        
        if((value !== true) && (value !== false)) {
          throw new Error(`@${key} ${value} needs to be true or false`)
        }
        console.warn(`${key} doesn\'t work yet`) //eslint-disable-line no-console
        break
      } 

      case 'reload': break
      case 'port': {
        if(!(value >= 0)) {
          throw new Error(`port ${value} needs to be a valid number`)
        }
        break
      }
      case 'proxy': // vvv
      case 'provide': // vvv      
      case 'alias': // vvv      
      case 'define': break
      case 'rules': break
      case 'plugins': {        
        console.warn('plugins don\'t work yet') //eslint-disable-line no-console
        break
      }
      case 'babel': {        
        break
      }      
      default: console.warn('not implemented', key, value)  //eslint-disable-line no-console
    }
  })
  return config
}

