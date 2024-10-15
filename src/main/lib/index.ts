import { homedir } from 'os'
import { appDirectoryName } from '@shared/constants'
import childProcess from 'child_process'
import { join } from 'path'

export const getRootDir = () => {
  return `${homedir()}/${appDirectoryName}`
}

export const runFileSetup = async () => {
  try {
    const bat = childProcess.spawn(`cmd /K ${join(__dirname, '../../../resources/startUltra.bat')}`)
    bat.stdout.on('data', (data) => {
      return 'data is : ' + data.toString()
    })

    bat.stderr.on('data', (data) => {
      return 'error is : ' + data.toString()
    })

    bat.on('exit', (code) => {
      return `Child exited with code ${code}`
    })
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
