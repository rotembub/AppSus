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
        },
        style: {
            backgroundColor: "lightgreen",
            fontSize: '16px'
        }
    },
    {
        id: "n102",
        type: "note-img",
        isPinned: false,
        info: {
            url: "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGhvdG98ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
            title: "Bobi and Me"
        },
        style: {
            backgroundColor: "lightgreen",
            fontSize: '16px'
        }
    },
    {
        id: "n103",
        type: "note-todos",
        isPinned: false,
        info: {
            label: "Get my stuff together",
            todos: [
                { txt: "Driving liscence", doneAt: null },
                { txt: "Coding power", doneAt: 187111111 }
            ]
        },
        style: {
            backgroundColor: "lightgreen",
            fontSize: '16px'
        }
    },
    {
        id: "n104",
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!"
        },
        style: {
            backgroundColor: "lightgreen",
            fontSize: '16px'
        }
    },
    {
        id: "n105",
        type: "note-img",
        isPinned: false,
        info: {
            url: "https://www.cnet.com/a/img/-qQkzFVyOPEoBRS7K5kKS0GFDvk=/940x0/2020/04/16/7d6d8ed2-e10c-4f91-b2dd-74fae951c6d8/bazaart-edit-app.jpg",
            title: "Bobi and Me"
        },
        style: {
            backgroundColor: "lightgreen",
            fontSize: '16px'
        }
    },
    {
        id: "n106",
        type: "note-todos",
        isPinned: false,
        info: {
            label: "Get my stuff together",
            todos: [
                { txt: "Driving liscence", doneAt: null },
                { txt: "Coding power", doneAt: 187111111 }
            ]
        },
        style: {
            backgroundColor: "lightgreen",
            fontSize: '16px'
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
            },
            style: {
                backgroundColor: "lightgreen",
                fontSize: '16px'
            }
        }

    } else if (type === 'note-video') {
        return {
            id: null,
            type: "note-video",
            isPinned: false,
            info: {
                url: null,
                title: null,
            },
            style: {
                backgroundColor: "lightgreen",
                fontSize: '16px'
            }
        }
    } else if (type === 'note-img') {
        return {
            id: null,
            type: "note-img",
            isPinned: false,
            info: {
                url: null,
                title: null,
            },
            style: {
                backgroundColor: "lightgreen",
                fontSize: '16px'
            }
        }
    } else if (type === 'note-todos') {

        return {
            id: null,
            type: "note-todos",
            isPinned: false,
            info: {
                label: null,
                todos: [{ txt: null, doneAt: null }],
            },
            style: {
                backgroundColor: "lightgreen",
                fontSize: '16px'
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