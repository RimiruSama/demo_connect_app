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
    runFileSetup: () => ipcRenderer.invoke('runFileSetup')
  })
} catch (error) {
  console.error(error)
}
