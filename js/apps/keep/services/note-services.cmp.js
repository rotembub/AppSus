export const noteServices = {
    query,
    addNote,
    removeNote,

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

function query() {
    return storageService.query(NOTE_KEY);
}

function addNote(noteDetails) {
    console.log(noteDetails);
    var newNote;
    if (noteDetails.noteType === 'txt') {
        console.log('here');
        newNote = {
            id: "n101",
            type: "note-txt",
            isPinned: false,
            info: {
                txt: noteDetails.txt
            }
        }

    } else if (noteDetails.noteType === 'video') {
        newNote = {
            id: "n105",
            type: "note-video",
            info: {
                url: noteDetails.vidUrl,
                title: noteDetails.title,
            },
            style: {
                backgroundColor: "#00d"
            }
        }


    } else if (noteDetails.noteType === 'img') {
        newNote = {
            id: "n105",
            type: "note-img",
            info: {
                url: noteDetails.vidUrl,
                title: noteDetails.title,
            },
            style: {
                backgroundColor: "#00d"
            }
        }


    } else if (noteDetails.noteType === 'todo') {
        noteDetails.todos

        newNote = {
            id: "n106",
            type: "note-todos",
            info: {
                label: noteDetails.label,
                todos: noteDetails.todos,
            }
        }


    }
    console.log(newNote);
    return storageService.post(NOTE_KEY, newNote);
}

function removeNote() {

}



_createNotes();