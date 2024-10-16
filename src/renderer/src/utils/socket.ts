import { io } from 'socket.io-client'

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'https://cloud.nodeverse.ai/'

export const SOCKET_CONFIG = {
  reconnection: true,
  reconnectionDelay: 5000,
  reconnectionDelayMax: 10000,
  reconnectionAttempts: 20
}

export const socket = io(URL, {
  extraHeaders: {
    Authorization: 'b23e042f9808454176b06d702245d62b56ab9f'
  },
  ...SOCKET_CONFIG
})
