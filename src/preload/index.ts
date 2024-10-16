import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('context', {
    // TODO
    locale: navigator.language,
    // getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke('getNotes', ...args),
    // readNote: (...args: Parameters<ReadNote>) => ipcRenderer.invoke('readNote', ...args)
    runFileSetup: () => ipcRenderer.invoke('runFileSetup'),
    capureScreen: () => ipcRenderer.invoke('capureScreen'),
    captureScreenShot: () => ipcRenderer.send('capture-screenshot'),
    screenShotCaptured: (calback) => {
      ipcRenderer.on('screenshot-captured', (event, screenShotURL) => calback(event, screenShotURL))
    },
    getDataDeviceID: (deviceId: string) => ipcRenderer.invoke('getDataDeviceID', deviceId)
  })
} catch (error) {
  console.error(error)
}
