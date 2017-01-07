import * as babylon from 'babylon'
import json5 from 'json5'

export default function parse(src) {
  let ast = babylon.parse(src, { plugins: [ '*' ], sourceType: 'module' })

  let config = ast.tokens
    .filter(x => [ 'CommentLine', 'CommentBlock' ].indexOf(x.type) >=0)
    .map(x => x.value)
    .filter(x => /^\s*@ratpack/gim.test(x))[0]

  let regexp = /\@(ratpack|devtool|target|public|provide|alias|proxy|define|loader|jsx|offline|autoinstall|plugin|babel\-presets|babel\-plugins)\s/img

  let arr= [], match 
  while((match = regexp.exec(config)) !== null) {
    if (match.index === regexp.lastIndex) {
      regexp.lastIndex++
    } 
    arr.push(match)   
  }
  let ret = {}
  arr = arr.map((x, i) => [ x[1], x.input.substring(x.index + x[0].length, arr[i+1] ?  arr[i+1].index : x.input.length).trim() ])
    .map(x => x.filter(y => !!y)).map(x => ({ key: x[0], value: x[1] }))

  // alright, we have everything we need here
  if(!arr[0] || (arr[0].key !== 'ratpack') || arr[0].value) return
  arr.slice(1).forEach(({ key, value }) => {
    switch(key) {
      case 'devtool': {
        let possibles = [ 'eval', 'cheap-eval-source-map', 'cheap-source-map', 'cheap-module-eval-source-map',
          'cheap-module-source-map', 'eval-source-map', 'source-map', 'nosources-source-map' ]
        if(!(possibles.indexOf(value) >= 0)) {
          throw new Error(`@devtool ${value} needs to be one of ` + possibles.join(', '))
        }
        ret[key] = value; break
      }
      case 'target': {
        let possibles = [ 'async-node', 'electron', 'electron-renderer', 'node', 'node-webkit', 'web', 'webworker' ] 
        if(!(possibles.indexOf(value) >= 0)) {
          throw new Error(`@target ${value} needs to be one of ` + possibles.join(', '))
        }
        console.warn('target doesn\'t work yet')
        ret[key] = value; break
      }
      case 'public': ret[key] = value; break
      case 'jsx': ret[key] = value; break
      case 'offline':
      case 'autoinstall': {
        let parsed = value ? JSON.parse(value) || false : false 
        if((parsed !== true) && (parsed !== false)) {
          throw new Error(`@${key} ${parsed} needs to be true or false`)
        }
        console.warn(`${key} doesn\'t work yet`)
        ret[key] = parsed
        break
      } 
      case 'proxy':
      case 'provide':
      case 'alias': 
      case 'define': {
        value = value.split(' ').map(x => x.trim()).filter(x => !!x)
        if(value.length !== 2) throw new Error('incorrect number of arguments: ' + key + ' > ' + value.join(', '))
        ret[key] = ret[key] || {} 
        ret[key] = { ...ret[key], [value[0]]: value[1] }
        break
      }
      case 'loader': {
        let regex = /(\S+)(\s+)([A-Za-z0-9@\-_\.\\\/\:]+)(\s*)/
        let matched = regex.exec(value)

        let glob = matched[1], loader = matched[3], options = json5.parse(value.slice(matched[0].length) || '{}')
        ret.rules = ret.rules || []
        ret.rules.push({ glob, loader, options })
        break        
      }
      case 'plugin': {
        let regex = /([A-Za-z0-9@\-_\.\\\/\:]+)(\s*)/
        let matched = regex.exec(value)
        let m = matched[1], options = json5.parse(value.slice(matched[0].length) || '{}')
        ret.plugins = ret.plugins || []
        ret.plugins.push({ module: m, options })
        console.warn('plugins don\'t work yet')
        break
      }
      case 'babel-presets': {
        ret.babelPresets = ret.babelPresets || []
        ret.babelPresets.push(json5.parse(value))
        break
      }
      case 'babel-plugins': {
        ret.babelPlugins = ret.babelPlugins || []
        ret.babelPlugins.push(json5.parse(value))
        break
      }
      default: console.warn('not implemented', key, value)
    }
  })
  return ret

}
