export const noteServices = {
    query,
    addNote,
    removeNote,
    getNoteById,
    getEmptyNoteByType,
    editNote,

}
import { storageService } from '../../../services/async-storage-service.js'
import { utilService } from '../../../services/util-service.js'


const NOTE_KEY = 'notes';
const gNotes = [

    {
        id: "n101",
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!"
        }
    },
    {
        id: "n102",
        type: "note-img",
        info: {
            url: "http://some-img/me",
            title: "Bobi and Me"
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {
        id: "n103",
        type: "note-todos",
        info: {
            label: "Get my stuff together",
            todos: [
                { txt: "Driving liscence", doneAt: null },
                { txt: "Coding power", doneAt: 187111111 }
            ]
        }
    },
    {
        id: "n104",
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!"
        }
    },
    {
        id: "n105",
        type: "note-img",
        info: {
            url: "http://some-img/me",
            title: "Bobi and Me"
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {
        id: "n106",
        type: "note-todos",
        info: {
            label: "Get my stuff together",
            todos: [
                { txt: "Driving liscence", doneAt: null },
                { txt: "Coding power", doneAt: 187111111 }
            ]
        }
    }


]



function _createNotes() {
    var notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = gNotes;
        console.log(gNotes)
        utilService.saveToStorage(NOTE_KEY, gNotes);
    }
}

function getNoteById(id) {
    return storageService.get(NOTE_KEY, id)
}

function query() {
    return storageService.query(NOTE_KEY);
}
// trying to fix my mess ups
function getEmptyNoteByType(type) {
    if (type === 'note-txt') {
        console.log('here');
        return {
            id: null,
            type: "note-txt",
            isPinned: false,
            info: {
                txt: null,
            }
        }

    } else if (type === 'note-video') {
        return {
            id: null,
            type: "note-video",
            info: {
                url: null,
                title: null,
            },
            style: {
                backgroundColor: "#00d"
            }
        }
    } else if (type === 'note-img') {
        return {
            id: null,
            type: "note-img",
            info: {
                url: null,
                title: null,
            },
            style: {
                backgroundColor: "#00d"
            }
        }
    } else if (type === 'note-todos') {

        return {
            id: null,
            type: "note-todos",
            info: {
                label: null,
                todos: [{ txt: null, doneAt: null }],
            }
        }
    }
}


function editNote(editedNote) {
    console.log(editedNote);
    return storageService.put(NOTE_KEY, editedNote);
}

function addNote(newNote) {
    return storageService.post(NOTE_KEY, newNote);
}

function removeNote(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}



_createNotes();