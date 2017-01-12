'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _autoprefixer = require('autoprefixer');

var _autoprefixer2 = _interopRequireDefault(_autoprefixer);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _reactDom = require('react-dom');

require('glamor/reset');

var _hash = require('glamor/lib/hash');

var _hash2 = _interopRequireDefault(_hash);

var _pragmas = require('./pragmas');

var _pragmas2 = _interopRequireDefault(_pragmas);

var _globToRegexp = require('glob-to-regexp');

var _globToRegexp2 = _interopRequireDefault(_globToRegexp);

var _openBrowser = require('react-dev-utils/openBrowser');

var _openBrowser2 = _interopRequireDefault(_openBrowser);

var _offlinePlugin = require('offline-plugin');

var _offlinePlugin2 = _interopRequireDefault(_offlinePlugin);

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _glamor = require('glamor');

var _nedb = require('nedb');

var _nedb2 = _interopRequireDefault(_nedb);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _touch = require('touch');

var _touch2 = _interopRequireDefault(_touch);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var electron = require('electron');
var app = electron.app || electron.remote.app;

var yellow = '#f7df1e';

var db = new _nedb2.default({
  filename: _path2.default.join(app.getPath('userData'), 'store.db'),
  autoload: true
});
db.find({ _id: 'recently' }, function (err, docs) {
  if (docs.length === 0) {
    db.insert({ _id: 'recently', files: [] }, function (err) {
      if (err) return console.error(err); //eslint-disable-line no-console
      console.log('db initialized'); //eslint-disable-line no-console
    });
  } else console.log('db restarted'); //eslint-disable-line no-console
});

// todo - move this to main.js 


// todo - windows
(0, _mkdirp2.default)(_path2.default.join(app.getPath('home'), '.ratpack'), function (err) {
  if (err) {
    throw err;
  }
  var pkjson = _path2.default.join(app.getPath('home'), '.ratpack/package.json');
  if (!_fs2.default.existsSync(pkjson)) {
    _touch2.default.sync(pkjson);
    _fs2.default.writeFileSync(pkjson, JSON.stringify({
      name: 'ratpack-local',
      description: 'these modules are available to all scripts launched by ratpack'
    }));
  }
  // among other things, this makes loaders defined in pragmas to work 
  require('module').globalPaths.push(_path2.default.join(app.getPath('home'), '.ratpack/node_modules'));
});

function times(n, fn) {
  var arr = [];
  for (var i = 0; i < n; i++) {
    arr.push(fn(i));
  }
  return arr;
}

_glamor.css.global('html, body, #root', { position: 'relative', width: '100%', height: '100%', display: 'block', backgroundColor: yellow });

