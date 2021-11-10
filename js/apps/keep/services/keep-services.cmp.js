export const noteServices = {
    query,
    addNote,
    removeNote,

}
import { storageService } from './async-storage-service.js'
// import { utilServices } from './util.js';


const NOTE_KEY = 'notes';
const gNotes;

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

