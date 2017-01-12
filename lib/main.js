'use strict';

var _electron = require('electron');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer'

// app: control application file.
// BrowserWindow: create native browser window.

var isProd = _path2.default.basename(process.argv[0]).indexOf('ratpack') === 0;

var startsWith = require('minimist')(process.argv.slice(1))._[isProd ? 0 : 1];
var startedOnce = false;
var mainWindow = void 0;

_electron.app.on('open-file', function (e, filepath) {
  if (!mainWindow) {
    startsWith = filepath;
    if (!startedOnce) {
      return;
    }
    createWindow();
    return;
  }
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.


function createWindow() {
  // Create the browser window.
  // installExtension(REACT_DEVELOPER_TOOLS)
  //   .then((name) => console.log(`Added Extension:  ${name}`))
  //   .catch((err) => console.log('An error occurred: ', err))

  mainWindow = new _electron.BrowserWindow({ width: 800, height: 600, icon: _path2.default.join(__dirname, '../resources/icon.png'), backgroundColor: '#f7df1e', show: false });
  mainWindow.once('ready-to-show', function () {
    mainWindow.show();
  });
  startedOnce = true;
  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html' + (startsWith ? '?startsWith=' + encodeURIComponent(startsWith) : ''));
  startsWith = undefined;
  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
_electron.app.on('ready', createWindow);

// Quit when all windows are closed.
_electron.app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    _electron.app.quit();
  }
});

