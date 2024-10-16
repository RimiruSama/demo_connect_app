import { ElectronAPI } from '@electron-toolkit/preload'
// import { GetNotes, ReadNote } from '@shared/types'

declare global {
  interface Window {
    // electron: ElectronAPI
    context: {
      locale: string
      // getNotes: GetNotes
      // readNote: ReadNote
      runFileSetup: () => void
      capureScreen: () => void
      captureScreenShot: () => void
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      screenShotCaptured: any
      getDataDeviceID: (deviceId: string) => void
    }
  }
}
