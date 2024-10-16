import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

const dateFormatter = new Intl.DateTimeFormat(window.context.locale, {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'UTC'
})

export const formatDateFromMs = (ms: number) => dateFormatter.format(ms)

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(...args))
}

export function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])

  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

export function toQueryString(objParams: Object) {
  const str = []
  for (const p in objParams) {
    if (Object.prototype.hasOwnProperty.call(objParams, p) && objParams[p]) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      str.push(decodeURIComponent(`${encodeURIComponent(p)}=${encodeURIComponent(objParams[p])}`))
    }
  }

  return str.join('&')
}
