// This method generates native application menu for ratpack,
// that provides option to open new file (in addition to drag-n-drop).
import { app, dialog, Menu } from 'electron'

function createMenu(mainWindow) {
  const menuTemplate = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New File',
          role: 'open',
          accelerator: 'CmdOrCtrl+O',
          click() {
            dialog.showOpenDialog(
              {
                properties: ['openFile'],
                filters: [{
                  name: 'JavaScript',
                  extensions: ['js']
                }]
              },
              (filepath) => {
                mainWindow.loadURL(`file://${__dirname}/index.html?startsWith=${encodeURIComponent(filepath)}` )
              }
            )
          }
        }
      ]
    }
  ]

  if (process.platform === 'darwin') {
    const appName = app.getName()
    menuTemplate.unshift({
      label: appName,
      submenu: [{role: 'quit'}]
    })
  }

  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)
}

export default createMenu
