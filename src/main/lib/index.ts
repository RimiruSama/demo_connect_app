import { homedir } from 'os'
import { appDirectoryName } from '@shared/constants'
import childProcess from 'child_process'
import { join } from 'path'

export const getRootDir = () => {
  return `${homedir()}/${appDirectoryName}`
}

export const runFileSetup = async () => {
  try {
    let path = `cmd /K "${join(__dirname, '../../resources/startUltra.bat')}"`
    path = path.replace('app.asar', 'app.asar.unpacked')
    childProcess.exec(path, (error, stdout, stderr) => {
      if (error) {
        return `error: ${error.message}`
      }

      if (stderr) {
        return `stderr: ${stderr}`
        return
      }

      return `stdout:\n${stdout}`
    })
    // bat.stdout.on('data', (data) => {
    //   return 'data is : ' + data.toString()
    // })

    // bat.stderr.on('data', (data) => {
    //   return 'error is : ' + data.toString()
    // })

    // bat.on('exit', (code) => {
    //   return `Child exited with code ${code}`
    // })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return err.message
  }

  // const ls = childProcess.spawn('bash', ['./src/main/files/startUltra.bat'])

  // ls.stdout.on('data', (data) => {
  //   console.log(`stdout: ${data}`)
  // })

  // ls.stderr.on('data', (data) => {
  //   console.error(`stderr: ${data}`)
  // })

  // ls.on('close', (code) => {
  //   console.log(`child process exited with code ${code}`)
  // })
}

export const capureScreen = async () => {
  const { screen, desktopCapturer } = require('electron')

  const primaryDisplay = screen.getPrimaryDisplay()

  // getits size
  const { width, height } = primaryDisplay.size

  // Setup the options for the desktopCapturer
  const options = {
    types: ['screen' as const],
    thumbnailSize: { width, height }
  }

  // Get the source
  const source = await desktopCapturer.getSources(options)

  // Find the primary display's source
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const primarySource = source.find(({ display_id }) => display_id == primaryDisplay.id)

  // Get the image
  const image = primarySource?.thumbnail

  // return image data
  return image
}

export const getDataDeviceID = async (deviceId: string) => {
  const fs = require('fs')
  let path = join(__dirname, '../../resources/config.txt')
  path = path.replace('app.asar', 'app.asar.unpacked')

  const content = fs.readFileSync(path, 'utf8')
  if (content == '') {
    const writeInterface = fs.createWriteStream(path, {
      flags: 'a'
    })
    writeInterface.write(`${deviceId}`)
    writeInterface.end()
    return deviceId
  }
  return content
}

// export const getNotes: GetNotes = async () => {
//   const rootDir = getRootDir()

//   await ensureDir(rootDir)

//   const notesFileNames = await readdir(rootDir, {
//     encoding: fileEncoding,
//     withFileTypes: false
//   })

//   const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'))

//   return Promise.all(notes.map(getInfoFromFileName))
// }

// export const getInfoFromFileName = async (fileName: string): Promise<NoteInfo> => {
//   const fileStats = await stat(`${getRootDir()}/${fileName}`)

//   return {
//     title: fileName.replace(/\.md$/, ''),
//     lastEditTime: fileStats.mtimeMs
//   }
// }

// export const readNote: ReadNote = async (filename) => {
//   const rootDir = getRootDir()

//   return readFile(`${rootDir}/${filename}.md`, { encoding: fileEncoding })
// }
