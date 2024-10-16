import { useEffect, useRef, useState } from 'react'
import { dataURLtoFile } from './utils'
import axiosInstance from './utils/axios'
import { apiUrl } from './config/api'
// import { socket } from './utils/socket'
import { io } from 'socket.io-client'

const URL = 'https://cloud.nodeverse.ai/'

export const SOCKET_CONFIG = {
  reconnection: true,
  reconnectionDelay: 5000,
  reconnectionDelayMax: 10000,
  reconnectionAttempts: 20
}

// const socket = io(URL, {
//   extraHeaders: {
//     Authorization: 'b23e042f9808454176b06d702245d62b56ab9f'
//   },
//   ...SOCKET_CONFIG
// })

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>(null)
  const [deviceId, setDeviceId] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const socketIo = useRef<any>(null)

  const handleSetup = async () => {
    const abc = await window.context.runFileSetup()
    setResult(abc)
  }

  const handleScreenshot = async () => {
    await window.context.captureScreenShot()

    window.context.screenShotCaptured(async (_event: Event, dataURL: string) => {
      const a = dataURLtoFile(dataURL, 'test.png')
      const formData = new FormData()
      formData.append('file', a)
      const res = await axiosInstance.post(apiUrl.uploadFile, formData)
      console.log(res)
    })
  }

  const handleConnect = async () => {
    socketIo.current = io(`${URL}`, {
      extraHeaders: {
        Authorization: 'b23e042f9808454176b06d702245d62b56ab9f'
      },
      ...SOCKET_CONFIG
    })

    const deviceIdStore = await window.context.getDataDeviceID(deviceId)

    socketIo.current.emit('private', { deviceId: deviceIdStore })
    socketIo.current.on('connect', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      socketIo.current.on('DEVICE_MANAGEMENT', async (data: any) => {
        if (data.action === 'OPEN_ULTRA_VIEW') {
          await window.context.runFileSetup()
        }
        if (data.action === 'SCREEN_SHOT') {
          console.log('SCREEN_SHOT')
        }
      })
    })
  }

  useEffect(() => {
    Promise.resolve(window.context.getDataDeviceID('')).then((res) => {
      console.log(res)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (res !== '') {
        handleConnect()
      }
    })
  }, [])

  return (
    <>
      <div className="w-full h-full flex items-center justify-center bg-gray-600/70 flex-col gap-5">
        <input
          className="text-black h-10 min-w-[60%]"
          placeholder="Enter deviceId ..."
          value={deviceId}
          onChange={(e) => setDeviceId(e.target.value)}
        />
        <div className="flex gap-5">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleConnect}>
            Connect
          </button>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-md"
            onClick={handleScreenshot}
          >
            Screenshot
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={handleSetup}>
            Run file setup
          </button>
        </div>
        {result}
      </div>
    </>
  )
}

export default App
