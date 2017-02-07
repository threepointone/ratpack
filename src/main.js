// import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer'

// app: control application file.
// BrowserWindow: create native browser window.

import { app, BrowserWindow }  from 'electron'
import path from 'path'

import createMenu from './menu'

let isProd = path.basename(process.argv[0]).indexOf('ratpack') === 0

let startsWith = require('minimist')(process.argv.slice(1))._[ isProd ? 0 : 1]
let startedOnce = false
let mainWindow

app.on('open-file', (e, filepath) => {
  if(!mainWindow ) {
    startsWith = filepath
    if(!startedOnce) {
      return
    }
    createWindow()
    return
  }
})

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.


function createWindow() {
  // Create the browser window.
  // installExtension(REACT_DEVELOPER_TOOLS)
  //   .then((name) => console.log(`Added Extension:  ${name}`))
  //   .catch((err) => console.log('An error occurred: ', err))

  mainWindow = new BrowserWindow({ width: 800, height: 600, icon: path.join(__dirname, '../resources/icon.png'), backgroundColor: '#f7df1e', show: false })
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
  startedOnce = true
  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html${startsWith ? `?startsWith=${encodeURIComponent(startsWith)}` : ''}` )
  startsWith = undefined
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // creates native menu
  createMenu(mainWindow)

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
