export const noteServices = {
    query,
    addNote,
    removeNote,

}
import { storageService } from '../../../services/async-storage-service'
import { utilServices } from '../../../services/util-service';


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
    }

]



function _createNotes() {
    var notes = utilServices.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = gNotes;
        console.log(gNotes)
        utilServices.saveToStorage(NOTE_KEY, gNotes);
    }
}

function query() {

}

function addNote() {

}

function removeNote() {

}

