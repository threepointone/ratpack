'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _electron = require('electron');

function createMenu(mainWindow) {
  var menuTemplate = [{
    label: 'File',
    submenu: [{
      label: 'New File',
      role: 'open',
      accelerator: 'CmdOrCtrl+O',
      click: function click() {
        _electron.dialog.showOpenDialog({
          properties: ['openFile'],
          filters: [{
            name: 'JavaScript',
            extensions: ['js']
          }]
        }, function (filepath) {
          mainWindow.loadURL('file://' + __dirname + '/index.html?startsWith=' + encodeURIComponent(filepath));
        });
      }
    }]
  }];

  if (process.platform === 'darwin') {
    var appName = _electron.app.getName();
    menuTemplate.unshift({
      label: appName,
      submenu: [{ role: 'quit' }]
    });
  }

  var menu = _electron.Menu.buildFromTemplate(menuTemplate);
  _electron.Menu.setApplicationMenu(menu);
} // This method generates native application menu for ratpack,
// that provides option to open new file (in addition to drag-n-drop).
exports.default = createMenu;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tZW51LmpzIl0sIm5hbWVzIjpbImNyZWF0ZU1lbnUiLCJtYWluV2luZG93IiwibWVudVRlbXBsYXRlIiwibGFiZWwiLCJzdWJtZW51Iiwicm9sZSIsImFjY2VsZXJhdG9yIiwiY2xpY2siLCJzaG93T3BlbkRpYWxvZyIsInByb3BlcnRpZXMiLCJmaWx0ZXJzIiwibmFtZSIsImV4dGVuc2lvbnMiLCJmaWxlcGF0aCIsImxvYWRVUkwiLCJfX2Rpcm5hbWUiLCJlbmNvZGVVUklDb21wb25lbnQiLCJwcm9jZXNzIiwicGxhdGZvcm0iLCJhcHBOYW1lIiwiZ2V0TmFtZSIsInVuc2hpZnQiLCJtZW51IiwiYnVpbGRGcm9tVGVtcGxhdGUiLCJzZXRBcHBsaWNhdGlvbk1lbnUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBOztBQUVBLFNBQVNBLFVBQVQsQ0FBb0JDLFVBQXBCLEVBQWdDO0FBQzlCLE1BQU1DLGVBQWUsQ0FDbkI7QUFDRUMsV0FBTyxNQURUO0FBRUVDLGFBQVMsQ0FDUDtBQUNFRCxhQUFPLFVBRFQ7QUFFRUUsWUFBTSxNQUZSO0FBR0VDLG1CQUFhLGFBSGY7QUFJRUMsV0FKRixtQkFJVTtBQUNOLHlCQUFPQyxjQUFQLENBQ0U7QUFDRUMsc0JBQVksQ0FBQyxVQUFELENBRGQ7QUFFRUMsbUJBQVMsQ0FBQztBQUNSQyxrQkFBTSxZQURFO0FBRVJDLHdCQUFZLENBQUMsSUFBRDtBQUZKLFdBQUQ7QUFGWCxTQURGLEVBUUUsVUFBQ0MsUUFBRCxFQUFjO0FBQ1paLHFCQUFXYSxPQUFYLGFBQTZCQyxTQUE3QiwrQkFBZ0VDLG1CQUFtQkgsUUFBbkIsQ0FBaEU7QUFDRCxTQVZIO0FBWUQ7QUFqQkgsS0FETztBQUZYLEdBRG1CLENBQXJCOztBQTJCQSxNQUFJSSxRQUFRQyxRQUFSLEtBQXFCLFFBQXpCLEVBQW1DO0FBQ2pDLFFBQU1DLFVBQVUsY0FBSUMsT0FBSixFQUFoQjtBQUNBbEIsaUJBQWFtQixPQUFiLENBQXFCO0FBQ25CbEIsYUFBT2dCLE9BRFk7QUFFbkJmLGVBQVMsQ0FBQyxFQUFDQyxNQUFNLE1BQVAsRUFBRDtBQUZVLEtBQXJCO0FBSUQ7O0FBRUQsTUFBTWlCLE9BQU8sZUFBS0MsaUJBQUwsQ0FBdUJyQixZQUF2QixDQUFiO0FBQ0EsaUJBQUtzQixrQkFBTCxDQUF3QkYsSUFBeEI7QUFDRCxDLENBMUNEO0FBQ0E7a0JBMkNldEIsVSIsImZpbGUiOiJtZW51LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhpcyBtZXRob2QgZ2VuZXJhdGVzIG5hdGl2ZSBhcHBsaWNhdGlvbiBtZW51IGZvciByYXRwYWNrLFxuLy8gdGhhdCBwcm92aWRlcyBvcHRpb24gdG8gb3BlbiBuZXcgZmlsZSAoaW4gYWRkaXRpb24gdG8gZHJhZy1uLWRyb3ApLlxuaW1wb3J0IHsgYXBwLCBkaWFsb2csIE1lbnUgfSBmcm9tICdlbGVjdHJvbidcblxuZnVuY3Rpb24gY3JlYXRlTWVudShtYWluV2luZG93KSB7XG4gIGNvbnN0IG1lbnVUZW1wbGF0ZSA9IFtcbiAgICB7XG4gICAgICBsYWJlbDogJ0ZpbGUnLFxuICAgICAgc3VibWVudTogW1xuICAgICAgICB7XG4gICAgICAgICAgbGFiZWw6ICdOZXcgRmlsZScsXG4gICAgICAgICAgcm9sZTogJ29wZW4nLFxuICAgICAgICAgIGFjY2VsZXJhdG9yOiAnQ21kT3JDdHJsK08nLFxuICAgICAgICAgIGNsaWNrKCkge1xuICAgICAgICAgICAgZGlhbG9nLnNob3dPcGVuRGlhbG9nKFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcHJvcGVydGllczogWydvcGVuRmlsZSddLFxuICAgICAgICAgICAgICAgIGZpbHRlcnM6IFt7XG4gICAgICAgICAgICAgICAgICBuYW1lOiAnSmF2YVNjcmlwdCcsXG4gICAgICAgICAgICAgICAgICBleHRlbnNpb25zOiBbJ2pzJ11cbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAoZmlsZXBhdGgpID0+IHtcbiAgICAgICAgICAgICAgICBtYWluV2luZG93LmxvYWRVUkwoYGZpbGU6Ly8ke19fZGlybmFtZX0vaW5kZXguaHRtbD9zdGFydHNXaXRoPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGZpbGVwYXRoKX1gIClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgXVxuXG4gIGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnZGFyd2luJykge1xuICAgIGNvbnN0IGFwcE5hbWUgPSBhcHAuZ2V0TmFtZSgpXG4gICAgbWVudVRlbXBsYXRlLnVuc2hpZnQoe1xuICAgICAgbGFiZWw6IGFwcE5hbWUsXG4gICAgICBzdWJtZW51OiBbe3JvbGU6ICdxdWl0J31dXG4gICAgfSlcbiAgfVxuXG4gIGNvbnN0IG1lbnUgPSBNZW51LmJ1aWxkRnJvbVRlbXBsYXRlKG1lbnVUZW1wbGF0ZSlcbiAgTWVudS5zZXRBcHBsaWNhdGlvbk1lbnUobWVudSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlTWVudVxuIl19