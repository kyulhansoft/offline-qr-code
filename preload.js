'use strict'
const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld('backendBridge', {
  sendData: async (text) => {
    return ipcRenderer.invoke('generate-qr-code', text)
  }
})
