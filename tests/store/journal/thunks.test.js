import { startNewNote } from '../../../src/store/journal/thunks'
import {
  savingNewNote,
  addNewEmptyNote,
  setActiveNote,
} from '../../../src/store/journal/journalSlice'
import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../../src/firebase/config'

describe('Test on Journal Thunks', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()

  beforeEach(() => jest.clearAllMocks())

  test('should create a new blank note', async () => {
    const uid = 'TEST-UID'
    getState.mockReturnValue({ auth: { uid: uid } })

    await startNewNote()(dispatch, getState)

    expect(dispatch).toHaveBeenCalledWith(savingNewNote())

    expect(dispatch).toHaveBeenCalledWith(
      addNewEmptyNote({
        body: '',
        title: '',
        id: expect.any(String),
        date: expect.any(Number),
      })
    )

    expect(dispatch).toHaveBeenCalledWith(
      setActiveNote({
        body: '',
        title: '',
        id: expect.any(String),
        date: expect.any(Number),
      })
    )

    //Delete from Firebase
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`)
    const docs = await getDocs(collectionRef)

    const deletePromises = []
    docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref)))

    await Promise.all(deletePromises)
  }, 10000)
})