_electron.app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbImlzUHJvZCIsImJhc2VuYW1lIiwicHJvY2VzcyIsImFyZ3YiLCJpbmRleE9mIiwic3RhcnRzV2l0aCIsInJlcXVpcmUiLCJzbGljZSIsIl8iLCJzdGFydGVkT25jZSIsIm1haW5XaW5kb3ciLCJvbiIsImUiLCJmaWxlcGF0aCIsImNyZWF0ZVdpbmRvdyIsIndpZHRoIiwiaGVpZ2h0IiwiaWNvbiIsImpvaW4iLCJfX2Rpcm5hbWUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJzaG93Iiwib25jZSIsImxvYWRVUkwiLCJlbmNvZGVVUklDb21wb25lbnQiLCJ1bmRlZmluZWQiLCJ3ZWJDb250ZW50cyIsIm9wZW5EZXZUb29scyIsInBsYXRmb3JtIiwicXVpdCJdLCJtYXBwaW5ncyI6Ijs7QUFLQTs7QUFDQTs7Ozs7O0FBTkE7O0FBRUE7QUFDQTs7QUFLQSxJQUFJQSxTQUFTLGVBQUtDLFFBQUwsQ0FBY0MsUUFBUUMsSUFBUixDQUFhLENBQWIsQ0FBZCxFQUErQkMsT0FBL0IsQ0FBdUMsU0FBdkMsTUFBc0QsQ0FBbkU7O0FBRUEsSUFBSUMsYUFBYUMsUUFBUSxVQUFSLEVBQW9CSixRQUFRQyxJQUFSLENBQWFJLEtBQWIsQ0FBbUIsQ0FBbkIsQ0FBcEIsRUFBMkNDLENBQTNDLENBQThDUixTQUFTLENBQVQsR0FBYSxDQUEzRCxDQUFqQjtBQUNBLElBQUlTLGNBQWMsS0FBbEI7QUFDQSxJQUFJQyxtQkFBSjs7QUFFQSxjQUFJQyxFQUFKLENBQU8sV0FBUCxFQUFvQixVQUFDQyxDQUFELEVBQUlDLFFBQUosRUFBaUI7QUFDbkMsTUFBRyxDQUFDSCxVQUFKLEVBQWlCO0FBQ2ZMLGlCQUFhUSxRQUFiO0FBQ0EsUUFBRyxDQUFDSixXQUFKLEVBQWlCO0FBQ2Y7QUFDRDtBQUNESztBQUNBO0FBQ0Q7QUFDRixDQVREOztBQVdBO0FBQ0E7OztBQUdBLFNBQVNBLFlBQVQsR0FBd0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUFKLGVBQWEsNEJBQWtCLEVBQUVLLE9BQU8sR0FBVCxFQUFjQyxRQUFRLEdBQXRCLEVBQTJCQyxNQUFNLGVBQUtDLElBQUwsQ0FBVUMsU0FBVixFQUFxQix1QkFBckIsQ0FBakMsRUFBZ0ZDLGlCQUFpQixTQUFqRyxFQUE0R0MsTUFBTSxLQUFsSCxFQUFsQixDQUFiO0FBQ0FYLGFBQVdZLElBQVgsQ0FBZ0IsZUFBaEIsRUFBaUMsWUFBTTtBQUNyQ1osZUFBV1csSUFBWDtBQUNELEdBRkQ7QUFHQVosZ0JBQWMsSUFBZDtBQUNBO0FBQ0FDLGFBQVdhLE9BQVgsYUFBNkJKLFNBQTdCLG9CQUFvRGQsOEJBQTRCbUIsbUJBQW1CbkIsVUFBbkIsQ0FBNUIsR0FBK0QsRUFBbkg7QUFDQUEsZUFBYW9CLFNBQWI7QUFDQTtBQUNBZixhQUFXZ0IsV0FBWCxDQUF1QkMsWUFBdkI7O0FBRUE7QUFDQWpCLGFBQVdDLEVBQVgsQ0FBYyxRQUFkLEVBQXdCLFlBQVk7QUFDbEM7QUFDQTtBQUNBO0FBQ0FELGlCQUFhLElBQWI7QUFDRCxHQUxEO0FBTUQ7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsY0FBSUMsRUFBSixDQUFPLE9BQVAsRUFBZ0JHLFlBQWhCOztBQUVBO0FBQ0EsY0FBSUgsRUFBSixDQUFPLG1CQUFQLEVBQTRCLFlBQVk7QUFDdEM7QUFDQTtBQUNBLE1BQUlULFFBQVEwQixRQUFSLEtBQXFCLFFBQXpCLEVBQW1DO0FBQ2pDLGtCQUFJQyxJQUFKO0FBQ0Q7QUFDRixDQU5EOztBQVNBLGNBQUlsQixFQUFKLENBQU8sVUFBUCxFQUFtQixZQUFZO0FBQzdCO0FBQ0E7QUFDQSxNQUFJRCxlQUFlLElBQW5CLEVBQXlCO0FBQ3ZCSTtBQUNEO0FBQ0YsQ0FORDs7QUFRQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgaW5zdGFsbEV4dGVuc2lvbiwgeyBSRUFDVF9ERVZFTE9QRVJfVE9PTFMgfSBmcm9tICdlbGVjdHJvbi1kZXZ0b29scy1pbnN0YWxsZXInXG5cbi8vIGFwcDogY29udHJvbCBhcHBsaWNhdGlvbiBmaWxlLlxuLy8gQnJvd3NlcldpbmRvdzogY3JlYXRlIG5hdGl2ZSBicm93c2VyIHdpbmRvdy5cblxuaW1wb3J0IHsgYXBwLCBCcm93c2VyV2luZG93IH0gIGZyb20gJ2VsZWN0cm9uJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcblxubGV0IGlzUHJvZCA9IHBhdGguYmFzZW5hbWUocHJvY2Vzcy5hcmd2WzBdKS5pbmRleE9mKCdyYXRwYWNrJykgPT09IDBcblxubGV0IHN0YXJ0c1dpdGggPSByZXF1aXJlKCdtaW5pbWlzdCcpKHByb2Nlc3MuYXJndi5zbGljZSgxKSkuX1sgaXNQcm9kID8gMCA6IDFdXG5sZXQgc3RhcnRlZE9uY2UgPSBmYWxzZVxubGV0IG1haW5XaW5kb3dcblxuYXBwLm9uKCdvcGVuLWZpbGUnLCAoZSwgZmlsZXBhdGgpID0+IHtcbiAgaWYoIW1haW5XaW5kb3cgKSB7XG4gICAgc3RhcnRzV2l0aCA9IGZpbGVwYXRoXG4gICAgaWYoIXN0YXJ0ZWRPbmNlKSB7ICAgICAgXG4gICAgICByZXR1cm5cbiAgICB9ICAgIFxuICAgIGNyZWF0ZVdpbmRvdygpICAgIFxuICAgIHJldHVybiBcbiAgfSAgICBcbn0pXG4gXG4vLyBLZWVwIGEgZ2xvYmFsIHJlZmVyZW5jZSBvZiB0aGUgd2luZG93IG9iamVjdCwgaWYgeW91IGRvbid0LCB0aGUgd2luZG93IHdpbGxcbi8vIGJlIGNsb3NlZCBhdXRvbWF0aWNhbGx5IHdoZW4gdGhlIEphdmFTY3JpcHQgb2JqZWN0IGlzIGdhcmJhZ2UgY29sbGVjdGVkLlxuXG5cbmZ1bmN0aW9uIGNyZWF0ZVdpbmRvdygpIHtcbiAgLy8gQ3JlYXRlIHRoZSBicm93c2VyIHdpbmRvdy5cbiAgLy8gaW5zdGFsbEV4dGVuc2lvbihSRUFDVF9ERVZFTE9QRVJfVE9PTFMpXG4gIC8vICAgLnRoZW4oKG5hbWUpID0+IGNvbnNvbGUubG9nKGBBZGRlZCBFeHRlbnNpb246ICAke25hbWV9YCkpXG4gIC8vICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUubG9nKCdBbiBlcnJvciBvY2N1cnJlZDogJywgZXJyKSlcblxuICBtYWluV2luZG93ID0gbmV3IEJyb3dzZXJXaW5kb3coeyB3aWR0aDogODAwLCBoZWlnaHQ6IDYwMCwgaWNvbjogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL3Jlc291cmNlcy9pY29uLnBuZycpLCBiYWNrZ3JvdW5kQ29sb3I6ICcjZjdkZjFlJywgc2hvdzogZmFsc2UgfSlcbiAgbWFpbldpbmRvdy5vbmNlKCdyZWFkeS10by1zaG93JywgKCkgPT4ge1xuICAgIG1haW5XaW5kb3cuc2hvdygpXG4gIH0pXG4gIHN0YXJ0ZWRPbmNlID0gdHJ1ZVxuICAvLyBhbmQgbG9hZCB0aGUgaW5kZXguaHRtbCBvZiB0aGUgYXBwLlxuICBtYWluV2luZG93LmxvYWRVUkwoYGZpbGU6Ly8ke19fZGlybmFtZX0vaW5kZXguaHRtbCR7c3RhcnRzV2l0aCA/IGA/c3RhcnRzV2l0aD0ke2VuY29kZVVSSUNvbXBvbmVudChzdGFydHNXaXRoKX1gIDogJyd9YCApXG4gIHN0YXJ0c1dpdGggPSB1bmRlZmluZWRcbiAgLy8gT3BlbiB0aGUgRGV2VG9vbHMuXG4gIG1haW5XaW5kb3cud2ViQ29udGVudHMub3BlbkRldlRvb2xzKClcblxuICAvLyBFbWl0dGVkIHdoZW4gdGhlIHdpbmRvdyBpcyBjbG9zZWQuXG4gIG1haW5XaW5kb3cub24oJ2Nsb3NlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAvLyBEZXJlZmVyZW5jZSB0aGUgd2luZG93IG9iamVjdCwgdXN1YWxseSB5b3Ugd291bGQgc3RvcmUgd2luZG93c1xuICAgIC8vIGluIGFuIGFycmF5IGlmIHlvdXIgYXBwIHN1cHBvcnRzIG11bHRpIHdpbmRvd3MsIHRoaXMgaXMgdGhlIHRpbWVcbiAgICAvLyB3aGVuIHlvdSBzaG91bGQgZGVsZXRlIHRoZSBjb3JyZXNwb25kaW5nIGVsZW1lbnQuXG4gICAgbWFpbldpbmRvdyA9IG51bGxcbiAgfSlcbn1cblxuLy8gVGhpcyBtZXRob2Qgd2lsbCBiZSBjYWxsZWQgd2hlbiBFbGVjdHJvbiBoYXMgZmluaXNoZWRcbi8vIGluaXRpYWxpemF0aW9uIGFuZCBpcyByZWFkeSB0byBjcmVhdGUgYnJvd3NlciB3aW5kb3dzLlxuLy8gU29tZSBBUElzIGNhbiBvbmx5IGJlIHVzZWQgYWZ0ZXIgdGhpcyBldmVudCBvY2N1cnMuXG5hcHAub24oJ3JlYWR5JywgY3JlYXRlV2luZG93KVxuXG4vLyBRdWl0IHdoZW4gYWxsIHdpbmRvd3MgYXJlIGNsb3NlZC5cbmFwcC5vbignd2luZG93LWFsbC1jbG9zZWQnLCBmdW5jdGlvbiAoKSB7XG4gIC8vIE9uIE9TIFggaXQgaXMgY29tbW9uIGZvciBhcHBsaWNhdGlvbnMgYW5kIHRoZWlyIG1lbnUgYmFyXG4gIC8vIHRvIHN0YXkgYWN0aXZlIHVudGlsIHRoZSB1c2VyIHF1aXRzIGV4cGxpY2l0bHkgd2l0aCBDbWQgKyBRXG4gIGlmIChwcm9jZXNzLnBsYXRmb3JtICE9PSAnZGFyd2luJykge1xuICAgIGFwcC5xdWl0KClcbiAgfVxufSlcblxuXG5hcHAub24oJ2FjdGl2YXRlJywgZnVuY3Rpb24gKCkge1xuICAvLyBPbiBPUyBYIGl0J3MgY29tbW9uIHRvIHJlLWNyZWF0ZSBhIHdpbmRvdyBpbiB0aGUgYXBwIHdoZW4gdGhlXG4gIC8vIGRvY2sgaWNvbiBpcyBjbGlja2VkIGFuZCB0aGVyZSBhcmUgbm8gb3RoZXIgd2luZG93cyBvcGVuLlxuICBpZiAobWFpbldpbmRvdyA9PT0gbnVsbCkge1xuICAgIGNyZWF0ZVdpbmRvdygpXG4gIH1cbn0pXG5cbi8vIEluIHRoaXMgZmlsZSB5b3UgY2FuIGluY2x1ZGUgdGhlIHJlc3Qgb2YgeW91ciBhcHAncyBzcGVjaWZpYyBtYWluIHByb2Nlc3Ncbi8vIGNvZGUuIFlvdSBjYW4gYWxzbyBwdXQgdGhlbSBpbiBzZXBhcmF0ZSBmaWxlcyBhbmQgcmVxdWlyZSB0aGVtIGhlcmUuXG4iXX0=