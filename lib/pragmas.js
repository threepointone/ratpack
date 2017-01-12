'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parse;

var _babylon = require('babylon');

var babylon = _interopRequireWildcard(_babylon);

var _json = require('json5');

var _json2 = _interopRequireDefault(_json);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function parse(src) {
  var ast = babylon.parse(src, { plugins: ['*'], sourceType: 'module' });

  var config = ast.tokens.filter(function (x) {
    return ['CommentLine', 'CommentBlock'].indexOf(x.type) >= 0;
  }).map(function (x) {
    return x.value;
  }).filter(function (x) {
    return (/^\s*@ratpack/gim.test(x)
    );
  });

  if (config.length > 1) {
    throw new Error('cannot have multiple ratpack configs in one file');
  }
  config = config[0];

  if (!config) return;

  config = _json2.default.parse(config.substr(config.indexOf('@ratpack') + 8));

  Object.keys(config).forEach(function (key) {
    var value = config[key];
    switch (key) {
      case 'devtool':
        {
          var possibles = ['eval', 'cheap-eval-source-map', 'cheap-source-map', 'cheap-module-eval-source-map', 'cheap-module-source-map', 'eval-source-map', 'source-map', 'nosources-source-map'];
          if (!(possibles.indexOf(value) >= 0)) {
            throw new Error('@devtool ' + value + ' needs to be one of ' + possibles.join(', '));
          }
          break;
        }

      case 'target':
        {
          var _possibles = ['async-node', 'electron', 'electron-renderer', 'node', 'node-webkit', 'web', 'webworker'];
          if (!(_possibles.indexOf(value) >= 0)) {
            throw new Error('@target ' + value + ' needs to be one of ' + _possibles.join(', '));
          }
          console.warn('target doesn\'t work yet'); //eslint-disable-line no-console
          break;
        }

      case 'public':
        break; // todo - test if valid dir 

      case 'jsx':
        {
          if (typeof value !== 'string') {
            throw new Error('jsx pragma needs to be a valid string');
          }
          break;
        } // test if string

      case 'offline': // vvv      
      case 'autoinstall':
        {
          if (value !== true && value !== false) {
            throw new Error('@' + key + ' ' + value + ' needs to be true or false');
          }
          console.warn(key + ' doesn\'t work yet'); //eslint-disable-line no-console
          break;
        }
      case 'stats':
      case 'reload':
        {
          if (value !== true && value !== false) {
            throw new Error('@' + key + ' ' + value + ' needs to be true or false');
          }
          break;
        }
      case 'port':
        {
          if (!(value >= 0)) {
            throw new Error('port ' + value + ' needs to be a valid number');
          }
          break;
        }
      case 'proxy':
        break; // vvv    // test shape
      case 'provide':
        break; // vvv  // test shape 
      case 'alias':
        break; // vvv    // test shape
      case 'define':
        break; // test shape
      case 'rules':
        break; // test shape

      case 'plugins':
        {
          console.warn('plugins don\'t work yet'); //eslint-disable-line no-console
          break;
        }
      case 'babel':
        {
          // test shape    
          break;
        }
      default:
        console.warn('not implemented', key, value); //eslint-disable-line no-console
    }
  });
  return config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wcmFnbWFzLmpzIl0sIm5hbWVzIjpbInBhcnNlIiwiYmFieWxvbiIsInNyYyIsImFzdCIsInBsdWdpbnMiLCJzb3VyY2VUeXBlIiwiY29uZmlnIiwidG9rZW5zIiwiZmlsdGVyIiwiaW5kZXhPZiIsIngiLCJ0eXBlIiwibWFwIiwidmFsdWUiLCJ0ZXN0IiwibGVuZ3RoIiwiRXJyb3IiLCJzdWJzdHIiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsInBvc3NpYmxlcyIsImpvaW4iLCJjb25zb2xlIiwid2FybiJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBR3dCQSxLOztBQUh4Qjs7SUFBWUMsTzs7QUFDWjs7Ozs7Ozs7QUFFZSxTQUFTRCxLQUFULENBQWVFLEdBQWYsRUFBb0I7QUFDakMsTUFBSUMsTUFBTUYsUUFBUUQsS0FBUixDQUFjRSxHQUFkLEVBQW1CLEVBQUVFLFNBQVMsQ0FBRSxHQUFGLENBQVgsRUFBb0JDLFlBQVksUUFBaEMsRUFBbkIsQ0FBVjs7QUFFQSxNQUFJQyxTQUFTSCxJQUFJSSxNQUFKLENBQ1ZDLE1BRFUsQ0FDSDtBQUFBLFdBQUssQ0FBRSxhQUFGLEVBQWlCLGNBQWpCLEVBQWtDQyxPQUFsQyxDQUEwQ0MsRUFBRUMsSUFBNUMsS0FBb0QsQ0FBekQ7QUFBQSxHQURHLEVBRVZDLEdBRlUsQ0FFTjtBQUFBLFdBQUtGLEVBQUVHLEtBQVA7QUFBQSxHQUZNLEVBR1ZMLE1BSFUsQ0FHSDtBQUFBLFdBQUssbUJBQWtCTSxJQUFsQixDQUF1QkosQ0FBdkI7QUFBTDtBQUFBLEdBSEcsQ0FBYjs7QUFLQSxNQUFHSixPQUFPUyxNQUFQLEdBQWdCLENBQW5CLEVBQXNCO0FBQUUsVUFBTSxJQUFJQyxLQUFKLENBQVUsa0RBQVYsQ0FBTjtBQUFxRTtBQUM3RlYsV0FBU0EsT0FBTyxDQUFQLENBQVQ7O0FBRUEsTUFBRyxDQUFDQSxNQUFKLEVBQVk7O0FBRVpBLFdBQVMsZUFBTU4sS0FBTixDQUFZTSxPQUFPVyxNQUFQLENBQWNYLE9B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ZSI6InByYWdtYXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBiYWJ5bG9uIGZyb20gJ2JhYnlsb24nXG5pbXBvcnQganNvbjUgZnJvbSAnanNvbjUnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlKHNyYykge1xuICBsZXQgYXN0ID0gYmFieWxvbi5wYXJzZShzcmMsIHsgcGx1Z2luczogWyAnKicgXSwgc291cmNlVHlwZTogJ21vZHVsZScgfSlcblxuICBsZXQgY29uZmlnID0gYXN0LnRva2Vuc1xuICAgIC5maWx0ZXIoeCA9PiBbICdDb21tZW50TGluZScsICdDb21tZW50QmxvY2snIF0uaW5kZXhPZih4LnR5cGUpID49MClcbiAgICAubWFwKHggPT4geC52YWx1ZSlcbiAgICAuZmlsdGVyKHggPT4gL15cXHMqQHJhdHBhY2svZ2ltLnRlc3QoeCkpXG5cbiAgaWYoY29uZmlnLmxlbmd0aCA+IDEpIHsgdGhyb3cgbmV3IEVycm9yKCdjYW5ub3QgaGF2ZSBtdWx0aXBsZSByYXRwYWNrIGNvbmZpZ3MgaW4gb25lIGZpbGUnKSB9XG4gIGNvbmZpZyA9IGNvbmZpZ1swXVxuXG4gIGlmKCFjb25maWcpIHJldHVyblxuXG4gIGNvbmZpZyA9IGpzb241LnBhcnNlKGNvbmZpZy5zdWJzdHIoY29uZmlnLmluZGV4T2YoJ0ByYXRwYWNrJykgKyA4KSlcblxuXG4gIE9iamVjdC5rZXlzKGNvbmZpZykuZm9yRWFjaChrZXkgPT4ge1xuICAgIGxldCB2YWx1ZSA9IGNvbmZpZ1trZXldXG4gICAgc3dpdGNoKGtleSkge1xuICAgICAgY2FzZSAnZGV2dG9vbCc6IHtcbiAgICAgICAgbGV0IHBvc3NpYmxlcyA9IFsgJ2V2YWwnLCAnY2hlYXAtZXZhbC1zb3VyY2UtbWFwJywgJ2NoZWFwLXNvdXJjZS1tYXAnLCAnY2hlYXAtbW9kdWxlLWV2YWwtc291cmNlLW1hcCcsXG4gICAgICAgICAgJ2NoZWFwLW1vZHVsZS1zb3VyY2UtbWFwJywgJ2V2YWwtc291cmNlLW1hcCcsICdzb3VyY2UtbWFwJywgJ25vc291cmNlcy1zb3VyY2UtbWFwJyBdXG4gICAgICAgIGlmKCEocG9zc2libGVzLmluZGV4T2YodmFsdWUpID49IDApKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBAZGV2dG9vbCAke3ZhbHVlfSBuZWVkcyB0byBiZSBvbmUgb2YgYCArIHBvc3NpYmxlcy5qb2luKCcsICcpKVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ3RhcmdldCc6IHtcbiAgICAgICAgbGV0IHBvc3NpYmxlcyA9IFsgJ2FzeW5jLW5vZGUnLCAnZWxlY3Ryb24nLCAnZWxlY3Ryb24tcmVuZGVyZXInLCAnbm9kZScsICdub2RlLXdlYmtpdCcsICd3ZWInLCAnd2Vid29ya2VyJyBdIFxuICAgICAgICBpZighKHBvc3NpYmxlcy5pbmRleE9mKHZhbHVlKSA+PSAwKSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQHRhcmdldCAke3ZhbHVlfSBuZWVkcyB0byBiZSBvbmUgb2YgYCArIHBvc3NpYmxlcy5qb2luKCcsICcpKVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUud2FybigndGFyZ2V0IGRvZXNuXFwndCB3b3JrIHlldCcpIC8vZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ3B1YmxpYyc6IGJyZWFrIC8vIHRvZG8gLSB0ZXN0IGlmIHZhbGlkIGRpciBcbiAgICAgIFxuICAgICAgY2FzZSAnanN4Jzoge1xuICAgICAgICBpZih0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdqc3ggcHJhZ21hIG5lZWRzIHRvIGJlIGEgdmFsaWQgc3RyaW5nJylcbiAgICAgICAgfVxuICAgICAgICBicmVhayBcbiAgICAgIH0vLyB0ZXN0IGlmIHN0cmluZ1xuICAgICAgXG4gICAgICBjYXNlICdvZmZsaW5lJzogLy8gdnZ2ICAgICAgXG4gICAgICBjYXNlICdhdXRvaW5zdGFsbCc6IHsgICAgICAgIFxuICAgICAgICBpZigodmFsdWUgIT09IHRydWUpICYmICh2YWx1ZSAhPT0gZmFsc2UpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBAJHtrZXl9ICR7dmFsdWV9IG5lZWRzIHRvIGJlIHRydWUgb3IgZmFsc2VgKVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUud2FybihgJHtrZXl9IGRvZXNuJ3Qgd29yayB5ZXRgKSAvL2VzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgICAgICBicmVha1xuICAgICAgfSBcbiAgICAgIGNhc2UgJ3N0YXRzJzogXG4gICAgICBjYXNlICdyZWxvYWQnOiB7XG4gICAgICAgIGlmKCh2YWx1ZSAhPT0gdHJ1ZSkgJiYgKHZhbHVlICE9PSBmYWxzZSkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEAke2tleX0gJHt2YWx1ZX0gbmVlZHMgdG8gYmUgdHJ1ZSBvciBmYWxzZWApXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWsgXG4gICAgICB9XG4gICAgICBjYXNlICdwb3J0Jzoge1xuICAgICAgICBpZighKHZhbHVlID49IDApKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBwb3J0ICR7dmFsdWV9IG5lZWRzIHRvIGJlIGEgdmFsaWQgbnVtYmVyYClcbiAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgY2FzZSAncHJveHknOiBicmVhayAvLyB2dnYgICAgLy8gdGVzdCBzaGFwZVxuICAgICAgY2FzZSAncHJvdmlkZSc6IGJyZWFrIC8vIHZ2diAgLy8gdGVzdCBzaGFwZSBcbiAgICAgIGNhc2UgJ2FsaWFzJzogYnJlYWsgLy8gdnZ2ICAgIC8vIHRlc3Qgc2hhcGVcbiAgICAgIGNhc2UgJ2RlZmluZSc6IGJyZWFrICAgICAgICAgIC8vIHRlc3Qgc2hhcGVcbiAgICAgIGNhc2UgJ3J1bGVzJzogYnJlYWsgICAgICAgICAgIC8vIHRlc3Qgc2hhcGVcbiAgICAgIFxuICAgICAgY2FzZSAncGx1Z2lucyc6IHsgICAgICAgIFxuICAgICAgICBjb25zb2xlLndhcm4oJ3BsdWdpbnMgZG9uXFwndCB3b3JrIHlldCcpIC8vZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBjYXNlICdiYWJlbCc6IHsgICAgIC8vIHRlc3Qgc2hhcGUgICAgXG4gICAgICAgIGJyZWFrXG4gICAgICB9ICAgICAgXG4gICAgICBkZWZhdWx0OiBjb25zb2xlLndhcm4oJ25vdCBpbXBsZW1lbnRlZCcsIGtleSwgdmFsdWUpICAvL2VzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIH1cbiAgfSlcbiAgcmV0dXJuIGNvbmZpZ1xufVxuXG4iXX0=