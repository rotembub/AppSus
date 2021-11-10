import { noteServices } from '../services/note-services.cmp.js'

import noteList from '../cmps/note-list.cmp.js'
import noteFilter from '../cmps/note-filter.cmp.js'
import { eventBus } from '../../../services/event-bus-service.js';
import noteAdd from '../cmps/note-add.cmp.js'

// • Support setting the note's background color and other styles
// • Support filtering notes by search and by type 
// • Support pining a note to the top of the list
// • Support duplicating a note
// • Apps Integration - Allow sending a note content straight into the compose-message page in misterEmail (use queryString Params)


export default {
    template: `
    <section class="note-app">
        <h1>Welcome to notes!</h1>
        <note-filter @filter="setFilter"></note-filter> <button @click="openModal">Add</button>
        <note-add v-if="modalOpened" @noteAdd="addNote" @noteEdited="updateNote"></note-add>
        <note-list v-if="notes" :notes="notes"></note-list>

    </section> 
    `,
    data() {
        return {
            filterBy: null,
            modalOpened: false,
            notes: null,
        };
    },
    methods: {
        setFilter(filter) {
            this.filterBy = filter;
            console.log('Note App Says Filter has changed!');
        },
        removeNote(id) {
            console.log('removing', id);
            noteServices.removeNote(id)
                .then(notes => {
                    console.log(notes);
                    this.notes = notes;
                })
                .catch(err => {
                    console.log('Error', err);
                })
        },
        openModal() {
            this.modalOpened = !this.modalOpened;
        },
        addNote(newNote) {
            console.log('adding note');
            noteServices.addNote(newNote)
                .then((note) => {
                    console.log('NOTE ADDED!', note)
                    noteServices.query()
                        .then(notes => this.notes = notes)
                })
                .catch(err => console.log('Error', err))
        },
        updateNote(editedNote) {
            console.log(editedNote);
            noteServices.editNote(editedNote)
                .then((note) => {
                    console.log(note, 'has been edited')
                })
                .catch(err => console.log('Error', err))
        }
    },
    created() {
        noteServices.query()
            .then(notes => this.notes = notes)
        eventBus.$on('removeNote', this.removeNote);
    },
    destroyed() {
        console.log('no longer here');
        eventBus.$off('removeNote', this.removeNote);
    },
    computed: {
        notesToShow() {
            if (!this.filterBy) return this.notes;
            const nameFilter = this.filterBy.byName.toLowerCase();
            // const types = this.filterBy.byType
            const notesToShow = this.notes.filter(note => {
                const values = Object.values(note.info);
                console.log(values);
                const found = values.some(value => {
                    console.log(value);
                    value.toLowerCase().includes(nameFilter);
                })
                if (found) return note;
            });
            return notesToShow;
        } ///BROKEN NEEDS TO FIX 

    },
    watch: {

    },
    components: {
        noteList,
        noteFilter,
        noteAdd,
    }
};