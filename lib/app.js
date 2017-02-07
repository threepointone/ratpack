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
      // todo - windows
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
    // todo - windows
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAuanMiXSwibmFtZXMiOlsiZWxlY3Ryb24iLCJyZXF1aXJlIiwiYXBwIiwicmVtb3RlIiwieWVsbG93IiwiZGIiLCJmaWxlbmFtZSIsImpvaW4iLCJnZXRQYXRoIiwiYXV0b2xvYWQiLCJmaW5kIiwiX2lkIiwiZXJyIiwiZG9jcyIsImxlbmd0aCIsImluc2VydCIsImZpbGVzIiwiY29uc29sZSIsImVycm9yIiwibG9nIiwicGtqc29uIiwiZXhpc3RzU3luYyIsInN5bmMiLCJ3cml0ZUZpbGVTeW5jIiwiSlNPTiIsInN0cmluZ2lmeSIsIm5hbWUiLCJkZXNjcmlwdGlvbiIsImdsb2JhbFBhdGhzIiwicHVzaCIsInRpbWVzIiwibiIsImZuIiwiYXJyIiwiaSIsImdsb2JhbCIsInBvc2l0aW9uIiwid2lkdGgiLCJoZWlnaHQiLCJkaXNwbGF5IiwiYmFja2dyb3VuZENvbG9yIiwiTG9nbyIsImJvdHRvbSIsInJpZ2h0IiwiUGhhYmxldCIsImZvbnRGYW1pbHkiLCJwYWRkaW5nIiwiQXBwIiwic3RhdGUiLCJ0aWNrIiwiZmlsZXBhdGgiLCJ1bmRlZmluZWQiLCJ3ZWJwYWNrQ29tcGlsZXIiLCJ3ZWJwYWNrU2VydmVyIiwicmVjZW50bHkiLCJlcnJvcnMiLCJwb3J0IiwicnVubmluZyIsIm9uT3BlbkZpbGUiLCJlIiwibG9hZEZpbGUiLCJvbkRyb3AiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsIm5hdGl2ZUV2ZW50IiwiZGF0YVRyYW5zZmVyIiwicGF0aCIsImNiIiwic2V0U3RhdGUiLCJvbiIsInJlZnJlc2hSZWNlbnRMaXN0Iiwid2luZG93IiwibG9jYXRpb24iLCJzZWFyY2giLCJwYXJzZSIsInNsaWNlIiwic3RhcnRzV2l0aCIsImludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwiY2xvc2UiLCJ3YXRjaGVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlYWRGaWxlIiwic3JjIiwib3B0aW9ucyIsIndlYnBhY2tpZnkiLCJwcmFnbWFzIiwid2F0Y2giLCJ1cGRhdGUiLCJmaWx0ZXIiLCJ4Iiwic2V0VGltZW91dCIsIl9sb2FkRmlsZSIsImZvbnRXZWlnaHQiLCJmb250U2l6ZSIsImJhc2VuYW1lIiwibWFwIiwiY2xlYXJSZWNlbnRMaXN0IiwiQ29tcG9uZW50IiwiZGV2dG9vbCIsInByb2R1Y3Rpb24iLCJlbnRyeSIsInJlbG9hZCIsInJlc29sdmUiLCJzdGF0cyIsIm9mZmxpbmUiLCJvdXRwdXQiLCJfX2Rpcm5hbWUiLCJwYXRoaW5mbyIsInBlcmZvcm1hbmNlIiwiaGludHMiLCJtb2R1bGUiLCJydWxlcyIsImxvYWRlciIsInRlc3QiLCJlbmZvcmNlIiwiZXhjbHVkZSIsImNvbmZpZ0ZpbGUiLCJxdWVyeSIsImxpbWl0IiwibW9kdWxlcyIsImJhYmVsIiwicHJlc2V0cyIsImhlbHBlcnMiLCJwb2x5ZmlsbCIsInJlZ2VuZXJhdG9yIiwianN4IiwiZGVmYXVsdCIsInBsdWdpbnMiLCJjYWNoZURpcmVjdG9yeSIsInVzZSIsImltcG9ydExvYWRlcnMiLCJhbGlhcyIsImV4dGVuc2lvbnMiLCJEZWZpbmVQbHVnaW4iLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJPYmplY3QiLCJrZXlzIiwiZGVmaW5lIiwicmVkdWNlIiwibyIsImtleSIsIlByb3ZpZGVQbHVnaW4iLCJwcm92aWRlIiwiTG9hZGVyT3B0aW9uc1BsdWdpbiIsImRlYnVnIiwicG9zdGNzcyIsImJyb3dzZXJzIiwibm9kZSIsImZzIiwibmV0IiwidGxzIiwiY29udGVudEJhc2UiLCJwdWJsaWMiLCJkaXJuYW1lIiwiaGlzdG9yeUFwaUZhbGxiYWNrIiwiY29tcHJlc3MiLCJwcm94eSIsInF1aWV0IiwiY29sb3JzIiwiaCIsInBhcnNlSW50Iiwic3Vic3RyIiwibGlzdGVuIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFD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Q0MsQ0FBUDtBQUFBLEtBQW5LLENBRjJDO0FBR3hEbUUsd0JBQW9CLElBSG9DO0FBSXhEQyxjQUFVLElBSjhDO0FBS3hEQyxXQUFPM0UsUUFBUTJFLEtBQVIsSUFBaUIsRUFMZ0M7QUFNcEQ7QUFDQTs7QUFFSkMsV0FBTyxJQVRpRDtBQVV4RHhELFdBQU8sRUFBRXlELFFBQVEsS0FBVjtBQVZpRCxHQUF0QyxDQUFwQjtBQVlFO0FBQ0E7QUFDRixNQUFJQyxJQUFJLG9CQUFLakgsUUFBTCxFQUFlQSxTQUFTcEMsTUFBeEIsSUFBaUMsRUFBekM7QUFDQSxNQUFJMEMsT0FBTzZCLFFBQVE3QixJQUFSLElBQWlCLE9BQU80RyxTQUFTRCxFQUFFRSxNQUFGLENBQVNGLEVBQUVySixNQUFGLEdBQVcsQ0FBcEIsQ0FBVCxFQUFpQyxFQUFqQyxDQUFuQztBQUNBdUMsZ0JBQWNpSCxNQUFkLENBQXFCOUcsSUFBckI7QUFDQSw2QkFBWSxzQkFBc0JBLElBQWxDO0FBQ0EsU0FBTyxFQUFFSCw0QkFBRixFQUFpQkQsZ0NBQWpCLEVBQWtDSSxVQUFsQyxFQUFQO0FBRUQ7O0FBRUQsc0JBQU8sc0NBQUMsR0FBRCxPQUFQLEVBQWUrRyxTQUFTQyxjQUFULENBQXdCLE1BQXhCLENBQWYiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgcXMgZnJvbSAncXVlcnlzdHJpbmcnXG5pbXBvcnQgYXV0b3ByZWZpeGVyIGZyb20gJ2F1dG9wcmVmaXhlcidcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tICdyZWFjdC1kb20nXG5pbXBvcnQgJ2dsYW1vci9yZXNldCdcbmltcG9ydCBoYXNoIGZyb20gJ2dsYW1vci9saWIvaGFzaCdcbmltcG9ydCBwcmFnbWFzIGZyb20gJy4vcHJhZ21hcydcbmltcG9ydCBnbG9iMnJlZ2V4cCBmcm9tICdnbG9iLXRvLXJlZ2V4cCdcbmltcG9ydCBvcGVuQnJvd3NlciBmcm9tICdyZWFjdC1kZXYtdXRpbHMvb3BlbkJyb3dzZXInXG5pbXBvcnQgT2ZmbGluZVBsdWdpbiBmcm9tICdvZmZsaW5lLXBsdWdpbidcblxuY29uc3QgZWxlY3Ryb24gPSByZXF1aXJlKCdlbGVjdHJvbicpXG5jb25zdCBhcHAgPSBlbGVjdHJvbi5hcHAgfHwgZWxlY3Ryb24ucmVtb3RlLmFwcFxuXG5cbmltcG9ydCBXZWJwYWNrRGV2U2VydmVyIGZyb20gJ3dlYnBhY2stZGV2LXNlcnZlcidcbmltcG9ydCB3ZWJwYWNrIGZyb20gJ3dlYnBhY2snXG5cbmltcG9ydCB7IGNzcywgcHJlc2V0cyB9IGZyb20gJ2dsYW1vcidcbmNvbnN0IHllbGxvdyA9ICcjZjdkZjFlJ1xuXG5cbmltcG9ydCBEYXRhU3RvcmUgZnJvbSAnbmVkYidcbmxldCBkYiA9IG5ldyBEYXRhU3RvcmUoe1xuICBmaWxlbmFtZTogcGF0aC5qb2luKGFwcC5nZXRQYXRoKCd1c2VyRGF0YScpLCAnc3RvcmUuZGInKSxcbiAgYXV0b2xvYWQ6IHRydWVcbn0pXG5kYi5maW5kKHsgX2lkOiAncmVjZW50bHknIH0sIChlcnIsIGRvY3MpID0+IHtcbiAgaWYoZG9jcy5sZW5ndGggPT09IDApIHtcbiAgICBkYi5pbnNlcnQoeyBfaWQ6ICdyZWNlbnRseScsIGZpbGVzOiBbXSB9LCBlcnIgPT4ge1xuICAgICAgaWYoZXJyKSByZXR1cm4gY29uc29sZS5lcnJvcihlcnIpIC8vZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgICBjb25zb2xlLmxvZygnZGIgaW5pdGlhbGl6ZWQnKSAvL2VzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIH0pXG4gIH1cbiAgZWxzZSBjb25zb2xlLmxvZygnZGIgcmVzdGFydGVkJykgIC8vZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG59KVxuXG4vLyB0b2RvIC0gbW92ZSB0aGlzIHRvIG1haW4uanMgXG5pbXBvcnQgbWtkaXJwIGZyb20gJ21rZGlycCdcbmltcG9ydCB0b3VjaCBmcm9tICd0b3VjaCdcbmltcG9ydCBmcyBmcm9tICdmcydcblxuXG4vLyB0b2RvIC0gd2luZG93c1xubWtkaXJwKHBhdGguam9pbihhcHAuZ2V0UGF0aCgnaG9tZScpLCAnLnJhdHBhY2snKSwgZXJyID0+IHtcbiAgaWYoZXJyKSB7XG4gICAgdGhyb3cgZXJyXG4gIH1cbiAgbGV0IHBranNvbiA9IHBhdGguam9pbihhcHAuZ2V0UGF0aCgnaG9tZScpLCAnLnJhdHBhY2svcGFja2FnZS5qc29uJylcbiAgaWYoIWZzLmV4aXN0c1N5bmMocGtqc29uKSkge1xuICAgIHRvdWNoLnN5bmMocGtqc29uKVxuICAgIGZzLndyaXRlRmlsZVN5bmMocGtqc29uLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBuYW1lOiAncmF0cGFjay1sb2NhbCcsXG4gICAgICBkZXNjcmlwdGlvbjogJ3RoZXNlIG1vZHVsZXMgYXJlIGF2YWlsYWJsZSB0byBhbGwgc2NyaXB0cyBsYXVuY2hlZCBieSByYXRwYWNrJ1xuICAgIH0pKSAgXG4gIH1cbiAgLy8gYW1vbmcgb3RoZXIgdGhpbmdzLCB0aGlzIG1ha2VzIGxvYWRlcnMgZGVmaW5lZCBpbiBwcmFnbWFzIHRvIHdvcmsgXG4gIHJlcXVpcmUoJ21vZHVsZScpLmdsb2JhbFBhdGhzLnB1c2gocGF0aC5qb2luKGFwcC5nZXRQYXRoKCdob21lJyksICcucmF0cGFjay9ub2RlX21vZHVsZXMnKSlcbiAgXG59KVxuXG5mdW5jdGlvbiB0aW1lcyhuLCBmbikge1xuICBsZXQgYXJyID0gW11cbiAgZm9yKGxldCBpPSAwOyBpPCBuOyBpKyspIHtcbiAgICBhcnIucHVzaChmbihpKSlcbiAgfVxuICByZXR1cm4gYXJyXG59XG5cbmNzcy5nbG9iYWwoJ2h0bWwsIGJvZHksICNyb290JywgeyBwb3NpdGlvbjogJ3JlbGF0aXZlJywgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnMTAwJScsIGRpc3BsYXk6ICdibG9jaycsIGJhY2tncm91bmRDb2xvcjogeWVsbG93IH0pXG5cbmNvbnN0IExvZ28gPSAoKSA9PiA8ZGl2IGNzcz17eyB3aWR0aDogMTAwLCBoZWlnaHQ6IDEwMCwgcG9zaXRpb246ICdhYnNvbHV0ZScsIGJvdHRvbTogMCwgcmlnaHQ6IDAsIFtwcmVzZXRzLlBoYWJsZXRdOiB7IHdpZHRoOiAyMDAsIGhlaWdodDogMjAwIH0gfX0+XG4gIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNjMwIDYzMFwiID5cbiAgICA8cGF0aCBkPVwibTQyMy4yIDQ5Mi4xOWMxMi42OSAyMC43MiAyOS4yIDM1Ljk1IDU4LjQgMzUuOTUgMjQuNTMgMCA0MC4yLTEyLjI2IDQwLjItMjkuMiAwLTIwLjMtMTYuMS0yNy40OS00My4xLTM5LjNsLTE0LjgtNi4zNWMtNDIuNzItMTguMi03MS4xLTQxLTcxLjEtODkuMiAwLTQ0LjQgMzMuODMtNzguMiA4Ni43LTc4LjIgMzcuNjQgMCA2NC43IDEzLjEgODQuMiA0Ny40bC00Ni4xIDI5LjZjLTEwLjE1LTE4LjItMjEuMS0yNS4zNy0zOC4xLTI1LjM3LTE3LjM0IDAtMjguMzMgMTEtMjguMzMgMjUuMzcgMCAxNy43NiAxMSAyNC45NSAzNi40IDM1Ljk1bDE0LjggNi4zNGM1MC4zIDIxLjU3IDc4LjcgNDMuNTYgNzguNyA5MyAwIDUzLjMtNDEuODcgODIuNS05OC4xIDgyLjUtNTQuOTggMC05MC41LTI2LjItMTA3Ljg4LTYwLjU0em0tMjA5LjEzIDUuMTNjOS4zIDE2LjUgMTcuNzYgMzAuNDUgMzguMSAzMC40NSAxOS40NSAwIDMxLjcyLTcuNjEgMzEuNzItMzcuMnYtMjAxLjNoNTkuMnYyMDIuMWMwIDYxLjMtMzUuOTQgODkuMi04OC40IDg5LjItNDcuNCAwLTc0Ljg1LTI0LjUzLTg4LjgxLTU0LjA3NXpcIiAvPlxuICA8L3N2Zz5cbjwvZGl2PlxuXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0ZSA9IHtcbiAgICB0aWNrOiAwLFxuICAgIGZpbGVwYXRoOiB1bmRlZmluZWQsXG4gICAgd2VicGFja0NvbXBpbGVyOiBudWxsLFxuICAgIHdlYnBhY2tTZXJ2ZXI6IG51bGwsXG4gICAgcmVjZW50bHk6IFtdLFxuICAgIGVycm9yczogW10sXG4gICAgcG9ydDogMCxcbiAgICBydW5uaW5nOiBmYWxzZVxuICB9XG4gIG9uT3BlbkZpbGUgPSAoZSwgZmlsZXBhdGgpID0+IHtcbiAgICB0aGlzLmxvYWRGaWxlKGZpbGVwYXRoKVxuICB9XG4gIHJlZnJlc2hSZWNlbnRMaXN0KGNiKSB7XG4gICAgZGIuZmluZCh7IF9pZDogJ3JlY2VudGx5JyB9LCAoZXJyLCBkb2NzKSA9PiB7XG4gICAgICBpZihlcnIpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgZXJyb3JzOiBbIC4uLnRoaXMuc3RhdGUuZXJyb3JzLCBlcnIgXVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gXG4gICAgICB9XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgcmVjZW50bHk6IGRvY3NbMF0uZmlsZXNcbiAgICAgIH0pXG4gICAgICBpZihjYikgY2IoKVxuICAgIH0pXG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgYXBwLm9uKCdvcGVuLWZpbGUnLCB0aGlzLm9uT3BlbkZpbGUpXG4gICAgdGhpcy5yZWZyZXNoUmVjZW50TGlzdCgoKSA9PiB7XG4gICAgICBpZih3aW5kb3cubG9jYXRpb24uc2VhcmNoKSB7XG4gICAgICAgIGxldCBmaWxlcGF0aCA9IHFzLnBhcnNlKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc2xpY2UoMSkpLnN0YXJ0c1dpdGhcbiAgICAgICAgZmlsZXBhdGggJiYgdGhpcy5sb2FkRmlsZShmaWxlcGF0aClcbiAgICAgIH1cbiAgICB9KSAgIFxuICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgdGljazogKHRoaXMuc3RhdGUudGljayArIDEpICUgNCBcbiAgICAgIH0pICAgICAgXG4gICAgfSwgNDAwKVxuIFxuICB9XG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbClcbiAgICB0aGlzLmludGVydmFsID0gbnVsbCAgICBcblxuICAgIGlmKHRoaXMuc3RhdGUud2VicGFja1NlcnZlcikge1xuICAgICAgdGhpcy5zdGF0ZS53ZWJwYWNrU2VydmVyLmNsb3NlKCkgIFxuICAgIH0gICBcbiAgICBpZih0aGlzLndhdGNoZXIpIHtcbiAgICAgIHRoaXMud2F0Y2hlci5jbG9zZSgpXG4gICAgICB0aGlzLndhdGNoZXIgPSBudWxsXG4gICAgfSBcbiAgICBhcHAucmVtb3ZlRXZlbnRMaXN0ZW5lcignb3Blbi1maWxlJywgdGhpcy5vbk9wZW5GaWxlKVxuICB9XG4gIF9sb2FkRmlsZShmaWxlcGF0aCl7XG4gICAgZnMucmVhZEZpbGUoZmlsZXBhdGgsICd1dGY4JywgKGVyciwgc3JjKSA9PiB7ICAgICAgXG4gICAgICBpZihlcnIpIHRocm93IGVyclxuICAgICAgbGV0IG9wdGlvbnMgPSBwcmFnbWFzKHNyYylcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyAuLi53ZWJwYWNraWZ5KGZpbGVwYXRoLCBvcHRpb25zKSwgZmlsZXBhdGgsIHJ1bm5pbmc6IHRydWUsIHByYWdtYXM6IG9wdGlvbnMgfSlcblxuICAgICAgLy8gc2ltdWx0YW5lb3VzbHkgc3RhcnQgd2F0Y2hpbmcgdGhlIGVudHJ5IGZpbGUgXG4gICAgICB0aGlzLndhdGNoZXIgPSBmcy53YXRjaChmaWxlcGF0aCwgZSA9PiB7XG4gICAgICAgIGlmKGUgPT09ICdyZW5hbWUnKSB7XG4gICAgICAgICAgLy8gPz8/XG4gICAgICAgICAgcmV0dXJuICAgICAgICAgIFxuICAgICAgICB9ICAgICAgICBcbiAgICAgICAgLy8gaWYgYW55IG9mIHRoZSBwcmFnbWFzIGNoYW5nZSwgcmVkbyB0aGlzIHNoaW5kaWcgXG4gICAgICAgIGZzLnJlYWRGaWxlKGZpbGVwYXRoLCAndXRmOCcsIChlcnIsIHNyYykgPT4ge1xuICAgICAgICAgIGxldCBvcHRpb25zID0gcHJhZ21hcyhzcmMpXG4gICAgICAgICAgaWYoSlNPTi5zdHJpbmdpZnkob3B0aW9ucykgIT09IEpTT04uc3RyaW5naWZ5KHRoaXMuc3RhdGUucHJhZ21hcykpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZEZpbGUoZmlsZXBhdGgpXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHRvZG8gLSBwcmV2ZW50IGRvdWJsZSByZWFkIFxuICAgICAgICB9KVxuXG4gICAgICB9KVxuICAgIH0pICAgIFxuICB9XG4gIGxvYWRGaWxlKGZpbGVwYXRoKSB7XG5cbiAgICBkYi51cGRhdGUoeyBfaWQ6ICdyZWNlbnRseScgfSwgeyBfaWQ6ICdyZWNlbnRseScsIGZpbGVzOiBbIHsgcGF0aDogZmlsZXBhdGggfSwgLi4udGhpcy5zdGF0ZS5yZWNlbnRseS5maWx0ZXIoeCA9PiB4LnBhdGggIT09IGZpbGVwYXRoKSBdLnNsaWNlKDAsIDEwKSB9LCB7fSwgZXJyID0+IHtcbiAgICAgIGlmKGVycikge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBlcnJvcnM6IFsgLi4udGhpcy5zdGF0ZS5lcnJvcnMsIGVyciBdXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiAgICAgICAgIFxuICAgICAgfSBcbiAgICAgIHRoaXMucmVmcmVzaFJlY2VudExpc3QoKSAgICAgICAgICAgXG4gICAgfSlcbiAgICBpZih0aGlzLndhdGNoZXIpIHtcbiAgICAgIHRoaXMud2F0Y2hlci5jbG9zZSgpXG4gICAgICB0aGlzLndhdGNoZXIgPSBudWxsXG4gICAgfVxuICAgIFxuICAgIGlmKHRoaXMuc3RhdGUud2VicGFja1NlcnZlcikge1xuICAgICAgdGhpcy5zdGF0ZS53ZWJwYWNrU2VydmVyLmNsb3NlKClcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLl9sb2FkRmlsZShmaWxlcGF0aClcbiAgICAgIH0sIDUwMCkgICAgICBcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLl9sb2FkRmlsZShmaWxlcGF0aClcbiAgICB9XG4gICAgICAgICAgICBcbiAgfVxuICBvbkRyb3AgPSBlID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgbGV0IGZpbGVwYXRoID0gZS5uYXRpdmVFdmVudC5kYXRhVHJhbnNmZXIuZmlsZXNbMF0ucGF0aFxuICAgIHRoaXMubG9hZEZpbGUoZmlsZXBhdGgpXG4gIH1cbiAgY2xlYXJSZWNlbnRMaXN0KCkge1xuICAgIGRiLnVwZGF0ZSh7IF9pZDogJ3JlY2VudGx5JyB9LCB7IF9pZDogJ3JlY2VudGx5JywgZmlsZXM6IFtdIH0sICgpID0+IHtcbiAgICAgIHRoaXMucmVmcmVzaFJlY2VudExpc3QoKVxuICAgIH0pXG4gIH1cbiAgXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gPGRpdiBcbiAgICAgIGNzcz17eyB3aWR0aDogJzEwMCUnLCBoZWlnaHQ6ICcxMDAlJywgZm9udEZhbWlseTogJ2hlbHZldGljYScgfX0gXG4gICAgICBvbkRyYWdPdmVyPXtlID0+IGUucHJldmVudERlZmF1bHQoKX0gLy8gY2hyb21lIGJ1ZyBcbiAgICAgIG9uRHJvcD17dGhpcy5vbkRyb3B9PiAgICAgIFxuICAgICAgICBcbiAgICAgIDxkaXYgY3NzPXt7IGZvbnRXZWlnaHQ6ICdib2xkZXInLCBmb250U2l6ZTogMzIsIHBhZGRpbmc6IDIwLCBbcHJlc2V0cy5QaGFibGV0XTogeyBmb250U2l6ZTogNjQgfSB9fT5cbiAgICAgIHsgdGhpcy5zdGF0ZS5ydW5uaW5nID8gXG4gICAgICAgIGAke3BhdGguYmFzZW5hbWUodGhpcy5zdGF0ZS5maWxlcGF0aCl9IHJ1bm5pbmcgYXQgXG4gICAgICAgIGxvY2FsaG9zdDoke3RoaXMuc3RhdGUucG9ydH0ke3RpbWVzKHRoaXMuc3RhdGUudGljaywgKCkgPT4gJy4nKS5qb2luKCcnKX1gXG4gICAgICAgIDogJ0Ryb3AgYSAuanMgZmlsZSBoZXJlIHRvIGdldCBzdGFydGVkICd9XG4gICAgICAgIFxuICAgICAgXG4gICAgICA8L2Rpdj4gXG4gICAgICB7IHRoaXMuc3RhdGUucmVjZW50bHkubGVuZ3RoID4gMCAmJiA8ZGl2IGNzcz17eyBwYWRkaW5nOiAyMCB9fT5cbiAgICAgICAgPGgxPnByZXZpb3VzbHkuLi48L2gxPlxuICAgICAgICB7dGhpcy5zdGF0ZS5yZWNlbnRseS5tYXAoeCA9PiA8ZGl2IGtleT17eC5wYXRofSBvbkNsaWNrPXsoKSA9PiB0aGlzLmxvYWRGaWxlKHgucGF0aCl9Pnt4LnBhdGh9PC9kaXY+KX1cbiAgICAgICAgPGg0IG9uQ2xpY2s9eygpID0+IHRoaXMuY2xlYXJSZWNlbnRMaXN0KCl9PmNsZWFyIGxpc3Q8L2g0PlxuICAgICAgPC9kaXY+fVxuICAgICAgXG4gICAgICA8TG9nby8+XG4gICAgICBcbiAgICA8L2Rpdj5cbiAgICBcbiAgfVxufVxuXG5mdW5jdGlvbiB3ZWJwYWNraWZ5KGZpbGVwYXRoLCBvcHRpb25zID0ge30pIHtcbiAgXG4gIGxldCB3ZWJwYWNrQ29tcGlsZXIgPSB3ZWJwYWNrKHtcbiAgICBkZXZ0b29sOiBvcHRpb25zLnByb2R1Y3Rpb24gPyBmYWxzZSA6IChvcHRpb25zLmRldnRvb2wgfHwgJ2NoZWFwLW1vZHVsZS1zb3VyY2UtbWFwJyksXG4gICAgZW50cnk6IFsgXG4gICAgICAoKG9wdGlvbnMucmVsb2FkICE9PSBmYWxzZSkgfHwgKG9wdGlvbnMucHJvZHVjdGlvbiAhPT0gdHJ1ZSkgKSA/IFxuICAgICAgICByZXF1aXJlLnJlc29sdmUoJ3JlYWN0LWRldi11dGlscy93ZWJwYWNrSG90RGV2Q2xpZW50LmpzJykgOiBcbiAgICAgICAgdW5kZWZpbmVkLCBcbiAgICAgIG9wdGlvbnMuc3RhdHMgPyByZXF1aXJlLnJlc29sdmUoJy4vc3RhdHMuanMnKSA6IHVuZGVmaW5lZCxcbiAgICAgIHJlcXVpcmUucmVzb2x2ZSgnLi9wb2x5ZmlsbHMnKSwgXG4gICAgICBvcHRpb25zLm9mZmxpbmUgPyByZXF1aXJlLnJlc29sdmUoJy4vb2ZmbGluZS1wbHVnaW4tcnVudGltZS5qcycpIDogdW5kZWZpbmVkLFxuICAgICAgZmlsZXBhdGggXG4gICAgXS5maWx0ZXIoeCA9PiAhIXgpLFxuICAgIG91dHB1dDoge1xuICAgICAgcGF0aDogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL3B1YmxpYycpLFxuICAgICAgcGF0aGluZm86IHRydWUsXG4gICAgICBmaWxlbmFtZTogJ2J1bmRsZS5qcydcbiAgICB9LFxuICAgIHBlcmZvcm1hbmNlOiB7XG4gICAgICBoaW50czogZmFsc2VcbiAgICB9LFxuICAgIG1vZHVsZToge1xuICAgICAgcnVsZXM6IFsgXG4gICAgICAgIC4uLihvcHRpb25zLnJ1bGVzIHx8IFtdKS5tYXAoKHsgbG9hZGVyLCBmaWxlcywgb3B0aW9ucyB9KSA9PiAoeyBsb2FkZXI6IHJlcXVpcmUucmVzb2x2ZShsb2FkZXIpLCBvcHRpb25zLCB0ZXN0OiBnbG9iMnJlZ2V4cChmaWxlcyB8fCAnKicpIH0pKSwgXG4gICAgICAgIHtcbiAgICAgICAgICBlbmZvcmNlOiAncHJlJyxcbiAgICAgICAgICB0ZXN0OiAvXFwuKGpzfGpzeCkkLyxcbiAgICAgICAgICBsb2FkZXI6IHJlcXVpcmUucmVzb2x2ZSgnZXNsaW50LWxvYWRlcicpLFxuICAgICAgICAgIGV4Y2x1ZGU6IC9ub2RlX21vZHVsZXMvLFxuICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIGNvbmZpZ0ZpbGU6IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi9yZXNvdXJjZXMvLmVzbGludHJjJylcbiAgICAgICAgICB9XG4gICAgICAgIH0sIFxuICAgICAgICB7XG4gICAgICAgICAgZXhjbHVkZTogW1xuICAgICAgICAgICAgL1xcLmh0bWwkLyxcbiAgICAgICAgICAgIC9cXC4oanN8anN4KSQvLFxuICAgICAgICAgICAgL1xcLmNzcyQvLFxuICAgICAgICAgICAgL1xcLmpzb24kLyxcbiAgICAgICAgICAgIC9cXC5zdmckL1xuICAgICAgICAgIF0sXG4gICAgICAgICAgbG9hZGVyOiByZXF1aXJlLnJlc29sdmUoJ3VybC1sb2FkZXInKSxcbiAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgbGltaXQ6IDEwMDAwLFxuICAgICAgICAgICAgbmFtZTogJ3N0YXRpYy9tZWRpYS9bbmFtZV0uW2hhc2g6OF0uW2V4dF0nXG4gICAgICAgICAgfVxuICAgICAgICB9LCBcbiAgICAgICAge1xuICAgICAgICAgIHRlc3Q6IC9cXC5qcyQvLFxuICAgICAgICAgIGV4Y2x1ZGU6IC9ub2RlX21vZHVsZXMvLFxuICAgICAgICAgIGxvYWRlcjogcmVxdWlyZS5yZXNvbHZlKCdiYWJlbC1sb2FkZXInKSxcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAncHJlc2V0cyc6IFsgXG4gICAgICAgICAgICAgIFsgcmVxdWlyZSgnYmFiZWwtcHJlc2V0LWVudicpLCB7IFxuICAgICAgICAgICAgICAgICd0YXJnZXRzJzoge1xuICAgICAgICAgICAgICAgICAgJ2Jyb3dzZXJzJzogWyAnbGFzdCAyIHZlcnNpb25zJywgJ3NhZmFyaSA+PSA3JyBdXG4gICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAgbW9kdWxlczogZmFsc2UgXG4gICAgICAgICAgICAgIH0gXSwgXG4gICAgICAgICAgICAgIHJlcXVpcmUoJ2JhYmVsLXByZXNldC1zdGFnZS0wJyksIFxuICAgICAgICAgICAgICByZXF1aXJlKCdiYWJlbC1wcmVzZXQtcmVhY3QnKSwgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAuLi4ob3B0aW9ucy5iYWJlbCB8fCB7fSkucHJlc2V0cyB8fCBbXVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICdwbHVnaW5zJzogW1xuICAgICAgICAgICAgICBbIHJlcXVpcmUucmVzb2x2ZSgnYmFiZWwtcGx1Z2luLXRyYW5zZm9ybS1ydW50aW1lJyksIHtcbiAgICAgICAgICAgICAgICBoZWxwZXJzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBwb2x5ZmlsbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgcmVnZW5lcmF0b3I6IHRydWVcbiAgICAgICAgICAgICAgICAvLyBSZXNvbHZlIHRoZSBCYWJlbCBydW50aW1lIHJlbGF0aXZlIHRvIHRoZSBjb25maWcuXG4gICAgICAgICAgICAgICAgLy8gbW9kdWxlTmFtZTogcGF0aC5kaXJuYW1lKHJlcXVpcmUucmVzb2x2ZSgnYmFiZWwtcnVudGltZS9wYWNrYWdlJykpXG4gICAgICAgICAgICAgIH0gXSxcbiAgICAgICAgICAgICAgb3B0aW9ucy5qc3ggPyBbIHJlcXVpcmUoJ2JhYmVsLXBsdWdpbi10cmFuc2Zvcm0tcmVhY3QtanN4JyksXG4gICAgICAgICAgICAgICAgeyAncHJhZ21hJzogb3B0aW9ucy5qc3ggfSBdIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICByZXF1aXJlKCdiYWJlbC1wbHVnaW4tdHJhbnNmb3JtLWRlY29yYXRvcnMtbGVnYWN5JykuZGVmYXVsdCxcbiAgICAgICAgICAgICAgcmVxdWlyZSgnYmFiZWwtcGx1Z2luLXRyYW5zZm9ybS1yZWFjdC1yZXF1aXJlJykuZGVmYXVsdCxcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIC4uLihvcHRpb25zLmJhYmVsIHx8IHt9KS5wbHVnaW5zIHx8IFtdXG4gICAgICAgICAgICBdLmZpbHRlcih4ID0+ICEheCksXG4gICAgICAgICAgICBjYWNoZURpcmVjdG9yeTogZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgIH0sIFxuICAgICAgICB7XG4gICAgICAgICAgdGVzdDogL1xcLmNzcyQvLFxuICAgICAgICAgIHVzZTogW1xuICAgICAgICAgICAgcmVxdWlyZS5yZXNvbHZlKCdzdHlsZS1sb2FkZXInKSwgXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxvYWRlcjogcmVxdWlyZS5yZXNvbHZlKCdjc3MtbG9hZGVyJyksXG4gICAgICAgICAgICAgIG9wdGlvbnM6IHsgaW1wb3J0TG9hZGVyczogMSB9IFxuICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICByZXF1aXJlLnJlc29sdmUoJ3Bvc3Rjc3MtbG9hZGVyJykgIC8vIG9wdGlvbnMgaW4gdGhlIHBsdWdpbnMgc2VjdGlvbiBiZWxvdyAgICAgICAgICAgICBcbiAgICAgICAgICBdXG4gICAgICAgIH0sIFxuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgdGVzdDogL1xcLmpzb24kLyxcbiAgICAgICAgLy8gICBsb2FkZXI6IHJlcXVpcmUucmVzb2x2ZSgnanNvbi1sb2FkZXInKVxuICAgICAgICAvLyB9LFxuICAgICAgICAge1xuICAgICAgICAgIHRlc3Q6IC9cXC5zdmckLyxcbiAgICAgICAgICBsb2FkZXI6IHJlcXVpcmUucmVzb2x2ZSgnZmlsZS1sb2FkZXInKSxcbiAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgbmFtZTogJ3N0YXRpYy9tZWRpYS9bbmFtZV0uW2hhc2g6OF0uW2V4dF0nXG4gICAgICAgICAgfVxuICAgICAgICB9IFxuICAgICAgXVxuICAgIH0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IG9wdGlvbnMuYWxpYXMgfHwge30sXG4gICAgICBleHRlbnNpb25zOiBbICcuanMnLCAnLmpzb24nLCAnLmpzeCcgXSxcbiAgICAgIC8vIHRvZG8gLSB3aW5kb3dzXG4gICAgICBtb2R1bGVzOiBbICdub2RlX21vZHVsZXMnLCBwYXRoLmpvaW4oYXBwLmdldFBhdGgoJ2hvbWUnKSwgJy5yYXRwYWNrL25vZGVfbW9kdWxlcycpLCAgcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL25vZGVfbW9kdWxlcycpIF1cbiAgICB9LFxuICAgIHBsdWdpbnM6IFtcbiAgICAgIG5ldyB3ZWJwYWNrLkRlZmluZVBsdWdpbih7XG4gICAgICAgICdwcm9jZXNzLmVudi5OT0RFX0VOVic6IEpTT04uc3RyaW5naWZ5KChvcHRpb25zLnByb2R1Y3Rpb24gJiYgJ3Byb2R1Y3Rpb24nKSB8fCBwcm9jZXNzLmVudi5OT0RFX0VOViB8fCAnZGV2ZWxvcG1lbnQnKSxcbiAgICAgICAgLi4uT2JqZWN0LmtleXMob3B0aW9ucy5kZWZpbmUgfHwge30pLnJlZHVjZSgobywga2V5KSA9PiAoeyAuLi5vLCBba2V5XTogSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5kZWZpbmVba2V5XSkgfSksIHt9KVxuICAgICAgfSksXG4gICAgICBvcHRpb25zLm9mZmxpbmUgPyBuZXcgT2ZmbGluZVBsdWdpbihvcHRpb25zLm9mZmxpbmUgPT09IHRydWUgPyB7fSA6IG9wdGlvbnMub2ZmbGluZSkgOiB1bmRlZmluZWQsXG4gICAgICBuZXcgd2VicGFjay5Qcm92aWRlUGx1Z2luKG9wdGlvbnMucHJvdmlkZSB8fCB7fSksXG4gICAgICBuZXcgd2VicGFjay5Mb2FkZXJPcHRpb25zUGx1Z2luKHtcbiAgICAgICAgdGVzdDogL1xcLmNzcyQvLFxuICAgICAgICBkZWJ1ZzogdHJ1ZSxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIHBvc3Rjc3M6IFtcbiAgICAgICAgICAgIGF1dG9wcmVmaXhlcih7XG4gICAgICAgICAgICAgIGJyb3dzZXJzOiBbXG4gICAgICAgICAgICAgICAgJz4xJScsXG4gICAgICAgICAgICAgICAgJ2xhc3QgNCB2ZXJzaW9ucycsXG4gICAgICAgICAgICAgICAgJ0ZpcmVmb3ggRVNSJyxcbiAgICAgICAgICAgICAgICAnbm90IGllIDwgOScgLy8gUmVhY3QgZG9lc24ndCBzdXBwb3J0IElFOCBhbnl3YXlcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgXS5maWx0ZXIoeCA9PiAhIXgpLFxuICAgIHN0YXRzOiAnZXJyb3JzLW9ubHknLFxuICAgIG5vZGU6IHtcbiAgICAgIGZzOiAnZW1wdHknLFxuICAgICAgbmV0OiAnZW1wdHknLFxuICAgICAgdGxzOiAnZW1wdHknXG4gICAgfVxuICB9KVxuICBcbiAgbGV0IHdlYnBhY2tTZXJ2ZXIgPSBuZXcgV2VicGFja0RldlNlcnZlcih3ZWJwYWNrQ29tcGlsZXIsIHtcbiAgICAvLyB0b2RvIC0gd2luZG93c1xuICAgIGNvbnRlbnRCYXNlOiBbIG9wdGlvbnMucHVibGljID8gcGF0aC5qb2luKHBhdGguZGlybmFtZShmaWxlcGF0aCksIG9wdGlvbnMucHVibGljKSA6ICcnLCBwYXRoLmpvaW4ocGF0aC5kaXJuYW1lKGZpbGVwYXRoKSwgJ3B1YmxpYycpLCBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vcHVibGljJykgXS5maWx0ZXIoeCA9PiAhIXgpLFxuICAgIGhpc3RvcnlBcGlGYWxsYmFjazogdHJ1ZSxcbiAgICBjb21wcmVzczogdHJ1ZSxcbiAgICBwcm94eTogb3B0aW9ucy5wcm94eSB8fCB7fSxcbiAgICAgICAgLy8gc2V0dXAoKVxuICAgICAgICAvLyBzdGF0aWNPcHRpb25zIFxuXG4gICAgcXVpZXQ6IHRydWUsICAgICAgXG4gICAgc3RhdHM6IHsgY29sb3JzOiBmYWxzZSB9ICBcbiAgfSlcbiAgICAvLyB0aGlzIGlzIHRvIHdvcmthcm91bmQgc29tZSB3ZWlyZCBidWcgd2hlcmUgd2VicGFjayBrZWVwcyB0aGUgZmlyc3QgbG9hZGVkIGZpbGUgXG4gICAgLy8gYWxzbyBtYWtlcyBpdCBsb29rIGNvb2wgaGFcbiAgbGV0IGggPSBoYXNoKGZpbGVwYXRoLCBmaWxlcGF0aC5sZW5ndGgpKyAnJ1xuICBsZXQgcG9ydCA9IG9wdGlvbnMucG9ydCB8fCAoMzAwMCArIHBhcnNlSW50KGguc3Vic3RyKGgubGVuZ3RoIC0gNCksIDEwKSlcbiAgd2VicGFja1NlcnZlci5saXN0ZW4ocG9ydClcbiAgb3BlbkJyb3dzZXIoJ2h0dHA6Ly9sb2NhbGhvc3Q6JyArIHBvcnQpXG4gIHJldHVybiB7IHdlYnBhY2tTZXJ2ZXIsIHdlYnBhY2tDb21waWxlciwgcG9ydCB9XG5cbn1cbiBcbnJlbmRlcig8QXBwLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JykpXG4iXX0=