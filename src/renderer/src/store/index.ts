// import { NoteInfo } from '@shared/models'
// import { atom } from 'jotai'
// import { unwrap } from 'jotai/utils'

// const loadNotes = async () => {
//   const notes = await window.context.getNotes()

//   // sort theme by most recently edited
//   return notes.sort((a, b) => b.lastEditTime - a.lastEditTime)
// }

// const notesAtomasync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes())

// export const notesAtom = unwrap(notesAtomasync, (prev) => prev)

// export const selectedNoteIndexAtom = atom<number | null>(null)

// const selectedNoteAtomAsync = atom(async (get) => {
//   const notes = get(notesAtom)
//   const selectedNoteIndex = get(selectedNoteIndexAtom)

//   if (selectedNoteIndex == null || !notes) return null

//   const selectedNote = notes[selectedNoteIndex]

//   const noteContent = await window.context.readNote(selectedNote.title)

//   return {
//     ...selectedNote,
//     content: noteContent
//   }
// })

// export const selectedNoteAtom = unwrap(
//   selectedNoteAtomAsync,
//   (prev) =>
//     prev ?? {
//       title: '',
//       content: '',
//       lastEditTime: Date.now()
//     }
// )

// export const createEmptyNoteAtom = atom(null, (get, set) => {
//   const notes = get(notesAtom)

//   if (!notes) return

//   const title = `Note ${notes.length + 1}`

//   if (!title) return

//   const newNote: NoteInfo = {
//     title,
//     lastEditTime: Date.now()
//   }

//   set(notesAtom, [newNote, ...notes.filter((note) => note.title !== newNote.title)])

//   set(selectedNoteIndexAtom, 0)
// })

// export const deletedNoteAtom = atom(null, (get, set) => {
//   const notes = get(notesAtom)
//   const selectedNote = get(selectedNoteAtom)

//   if (!selectedNote || !notes) return

//   set(
//     notesAtom,
//     notes.filter((note) => note.title !== selectedNote.title)
//   )

//   set(selectedNoteIndexAtom, null)
// })