var Logo = function Logo() {
  return require('glamor/react').createElement(
    'div',
    { css: _defineProperty({ width: 100, height: 100, position: 'absolute', bottom: 0, right: 0 }, _glamor.presets.Phablet, { width: 200, height: 200 }) },
    require('glamor/react').createElement(
      'svg',
      { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 630 630' },
      require('glamor/react').createElement('path', { d: 'm423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.37-38.1-25.37-17.34 0-28.33 11-28.33 25.37 0 17.76 11 24.95 36.4 35.95l14.8 6.34c50.3 21.57 78.7 43.56 78.7 93 0 53.3-41.87 82.5-98.1 82.5-54.98 0-90.5-26.2-107.88-60.54zm-209.13 5.13c9.3 16.5 17.76 30.45 38.1 30.45 19.45 0 31.72-7.61 31.72-37.2v-201.3h59.2v202.1c0 61.3-35.94 89.2-88.4 89.2-47.4 0-74.85-24.53-88.81-54.075z' })
    )
  );
};

var _ref = { width: '100%', height: '100%', fontFamily: 'helvetica' };
var _ref2 = { padding: 20 };

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    var _ref4;

    var _temp, _this, _ret;

    _classCallCheck(this, App);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref4 = App.__proto__ || Object.getPrototypeOf(App)).call.apply(_ref4, [this].concat(args))), _this), _this.state = {
      tick: 0,
      filepath: undefined,
      webpackCompiler: null,
      webpackServer: null,
      recently: [],
      errors: [],
      port: 0,
      running: false
    }, _this.onOpenFile = function (e, filepath) {
      _this.loadFile(filepath);
    }, _this.onDrop = function (e) {
      e.preventDefault();
      e.stopPropagation();
      var filepath = e.nativeEvent.dataTransfer.files[0].path;
      _this.loadFile(filepath);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(App, [{
    key: 'refreshRecentList',
    value: function refreshRecentList(cb) {
      var _this2 = this;

      db.find({ _id: 'recently' }, function (err, docs) {
        if (err) {
          _this2.setState({
            errors: [].concat(_toConsumableArray(_this2.state.errors), [err])
          });
          return;
        }
        _this2.setState({
          recently: docs[0].files
        });
        if (cb) cb();
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      app.on('open-file', this.onOpenFile);
      this.refreshRecentList(function () {
        if (window.location.search) {
          var filepath = _querystring2.default.parse(window.location.search.slice(1)).startsWith;
          filepath && _this3.loadFile(filepath);
        }
      });
      this.interval = setInterval(function () {
        _this3.setState({
          tick: (_this3.state.tick + 1) % 4
        });
      }, 400);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.interval);
      this.interval = null;

      if (this.state.webpackServer) {
        this.state.webpackServer.close();
      }
      if (this.watcher) {
        this.watcher.close();
        this.watcher = null;
      }
      app.removeEventListener('open-file', this.onOpenFile);
    }
  }, {
    key: '_loadFile',
    value: function _loadFile(filepath) {
      var _this4 = this;

      _fs2.default.readFile(filepath, 'utf8', function (err, src) {
        if (err) throw err;
        var options = (0, _pragmas2.default)(src);
        _this4.setState(_extends({}, webpackify(filepath, options), { filepath: filepath, running: true, pragmas: options }));

        // simultaneously start watching the entry file 
        _this4.watcher = _fs2.default.watch(filepath, function (e) {
          if (e === 'rename') {
            // ???
            return;
          }
          // if any of the pragmas change, redo this shindig 
          _fs2.default.readFile(filepath, 'utf8', function (err, src) {
            var options = (0, _pragmas2.default)(src);
            if (JSON.stringify(options) !== JSON.stringify(_this4.state.pragmas)) {
              _this4.loadFile(filepath);
            }
            // todo - prevent double read 
          });
        });
      });
    }
  }, {
    key: 'loadFile',
    value: function loadFile(filepath) {
      var _this5 = this;

      db.update({ _id: 'recently' }, { _id: 'recently', files: [{ path: filepath }].concat(_toConsumableArray(this.state.recently.filter(function (x) {
          return x.path !== filepath;
        }))).slice(0, 10) }, {}, function (err) {
        if (err) {
          _this5.setState({
            errors: [].concat(_toConsumableArray(_this5.state.errors), [err])
          });
          return;
        }
        _this5.refreshRecentList();
      });
      if (this.watcher) {
        this.watcher.close();
        this.watcher = null;
      }

      if (this.state.webpackServer) {
        this.state.webpackServer.close();
        setTimeout(function () {
          _this5._loadFile(filepath);
        }, 500);
      } else {
        this._loadFile(filepath);
      }
    }
  }, {
    key: 'clearRecentList',
    value: function clearRecentList() {
      var _this6 = this;

      db.update({ _id: 'recently' }, { _id: 'recently', files: [] }, function () {
        _this6.refreshRecentList();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this7 = this;

      return require('glamor/react').createElement(
        'div',
        {
          css: _ref,
          onDragOver: function onDragOver(e) {
            return e.preventDefault();
          } // chrome bug 
          , onDrop: this.onDrop },
        require('glamor/react').createElement(
          'div',
          { css: _defineProperty({ fontWeight: 'bolder', fontSize: 32, padding: 20 }, _glamor.presets.Phablet, { fontSize: 64 }) },
          this.state.running ? _path2.default.basename(this.state.filepath) + ' running at \n        localhost:' + this.state.port + times(this.state.tick, function () {
            return '.';
          }).join('') : 'Drop a .js file here to get started '
        ),
        this.state.recently.length > 0 && require('glamor/react').createElement(
          'div',
          { css: _ref2 },
          require('glamor/react').createElement(
            'h1',
            null,
            'previously...'
          ),
          this.state.recently.map(function (x) {
            return require('glamor/react').createElement(
              'div',
              { key: x.path, onClick: function onClick() {
                  return _this7.loadFile(x.path);
                } },
              x.path
            );
          }),
          require('glamor/react').createElement(
            'h4',
            { onClick: function onClick() {
                return _this7.clearRecentList();
              } },
            'clear list'
          )
        ),
        require('glamor/react').createElement(Logo, null)
      );
    }
  }]);

  return App;
}(_react2.default.Component);

function webpackify(filepath) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


  var webpackCompiler = (0, _webpack2.default)({
    devtool: options.production ? false : options.devtool || 'cheap-module-source-map',
    entry: [options.reload !== false || options.production !== true ? require.resolve('react-dev-utils/webpackHotDevClient.js') : undefined, options.stats ? require.resolve('./stats.js') : undefined, require.resolve('./polyfills'), options.offline ? require.resolve('./offline-plugin-runtime.js') : undefined, filepath].filter(function (x) {
      return !!x;
    }),
    output: {
      path: _path2.default.join(__dirname, '../public'),
      pathinfo: true,
      filename: 'bundle.js'
    },
    performance: {
      hints: false
    },
    module: {
      rules: [].concat(_toConsumableArray((options.rules || []).map(function (_ref6) {
        var loader = _ref6.loader,
            files = _ref6.files,
            options = _ref6.options;
        return { loader: require.resolve(loader), options: options, test: (0, _globToRegexp2.default)(files || '*') };
      })), [{
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: require.resolve('eslint-loader'),
        exclude: /node_modules/,
        options: {
          configFile: _path2.default.join(__dirname, '../resources/.eslintrc')
        }
      }, {
        exclude: [/\.html$/, /\.(js|jsx)$/, /\.css$/, /\.json$/, /\.svg$/],
        loader: require.resolve('url-loader'),
        query: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: {
          'presets': [[require('babel-preset-env'), {
            'targets': {
              'browsers': ['last 2 versions', 'safari >= 7']
            },
            modules: false
          }], require('babel-preset-stage-0'), require('babel-preset-react')].concat(_toConsumableArray((options.babel || {}).presets || [])),
          'plugins': [[require.resolve('babel-plugin-transform-runtime'), {
            helpers: false,
            polyfill: false,
            regenerator: true
            // Resolve the Babel runtime relative to the config.
            // moduleName: path.dirname(require.resolve('babel-runtime/package'))
          }], options.jsx ? [require('babel-plugin-transform-react-jsx'), { 'pragma': options.jsx }] : undefined, require('babel-plugin-transform-decorators-legacy').default, require('babel-plugin-transform-react-require').default].concat(_toConsumableArray((options.babel || {}).plugins || [])).filter(function (x) {
            return !!x;
          }),
          cacheDirectory: false
        }
      }, {
        test: /\.css$/,
        use: [require.resolve('style-loader'), {
          loader: require.resolve('css-loader'),
          options: { importLoaders: 1 }
        }, require.resolve('postcss-loader') // options in the plugins section below             
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
      }])
    },
    resolve: {
      alias: options.alias || {},
      extensions: ['.js', '.json', '.jsx'],
      modules: ['node_modules', _path2.default.join(app.getPath('home'), '.ratpack/node_modules'), _path2.default.join(__dirname, '../node_modules')]
    },
    plugins: [new _webpack2.default.DefinePlugin(_extends({
      'process.env.NODE_ENV': JSON.stringify(options.production && 'production' || process.env.NODE_ENV || 'development')
    }, Object.keys(options.define || {}).reduce(function (o, key) {
      return _extends({}, o, _defineProperty({}, key, JSON.stringify(options.define[key])));
    }, {}))), options.offline ? new _offlinePlugin2.default(options.offline === true ? {} : options.offline) : undefined, new _webpack2.default.ProvidePlugin(options.provide || {}), new _webpack2.default.LoaderOptionsPlugin({
      test: /\.css$/,
      debug: true,
      options: {
        postcss: [(0, _autoprefixer2.default)({
          browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9' // React doesn't support IE8 anyway
          ]
        })]
      }
    })].filter(function (x) {
      return !!x;
    }),
    stats: 'errors-only',
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    }
  });

  var webpackServer = new _webpackDevServer2.default(webpackCompiler, {
    contentBase: [options.public ? _path2.default.join(_path2.default.dirname(filepath), options.public) : '', _path2.default.join(_path2.default.dirname(filepath), 'public'), _path2.default.join(__dirname, '../public')].filter(function (x) {
      return !!x;
    }),
    historyApiFallback: true,
    compress: true,
    proxy: options.proxy || {},
    // setup()
    // staticOptions 

    quiet: true,
    stats: { colors: false }
  });
  // this is to workaround some weird bug where webpack keeps the first loaded file 
  // also makes it look cool ha
  var h = (0, _hash2.default)(filepath, filepath.length) + '';
  var port = options.port || 3000 + parseInt(h.substr(h.length - 4), 10);
  webpackServer.listen(port);
  (0, _openBrowser2.default)('http://localhost:' + port);
  return { webpackServer: webpackServer, webpackCompiler: webpackCompiler, port: port };
}

(0, _reactDom.render)(require('glamor/react').createElement(App, null), document.getElementById('root'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAuanMiXSwibmFtZXMiOlsiZWxlY3Ryb24iLCJyZXF1aXJlIiwiYXBwIiwicmVtb3RlIiwieWVsbG93IiwiZGIiLCJmaWxlbmFtZSIsImpvaW4iLCJnZXRQYXRoIiwiYXV0b2xvYWQiLCJmaW5kIiwiX2lkIiwiZXJyIiwiZG9jcyIsImxlbmd0aCIsImluc2VydCIsImZpbGVzIiwiY29uc29sZSIsImVycm9yIiwibG9nIiwicGtqc29uIiwiZXhpc3RzU3luYyIsInN5bmMiLCJ3cml0ZUZpbGVTeW5jIiwiSlNPTiIsInN0cmluZ2lmeSIsIm5hbWUiLCJkZXNjcmlwdGlvbiIsImdsb2JhbFBhdGhzIiwicHVzaCIsInRpbWVzIiwibiIsImZuIiwiYXJyIiwiaSIsImdsb2JhbCIsInBvc2l0aW9uIiwid2lkdGgiLCJoZWlnaHQiLCJkaXNwbGF5IiwiYmFja2dyb3VuZENvbG9yIiwiTG9nbyIsImJvdHRvbSIsInJpZ2h0IiwiUGhhYmxldCIsImZvbnRGYW1pbHkiLCJwYWRkaW5nIiwiQXBwIiwic3RhdGUiLCJ0aWNrIiwiZmlsZXBhdGgiLCJ1bmRlZmluZWQiLCJ3ZWJwYWNrQ29tcGlsZXIiLCJ3ZWJwYWNrU2VydmVyIiwicmVjZW50bHkiLCJlcnJvcnMiLCJwb3J0IiwicnVubmluZyIsIm9uT3BlbkZpbGUiLCJlIiwibG9hZEZpbGUiLCJvbkRyb3AiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsIm5hdGl2ZUV2ZW50IiwiZGF0YVRyYW5zZmVyIiwicGF0aCIsImNiIiwic2V0U3RhdGUiLCJvbiIsInJlZnJlc2hSZWNlbnRMaXN0Iiwid2luZG93IiwibG9jYXRpb24iLCJzZWFyY2giLCJwYXJzZSIsInNsaWNlIiwic3RhcnRzV2l0aCIsImludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwiY2xvc2UiLCJ3YXRjaGVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlYWRGaWxlIiwic3JjIiwib3B0aW9ucyIsIndlYnBhY2tpZnkiLCJwcmFnbWFzIiwid2F0Y2giLCJ1cGRhdGUiLCJmaWx0ZXIiLCJ4Iiwic2V0VGltZW91dCIsIl9sb2FkRmlsZSIsImZvbnRXZWlnaHQiLCJmb250U2l6ZSIsImJhc2VuYW1lIiwibWFwIiwiY2xlYXJSZWNlbnRMaXN0IiwiQ29tcG9uZW50IiwiZGV2dG9vbCIsInByb2R1Y3Rpb24iLCJlbnRyeSIsInJlbG9hZCIsInJlc29sdmUiLCJzdGF0cyIsIm9mZmxpbmUiLCJvdXRwdXQiLCJfX2Rpcm5hbWUiLCJwYXRoaW5mbyIsInBlcmZvcm1hbmNlIiwiaGludHMiLCJtb2R1bGUiLCJydWxlcyIsImxvYWRlciIsInRlc3QiLCJlbmZvcmNlIiwiZXhjbHVkZSIsImNvbmZpZ0ZpbGUiLCJxdWVyeSIsImxpbWl0IiwibW9kdWxlcyIsImJhYmVsIiwicHJlc2V0cyIsImhlbHBlcnMiLCJwb2x5ZmlsbCIsInJlZ2VuZXJhdG9yIiwianN4IiwiZGVmYXVsdCIsInBsdWdpbnMiLCJjYWNoZURpcmVjdG9yeSIsInVzZSIsImltcG9ydExvYWRlcnMiLCJhbGlhcyIsImV4dGVuc2lvbnMiLCJEZWZpbmVQbHVnaW4iLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJPYmplY3QiLCJrZXlzIiwiZGVmaW5lIiwicmVkdWNlIiwibyIsImtleSIsIlByb3ZpZGVQbHVnaW4iLCJwcm92aWRlIiwiTG9hZGVyT3B0aW9uc1BsdWdpbiIsImRlYnVnIiwicG9zdGNzcyIsImJyb3dzZXJzIiwibm9kZSIsImZzIiwibmV0IiwidGxzIiwiY29udGVudEJhc2UiLCJwdWJsaWMiLCJkaXJuYW1lIiwiaGlzdG9yeUFwaUZhbGxiYWNrIiwiY29tcHJlc3MiLCJwcm94eSIsInF1aWV0IiwiY29sb3JzIiwiaCIsInBhcnNlSW50Iiwic3Vic3RyIiwibGlzdGVuIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFD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QUEsS0FBbkssQ0FEMkM7QUFFeERtRSx3QkFBb0IsSUFGb0M7QUFHeERDLGNBQVUsSUFIOEM7QUFJeERDLFdBQU8zRSxRQUFRMkUsS0FBUixJQUFpQixFQUpnQztBQUtwRDtBQUNBOztBQUVKQyxXQUFPLElBUmlEO0FBU3hEeEQsV0FBTyxFQUFFeUQsUUFBUSxLQUFWO0FBVGlELEdBQXRDLENBQXBCO0FBV0U7QUFDQTtBQUNGLE1BQUlDLElBQUksb0JBQUtqSCxRQUFMLEVBQWVBLFNBQVNwQyxNQUF4QixJQUFpQyxFQUF6QztBQUNBLE1BQUkwQyxPQUFPNkIsUUFBUTdCLElBQVIsSUFBaUIsT0FBTzRHLFNBQVNELEVBQUVFLE1BQUYsQ0FBU0YsRUFBRXJKLE1BQUYsR0FBVyxDQUFwQixDQUFULEVBQWlDLEVBQWpDLENBQW5DO0FBQ0F1QyxnQkFBY2lILE1BQWQsQ0FBcUI5RyxJQUFyQjtBQUNBLDZCQUFZLHNCQUFzQkEsSUFBbEM7QUFDQSxTQUFPLEVBQUVILDRCQUFGLEVBQWlCRCxnQ0FBakIsRUFBa0NJLFVBQWxDLEVBQVA7QUFFRDs7QUFFRCxzQkFBTyxzQ0FBQyxHQUFELE9BQVAsRUFBZStHLFNBQVNDLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBZiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBxcyBmcm9tICdxdWVyeXN0cmluZydcbmltcG9ydCBhdXRvcHJlZml4ZXIgZnJvbSAnYXV0b3ByZWZpeGVyJ1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ3JlYWN0LWRvbSdcbmltcG9ydCAnZ2xhbW9yL3Jlc2V0J1xuaW1wb3J0IGhhc2ggZnJvbSAnZ2xhbW9yL2xpYi9oYXNoJ1xuaW1wb3J0IHByYWdtYXMgZnJvbSAnLi9wcmFnbWFzJ1xuaW1wb3J0IGdsb2IycmVnZXhwIGZyb20gJ2dsb2ItdG8tcmVnZXhwJ1xuaW1wb3J0IG9wZW5Ccm93c2VyIGZyb20gJ3JlYWN0LWRldi11dGlscy9vcGVuQnJvd3NlcidcbmltcG9ydCBPZmZsaW5lUGx1Z2luIGZyb20gJ29mZmxpbmUtcGx1Z2luJ1xuXG5jb25zdCBlbGVjdHJvbiA9IHJlcXVpcmUoJ2VsZWN0cm9uJylcbmNvbnN0IGFwcCA9IGVsZWN0cm9uLmFwcCB8fCBlbGVjdHJvbi5yZW1vdGUuYXBwXG5cblxuaW1wb3J0IFdlYnBhY2tEZXZTZXJ2ZXIgZnJvbSAnd2VicGFjay1kZXYtc2VydmVyJ1xuaW1wb3J0IHdlYnBhY2sgZnJvbSAnd2VicGFjaydcblxuaW1wb3J0IHsgY3NzLCBwcmVzZXRzIH0gZnJvbSAnZ2xhbW9yJ1xuY29uc3QgeWVsbG93ID0gJyNmN2RmMWUnXG5cblxuaW1wb3J0IERhdGFTdG9yZSBmcm9tICduZWRiJ1xubGV0IGRiID0gbmV3IERhdGFTdG9yZSh7XG4gIGZpbGVuYW1lOiBwYXRoLmpvaW4oYXBwLmdldFBhdGgoJ3VzZXJEYXRhJyksICdzdG9yZS5kYicpLFxuICBhdXRvbG9hZDogdHJ1ZVxufSlcbmRiLmZpbmQoeyBfaWQ6ICdyZWNlbnRseScgfSwgKGVyciwgZG9jcykgPT4ge1xuICBpZihkb2NzLmxlbmd0aCA9PT0gMCkge1xuICAgIGRiLmluc2VydCh7IF9pZDogJ3JlY2VudGx5JywgZmlsZXM6IFtdIH0sIGVyciA9PiB7XG4gICAgICBpZihlcnIpIHJldHVybiBjb25zb2xlLmVycm9yKGVycikgLy9lc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUubG9nKCdkYiBpbml0aWFsaXplZCcpIC8vZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgfSlcbiAgfVxuICBlbHNlIGNvbnNvbGUubG9nKCdkYiByZXN0YXJ0ZWQnKSAgLy9lc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbn0pXG5cbi8vIHRvZG8gLSBtb3ZlIHRoaXMgdG8gbWFpbi5qcyBcbmltcG9ydCBta2RpcnAgZnJvbSAnbWtkaXJwJ1xuaW1wb3J0IHRvdWNoIGZyb20gJ3RvdWNoJ1xuaW1wb3J0IGZzIGZyb20gJ2ZzJ1xuXG5cbi8vIHRvZG8gLSB3aW5kb3dzXG5ta2RpcnAocGF0aC5qb2luKGFwcC5nZXRQYXRoKCdob21lJyksICcucmF0cGFjaycpLCBlcnIgPT4ge1xuICBpZihlcnIpIHtcbiAgICB0aHJvdyBlcnJcbiAgfVxuICBsZXQgcGtqc29uID0gcGF0aC5qb2luKGFwcC5nZXRQYXRoKCdob21lJyksICcucmF0cGFjay9wYWNrYWdlLmpzb24nKVxuICBpZighZnMuZXhpc3RzU3luYyhwa2pzb24pKSB7XG4gICAgdG91Y2guc3luYyhwa2pzb24pXG4gICAgZnMud3JpdGVGaWxlU3luYyhwa2pzb24sIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIG5hbWU6ICdyYXRwYWNrLWxvY2FsJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAndGhlc2UgbW9kdWxlcyBhcmUgYXZhaWxhYmxlIHRvIGFsbCBzY3JpcHRzIGxhdW5jaGVkIGJ5IHJhdHBhY2snXG4gICAgfSkpICBcbiAgfVxuICAvLyBhbW9uZyBvdGhlciB0aGluZ3MsIHRoaXMgbWFrZXMgbG9hZGVycyBkZWZpbmVkIGluIHByYWdtYXMgdG8gd29yayBcbiAgcmVxdWlyZSgnbW9kdWxlJykuZ2xvYmFsUGF0aHMucHVzaChwYXRoLmpvaW4oYXBwLmdldFBhdGgoJ2hvbWUnKSwgJy5yYXRwYWNrL25vZGVfbW9kdWxlcycpKVxuICBcbn0pXG5cbmZ1bmN0aW9uIHRpbWVzKG4sIGZuKSB7XG4gIGxldCBhcnIgPSBbXVxuICBmb3IobGV0IGk9IDA7IGk8IG47IGkrKykge1xuICAgIGFyci5wdXNoKGZuKGkpKVxuICB9XG4gIHJldHVybiBhcnJcbn1cblxuY3NzLmdsb2JhbCgnaHRtbCwgYm9keSwgI3Jvb3QnLCB7IHBvc2l0aW9uOiAncmVsYXRpdmUnLCB3aWR0aDogJzEwMCUnLCBoZWlnaHQ6ICcxMDAlJywgZGlzcGxheTogJ2Jsb2NrJywgYmFja2dyb3VuZENvbG9yOiB5ZWxsb3cgfSlcblxuY29uc3QgTG9nbyA9ICgpID0+IDxkaXYgY3NzPXt7IHdpZHRoOiAxMDAsIGhlaWdodDogMTAwLCBwb3NpdGlvbjogJ2Fic29sdXRlJywgYm90dG9tOiAwLCByaWdodDogMCwgW3ByZXNldHMuUGhhYmxldF06IHsgd2lkdGg6IDIwMCwgaGVpZ2h0OiAyMDAgfSB9fT5cbiAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA2MzAgNjMwXCIgPlxuICAgIDxwYXRoIGQ9XCJtNDIzLjIgNDkyLjE5YzEyLjY5IDIwLjcyIDI5LjIgMzUuOTUgNTguNCAzNS45NSAyNC41MyAwIDQwLjItMTIuMjYgNDAuMi0yOS4yIDAtMjAuMy0xNi4xLTI3LjQ5LTQzLjEtMzkuM2wtMTQuOC02LjM1Yy00Mi43Mi0xOC4yLTcxLjEtNDEtNzEuMS04OS4yIDAtNDQuNCAzMy44My03OC4yIDg2LjctNzguMiAzNy42NCAwIDY0LjcgMTMuMSA4NC4yIDQ3LjRsLTQ2LjEgMjkuNmMtMTAuMTUtMTguMi0yMS4xLTI1LjM3LTM4LjEtMjUuMzctMTcuMzQgMC0yOC4zMyAxMS0yOC4zMyAyNS4zNyAwIDE3Ljc2IDExIDI0Ljk1IDM2LjQgMzUuOTVsMTQuOCA2LjM0YzUwLjMgMjEuNTcgNzguNyA0My41NiA3OC43IDkzIDAgNTMuMy00MS44NyA4Mi41LTk4LjEgODIuNS01NC45OCAwLTkwLjUtMjYuMi0xMDcuODgtNjAuNTR6bS0yMDkuMTMgNS4xM2M5LjMgMTYuNSAxNy43NiAzMC40NSAzOC4xIDMwLjQ1IDE5LjQ1IDAgMzEuNzItNy42MSAzMS43Mi0zNy4ydi0yMDEuM2g1OS4ydjIwMi4xYzAgNjEuMy0zNS45NCA4OS4yLTg4LjQgODkuMi00Ny40IDAtNzQuODUtMjQuNTMtODguODEtNTQuMDc1elwiIC8+XG4gIDwvc3ZnPlxuPC9kaXY+XG5cbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRlID0ge1xuICAgIHRpY2s6IDAsXG4gICAgZmlsZXBhdGg6IHVuZGVmaW5lZCxcbiAgICB3ZWJwYWNrQ29tcGlsZXI6IG51bGwsXG4gICAgd2VicGFja1NlcnZlcjogbnVsbCxcbiAgICByZWNlbnRseTogW10sXG4gICAgZXJyb3JzOiBbXSxcbiAgICBwb3J0OiAwLFxuICAgIHJ1bm5pbmc6IGZhbHNlXG4gIH1cbiAgb25PcGVuRmlsZSA9IChlLCBmaWxlcGF0aCkgPT4ge1xuICAgIHRoaXMubG9hZEZpbGUoZmlsZXBhdGgpXG4gIH1cbiAgcmVmcmVzaFJlY2VudExpc3QoY2IpIHtcbiAgICBkYi5maW5kKHsgX2lkOiAncmVjZW50bHknIH0sIChlcnIsIGRvY3MpID0+IHtcbiAgICAgIGlmKGVycikge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBlcnJvcnM6IFsgLi4udGhpcy5zdGF0ZS5lcnJvcnMsIGVyciBdXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICByZWNlbnRseTogZG9jc1swXS5maWxlc1xuICAgICAgfSlcbiAgICAgIGlmKGNiKSBjYigpXG4gICAgfSlcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBhcHAub24oJ29wZW4tZmlsZScsIHRoaXMub25PcGVuRmlsZSlcbiAgICB0aGlzLnJlZnJlc2hSZWNlbnRMaXN0KCgpID0+IHtcbiAgICAgIGlmKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpIHtcbiAgICAgICAgbGV0IGZpbGVwYXRoID0gcXMucGFyc2Uod2luZG93LmxvY2F0aW9uLnNlYXJjaC5zbGljZSgxKSkuc3RhcnRzV2l0aFxuICAgICAgICBmaWxlcGF0aCAmJiB0aGlzLmxvYWRGaWxlKGZpbGVwYXRoKVxuICAgICAgfVxuICAgIH0pICAgXG4gICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICB0aWNrOiAodGhpcy5zdGF0ZS50aWNrICsgMSkgJSA0IFxuICAgICAgfSkgICAgICBcbiAgICB9LCA0MDApXG4gXG4gIH1cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKVxuICAgIHRoaXMuaW50ZXJ2YWwgPSBudWxsICAgIFxuXG4gICAgaWYodGhpcy5zdGF0ZS53ZWJwYWNrU2VydmVyKSB7XG4gICAgICB0aGlzLnN0YXRlLndlYnBhY2tTZXJ2ZXIuY2xvc2UoKSAgXG4gICAgfSAgIFxuICAgIGlmKHRoaXMud2F0Y2hlcikge1xuICAgICAgdGhpcy53YXRjaGVyLmNsb3NlKClcbiAgICAgIHRoaXMud2F0Y2hlciA9IG51bGxcbiAgICB9IFxuICAgIGFwcC5yZW1vdmVFdmVudExpc3RlbmVyKCdvcGVuLWZpbGUnLCB0aGlzLm9uT3BlbkZpbGUpXG4gIH1cbiAgX2xvYWRGaWxlKGZpbGVwYXRoKXtcbiAgICBmcy5yZWFkRmlsZShmaWxlcGF0aCwgJ3V0ZjgnLCAoZXJyLCBzcmMpID0+IHsgICAgICBcbiAgICAgIGlmKGVycikgdGhyb3cgZXJyXG4gICAgICBsZXQgb3B0aW9ucyA9IHByYWdtYXMoc3JjKVxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IC4uLndlYnBhY2tpZnkoZmlsZXBhdGgsIG9wdGlvbnMpLCBmaWxlcGF0aCwgcnVubmluZzogdHJ1ZSwgcHJhZ21hczogb3B0aW9ucyB9KVxuXG4gICAgICAvLyBzaW11bHRhbmVvdXNseSBzdGFydCB3YXRjaGluZyB0aGUgZW50cnkgZmlsZSBcbiAgICAgIHRoaXMud2F0Y2hlciA9IGZzLndhdGNoKGZpbGVwYXRoLCBlID0+IHtcbiAgICAgICAgaWYoZSA9PT0gJ3JlbmFtZScpIHtcbiAgICAgICAgICAvLyA/Pz9cbiAgICAgICAgICByZXR1cm4gICAgICAgICAgXG4gICAgICAgIH0gICAgICAgIFxuICAgICAgICAvLyBpZiBhbnkgb2YgdGhlIHByYWdtYXMgY2hhbmdlLCByZWRvIHRoaXMgc2hpbmRpZyBcbiAgICAgICAgZnMucmVhZEZpbGUoZmlsZXBhdGgsICd1dGY4JywgKGVyciwgc3JjKSA9PiB7XG4gICAgICAgICAgbGV0IG9wdGlvbnMgPSBwcmFnbWFzKHNyYylcbiAgICAgICAgICBpZihKU09OLnN0cmluZ2lmeShvcHRpb25zKSAhPT0gSlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZS5wcmFnbWFzKSkge1xuICAgICAgICAgICAgdGhpcy5sb2FkRmlsZShmaWxlcGF0aClcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gdG9kbyAtIHByZXZlbnQgZG91YmxlIHJlYWQgXG4gICAgICAgIH0pXG5cbiAgICAgIH0pXG4gICAgfSkgICAgXG4gIH1cbiAgbG9hZEZpbGUoZmlsZXBhdGgpIHtcblxuICAgIGRiLnVwZGF0ZSh7IF9pZDogJ3JlY2VudGx5JyB9LCB7IF9pZDogJ3JlY2VudGx5JywgZmlsZXM6IFsgeyBwYXRoOiBmaWxlcGF0aCB9LCAuLi50aGlzLnN0YXRlLnJlY2VudGx5LmZpbHRlcih4ID0+IHgucGF0aCAhPT0gZmlsZXBhdGgpIF0uc2xpY2UoMCwgMTApIH0sIHt9LCBlcnIgPT4ge1xuICAgICAgaWYoZXJyKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIGVycm9yczogWyAuLi50aGlzLnN0YXRlLmVycm9ycywgZXJyIF1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuICAgICAgICAgXG4gICAgICB9IFxuICAgICAgdGhpcy5yZWZyZXNoUmVjZW50TGlzdCgpICAgICAgICAgICBcbiAgICB9KVxuICAgIGlmKHRoaXMud2F0Y2hlcikge1xuICAgICAgdGhpcy53YXRjaGVyLmNsb3NlKClcbiAgICAgIHRoaXMud2F0Y2hlciA9IG51bGxcbiAgICB9XG4gICAgXG4gICAgaWYodGhpcy5zdGF0ZS53ZWJwYWNrU2VydmVyKSB7XG4gICAgICB0aGlzLnN0YXRlLndlYnBhY2tTZXJ2ZXIuY2xvc2UoKVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuX2xvYWRGaWxlKGZpbGVwYXRoKVxuICAgICAgfSwgNTAwKSAgICAgIFxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuX2xvYWRGaWxlKGZpbGVwYXRoKVxuICAgIH1cbiAgICAgICAgICAgIFxuICB9XG4gIG9uRHJvcCA9IGUgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICBsZXQgZmlsZXBhdGggPSBlLm5hdGl2ZUV2ZW50LmRhdGFUcmFuc2Zlci5maWxlc1swXS5wYXRoXG4gICAgdGhpcy5sb2FkRmlsZShmaWxlcGF0aClcbiAgfVxuICBjbGVhclJlY2VudExpc3QoKSB7XG4gICAgZGIudXBkYXRlKHsgX2lkOiAncmVjZW50bHknIH0sIHsgX2lkOiAncmVjZW50bHknLCBmaWxlczogW10gfSwgKCkgPT4ge1xuICAgICAgdGhpcy5yZWZyZXNoUmVjZW50TGlzdCgpXG4gICAgfSlcbiAgfVxuICBcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiA8ZGl2IFxuICAgICAgY3NzPXt7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogJzEwMCUnLCBmb250RmFtaWx5OiAnaGVsdmV0aWNhJyB9fSBcbiAgICAgIG9uRHJhZ092ZXI9e2UgPT4gZS5wcmV2ZW50RGVmYXVsdCgpfSAvLyBjaHJvbWUgYnVnIFxuICAgICAgb25Ecm9wPXt0aGlzLm9uRHJvcH0+ICAgICAgXG4gICAgICAgIFxuICAgICAgPGRpdiBjc3M9e3sgZm9udFdlaWdodDogJ2JvbGRlcicsIGZvbnRTaXplOiAzMiwgcGFkZGluZzogMjAsIFtwcmVzZXRzLlBoYWJsZXRdOiB7IGZvbnRTaXplOiA2NCB9IH19PlxuICAgICAgeyB0aGlzLnN0YXRlLnJ1bm5pbmcgPyBcbiAgICAgICAgYCR7cGF0aC5iYXNlbmFtZSh0aGlzLnN0YXRlLmZpbGVwYXRoKX0gcnVubmluZyBhdCBcbiAgICAgICAgbG9jYWxob3N0OiR7dGhpcy5zdGF0ZS5wb3J0fSR7dGltZXModGhpcy5zdGF0ZS50aWNrLCAoKSA9PiAnLicpLmpvaW4oJycpfWBcbiAgICAgICAgOiAnRHJvcCBhIC5qcyBmaWxlIGhlcmUgdG8gZ2V0IHN0YXJ0ZWQgJ31cbiAgICAgICAgXG4gICAgICBcbiAgICAgIDwvZGl2PiBcbiAgICAgIHsgdGhpcy5zdGF0ZS5yZWNlbnRseS5sZW5ndGggPiAwICYmIDxkaXYgY3NzPXt7IHBhZGRpbmc6IDIwIH19PlxuICAgICAgICA8aDE+cHJldmlvdXNseS4uLjwvaDE+XG4gICAgICAgIHt0aGlzLnN0YXRlLnJlY2VudGx5Lm1hcCh4ID0+IDxkaXYga2V5PXt4LnBhdGh9IG9uQ2xpY2s9eygpID0+IHRoaXMubG9hZEZpbGUoeC5wYXRoKX0+e3gucGF0aH08L2Rpdj4pfVxuICAgICAgICA8aDQgb25DbGljaz17KCkgPT4gdGhpcy5jbGVhclJlY2VudExpc3QoKX0+Y2xlYXIgbGlzdDwvaDQ+XG4gICAgICA8L2Rpdj59XG4gICAgICBcbiAgICAgIDxMb2dvLz5cbiAgICAgIFxuICAgIDwvZGl2PlxuICAgIFxuICB9XG59XG5cbmZ1bmN0aW9uIHdlYnBhY2tpZnkoZmlsZXBhdGgsIG9wdGlvbnMgPSB7fSkge1xuICBcbiAgbGV0IHdlYnBhY2tDb21waWxlciA9IHdlYnBhY2soe1xuICAgIGRldnRvb2w6IG9wdGlvbnMucHJvZHVjdGlvbiA/IGZhbHNlIDogKG9wdGlvbnMuZGV2dG9vbCB8fCAnY2hlYXAtbW9kdWxlLXNvdXJjZS1tYXAnKSxcbiAgICBlbnRyeTogWyBcbiAgICAgICgob3B0aW9ucy5yZWxvYWQgIT09IGZhbHNlKSB8fCAob3B0aW9ucy5wcm9kdWN0aW9uICE9PSB0cnVlKSApID8gXG4gICAgICAgIHJlcXVpcmUucmVzb2x2ZSgncmVhY3QtZGV2LXV0aWxzL3dlYnBhY2tIb3REZXZDbGllbnQuanMnKSA6IFxuICAgICAgICB1bmRlZmluZWQsIFxuICAgICAgb3B0aW9ucy5zdGF0cyA/IHJlcXVpcmUucmVzb2x2ZSgnLi9zdGF0cy5qcycpIDogdW5kZWZpbmVkLFxuICAgICAgcmVxdWlyZS5yZXNvbHZlKCcuL3BvbHlmaWxscycpLCBcbiAgICAgIG9wdGlvbnMub2ZmbGluZSA/IHJlcXVpcmUucmVzb2x2ZSgnLi9vZmZsaW5lLXBsdWdpbi1ydW50aW1lLmpzJykgOiB1bmRlZmluZWQsXG4gICAgICBmaWxlcGF0aCBcbiAgICBdLmZpbHRlcih4ID0+ICEheCksXG4gICAgb3V0cHV0OiB7XG4gICAgICBwYXRoOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vcHVibGljJyksXG4gICAgICBwYXRoaW5mbzogdHJ1ZSxcbiAgICAgIGZpbGVuYW1lOiAnYnVuZGxlLmpzJ1xuICAgIH0sXG4gICAgcGVyZm9ybWFuY2U6IHtcbiAgICAgIGhpbnRzOiBmYWxzZVxuICAgIH0sXG4gICAgbW9kdWxlOiB7XG4gICAgICBydWxlczogWyBcbiAgICAgICAgLi4uKG9wdGlvbnMucnVsZXMgfHwgW10pLm1hcCgoeyBsb2FkZXIsIGZpbGVzLCBvcHRpb25zIH0pID0+ICh7IGxvYWRlcjogcmVxdWlyZS5yZXNvbHZlKGxvYWRlciksIG9wdGlvbnMsIHRlc3Q6IGdsb2IycmVnZXhwKGZpbGVzIHx8ICcqJykgfSkpLCBcbiAgICAgICAge1xuICAgICAgICAgIGVuZm9yY2U6ICdwcmUnLFxuICAgICAgICAgIHRlc3Q6IC9cXC4oanN8anN4KSQvLFxuICAgICAgICAgIGxvYWRlcjogcmVxdWlyZS5yZXNvbHZlKCdlc2xpbnQtbG9hZGVyJyksXG4gICAgICAgICAgZXhjbHVkZTogL25vZGVfbW9kdWxlcy8sXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgY29uZmlnRmlsZTogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL3Jlc291cmNlcy8uZXNsaW50cmMnKVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgXG4gICAgICAgIHtcbiAgICAgICAgICBleGNsdWRlOiBbXG4gICAgICAgICAgICAvXFwuaHRtbCQvLFxuICAgICAgICAgICAgL1xcLihqc3xqc3gpJC8sXG4gICAgICAgICAgICAvXFwuY3NzJC8sXG4gICAgICAgICAgICAvXFwuanNvbiQvLFxuICAgICAgICAgICAgL1xcLnN2ZyQvXG4gICAgICAgICAgXSxcbiAgICAgICAgICBsb2FkZXI6IHJlcXVpcmUucmVzb2x2ZSgndXJsLWxvYWRlcicpLFxuICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICBsaW1pdDogMTAwMDAsXG4gICAgICAgICAgICBuYW1lOiAnc3RhdGljL21lZGlhL1tuYW1lXS5baGFzaDo4XS5bZXh0XSdcbiAgICAgICAgICB9XG4gICAgICAgIH0sIFxuICAgICAgICB7XG4gICAgICAgICAgdGVzdDogL1xcLmpzJC8sXG4gICAgICAgICAgZXhjbHVkZTogL25vZGVfbW9kdWxlcy8sXG4gICAgICAgICAgbG9hZGVyOiByZXF1aXJlLnJlc29sdmUoJ2JhYmVsLWxvYWRlcicpLFxuICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICdwcmVzZXRzJzogWyBcbiAgICAgICAgICAgICAgWyByZXF1aXJlKCdiYWJlbC1wcmVzZXQtZW52JyksIHsgXG4gICAgICAgICAgICAgICAgJ3RhcmdldHMnOiB7XG4gICAgICAgICAgICAgICAgICAnYnJvd3NlcnMnOiBbICdsYXN0IDIgdmVyc2lvbnMnLCAnc2FmYXJpID49IDcnIF1cbiAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICBtb2R1bGVzOiBmYWxzZSBcbiAgICAgICAgICAgICAgfSBdLCBcbiAgICAgICAgICAgICAgcmVxdWlyZSgnYmFiZWwtcHJlc2V0LXN0YWdlLTAnKSwgXG4gICAgICAgICAgICAgIHJlcXVpcmUoJ2JhYmVsLXByZXNldC1yZWFjdCcpLCAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIC4uLihvcHRpb25zLmJhYmVsIHx8IHt9KS5wcmVzZXRzIHx8IFtdXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgJ3BsdWdpbnMnOiBbXG4gICAgICAgICAgICAgIFsgcmVxdWlyZS5yZXNvbHZlKCdiYWJlbC1wbHVnaW4tdHJhbnNmb3JtLXJ1bnRpbWUnKSwge1xuICAgICAgICAgICAgICAgIGhlbHBlcnM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHBvbHlmaWxsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICByZWdlbmVyYXRvcjogdHJ1ZVxuICAgICAgICAgICAgICAgIC8vIFJlc29sdmUgdGhlIEJhYmVsIHJ1bnRpbWUgcmVsYXRpdmUgdG8gdGhlIGNvbmZpZy5cbiAgICAgICAgICAgICAgICAvLyBtb2R1bGVOYW1lOiBwYXRoLmRpcm5hbWUocmVxdWlyZS5yZXNvbHZlKCdiYWJlbC1ydW50aW1lL3BhY2thZ2UnKSlcbiAgICAgICAgICAgICAgfSBdLFxuICAgICAgICAgICAgICBvcHRpb25zLmpzeCA/IFsgcmVxdWlyZSgnYmFiZWwtcGx1Z2luLXRyYW5zZm9ybS1yZWFjdC1qc3gnKSxcbiAgICAgICAgICAgICAgICB7ICdwcmFnbWEnOiBvcHRpb25zLmpzeCB9IF0gOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgIHJlcXVpcmUoJ2JhYmVsLXBsdWdpbi10cmFuc2Zvcm0tZGVjb3JhdG9ycy1sZWdhY3knKS5kZWZhdWx0LFxuICAgICAgICAgICAgICByZXF1aXJlKCdiYWJlbC1wbHVnaW4tdHJhbnNmb3JtLXJlYWN0LXJlcXVpcmUnKS5kZWZhdWx0LFxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgLi4uKG9wdGlvbnMuYmFiZWwgfHwge30pLnBsdWdpbnMgfHwgW11cbiAgICAgICAgICAgIF0uZmlsdGVyKHggPT4gISF4KSxcbiAgICAgICAgICAgIGNhY2hlRGlyZWN0b3J5OiBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXN0OiAvXFwuY3NzJC8sXG4gICAgICAgICAgdXNlOiBbXG4gICAgICAgICAgICByZXF1aXJlLnJlc29sdmUoJ3N0eWxlLWxvYWRlcicpLCBcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbG9hZGVyOiByZXF1aXJlLnJlc29sdmUoJ2Nzcy1sb2FkZXInKSxcbiAgICAgICAgICAgICAgb3B0aW9uczogeyBpbXBvcnRMb2FkZXJzOiAxIH0gXG4gICAgICAgICAgICB9LCBcbiAgICAgICAgICAgIHJlcXVpcmUucmVzb2x2ZSgncG9zdGNzcy1sb2FkZXInKSAgLy8gb3B0aW9ucyBpbiB0aGUgcGx1Z2lucyBzZWN0aW9uIGJlbG93ICAgICAgICAgICAgIFxuICAgICAgICAgIF1cbiAgICAgICAgfSwgXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICB0ZXN0OiAvXFwuanNvbiQvLFxuICAgICAgICAvLyAgIGxvYWRlcjogcmVxdWlyZS5yZXNvbHZlKCdqc29uLWxvYWRlcicpXG4gICAgICAgIC8vIH0sXG4gICAgICAgICB7XG4gICAgICAgICAgdGVzdDogL1xcLnN2ZyQvLFxuICAgICAgICAgIGxvYWRlcjogcmVxdWlyZS5yZXNvbHZlKCdmaWxlLWxvYWRlcicpLFxuICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICBuYW1lOiAnc3RhdGljL21lZGlhL1tuYW1lXS5baGFzaDo4XS5bZXh0XSdcbiAgICAgICAgICB9XG4gICAgICAgIH0gXG4gICAgICBdXG4gICAgfSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczogb3B0aW9ucy5hbGlhcyB8fCB7fSxcbiAgICAgIGV4dGVuc2lvbnM6IFsgJy5qcycsICcuanNvbicsICcuanN4JyBdLFxuICAgICAgbW9kdWxlczogWyAnbm9kZV9tb2R1bGVzJywgcGF0aC5qb2luKGFwcC5nZXRQYXRoKCdob21lJyksICcucmF0cGFjay9ub2RlX21vZHVsZXMnKSwgIHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi9ub2RlX21vZHVsZXMnKSBdXG4gICAgfSxcbiAgICBwbHVnaW5zOiBbXG4gICAgICBuZXcgd2VicGFjay5EZWZpbmVQbHVnaW4oe1xuICAgICAgICAncHJvY2Vzcy5lbnYuTk9ERV9FTlYnOiBKU09OLnN0cmluZ2lmeSgob3B0aW9ucy5wcm9kdWN0aW9uICYmICdwcm9kdWN0aW9uJykgfHwgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgfHwgJ2RldmVsb3BtZW50JyksXG4gICAgICAgIC4uLk9iamVjdC5rZXlzKG9wdGlvbnMuZGVmaW5lIHx8IHt9KS5yZWR1Y2UoKG8sIGtleSkgPT4gKHsgLi4ubywgW2tleV06IEpTT04uc3RyaW5naWZ5KG9wdGlvbnMuZGVmaW5lW2tleV0pIH0pLCB7fSlcbiAgICAgIH0pLFxuICAgICAgb3B0aW9ucy5vZmZsaW5lID8gbmV3IE9mZmxpbmVQbHVnaW4ob3B0aW9ucy5vZmZsaW5lID09PSB0cnVlID8ge30gOiBvcHRpb25zLm9mZmxpbmUpIDogdW5kZWZpbmVkLFxuICAgICAgbmV3IHdlYnBhY2suUHJvdmlkZVBsdWdpbihvcHRpb25zLnByb3ZpZGUgfHwge30pLFxuICAgICAgbmV3IHdlYnBhY2suTG9hZGVyT3B0aW9uc1BsdWdpbih7XG4gICAgICAgIHRlc3Q6IC9cXC5jc3MkLyxcbiAgICAgICAgZGVidWc6IHRydWUsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBwb3N0Y3NzOiBbXG4gICAgICAgICAgICBhdXRvcHJlZml4ZXIoe1xuICAgICAgICAgICAgICBicm93c2VyczogW1xuICAgICAgICAgICAgICAgICc+MSUnLFxuICAgICAgICAgICAgICAgICdsYXN0IDQgdmVyc2lvbnMnLFxuICAgICAgICAgICAgICAgICdGaXJlZm94IEVTUicsXG4gICAgICAgICAgICAgICAgJ25vdCBpZSA8IDknIC8vIFJlYWN0IGRvZXNuJ3Qgc3VwcG9ydCBJRTggYW55d2F5XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIF0uZmlsdGVyKHggPT4gISF4KSxcbiAgICBzdGF0czogJ2Vycm9ycy1vbmx5JyxcbiAgICBub2RlOiB7XG4gICAgICBmczogJ2VtcHR5JyxcbiAgICAgIG5ldDogJ2VtcHR5JyxcbiAgICAgIHRsczogJ2VtcHR5J1xuICAgIH1cbiAgfSlcbiAgXG4gIGxldCB3ZWJwYWNrU2VydmVyID0gbmV3IFdlYnBhY2tEZXZTZXJ2ZXIod2VicGFja0NvbXBpbGVyLCB7XG4gICAgY29udGVudEJhc2U6IFsgb3B0aW9ucy5wdWJsaWMgPyBwYXRoLmpvaW4ocGF0aC5kaXJuYW1lKGZpbGVwYXRoKSwgb3B0aW9ucy5wdWJsaWMpIDogJycsIHBhdGguam9pbihwYXRoLmRpcm5hbWUoZmlsZXBhdGgpLCAncHVibGljJyksIHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi9wdWJsaWMnKSBdLmZpbHRlcih4ID0+ICEheCksXG4gICAgaGlzdG9yeUFwaUZhbGxiYWNrOiB0cnVlLFxuICAgIGNvbXByZXNzOiB0cnVlLFxuICAgIHByb3h5OiBvcHRpb25zLnByb3h5IHx8IHt9LFxuICAgICAgICAvLyBzZXR1cCgpXG4gICAgICAgIC8vIHN0YXRpY09wdGlvbnMgXG5cbiAgICBxdWlldDogdHJ1ZSwgICAgICBcbiAgICBzdGF0czogeyBjb2xvcnM6IGZhbHNlIH0gIFxuICB9KVxuICAgIC8vIHRoaXMgaXMgdG8gd29ya2Fyb3VuZCBzb21lIHdlaXJkIGJ1ZyB3aGVyZSB3ZWJwYWNrIGtlZXBzIHRoZSBmaXJzdCBsb2FkZWQgZmlsZSBcbiAgICAvLyBhbHNvIG1ha2VzIGl0IGxvb2sgY29vbCBoYVxuICBsZXQgaCA9IGhhc2goZmlsZXBhdGgsIGZpbGVwYXRoLmxlbmd0aCkrICcnXG4gIGxldCBwb3J0ID0gb3B0aW9ucy5wb3J0IHx8ICgzMDAwICsgcGFyc2VJbnQoaC5zdWJzdHIoaC5sZW5ndGggLSA0KSwgMTApKVxuICB3ZWJwYWNrU2VydmVyLmxpc3Rlbihwb3J0KVxuICBvcGVuQnJvd3NlcignaHR0cDovL2xvY2FsaG9zdDonICsgcG9ydClcbiAgcmV0dXJuIHsgd2VicGFja1NlcnZlciwgd2VicGFja0NvbXBpbGVyLCBwb3J0IH1cblxufVxuIFxucmVuZGVyKDxBcHAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSlcbiJdfQ==