'use strict'
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const qr = require("qrcode")

let mainWindow;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  //createSplashWindow()
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  })
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'public', 'index.html'))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

ipcMain.handle('generate-qr-code', async (event, text) => {
  return new Promise((resolve, reject) => {
    qr.toDataURL(text, (err, imgData) => {
      if (err) {
        reject('Error occured')
        return
      }
      //console.log(imgData)
      resolve(imgData)
    })
  })
})

