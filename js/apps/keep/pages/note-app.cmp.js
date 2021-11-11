import { noteServices } from '../services/note-services.cmp.js'

import noteList from '../cmps/note-list.cmp.js'
import noteFilter from '../cmps/note-filter.cmp.js'
import { eventBus } from '../../../services/event-bus-service.js';
import noteAdd from '../cmps/note-add.cmp.js'


// • Support pining a note to the top of the list
// • Support duplicating a note
// • Apps Integration - Allow sending a note content straight into the compose-message page in misterEmail (use queryString Params)


export default {
    template: `
    <section class="note-app">
        <h1>Welcome to notes!</h1>
        <note-filter @filter="setFilter"></note-filter> <button @click="toggleModal">Add</button>
        <note-add v-if="modalOpened" @noteAdd="addNote" @noteEdited="updateNote"></note-add>
        <note-list v-if="notes" :notes="notesToShow" @noteEdited="updateNote"></note-list> <!--WATCHOUT FOR THE @ -->

    </section> 
    `,
    data() {
        return {
            modalOpened: false,
            notes: null,
            filterBy: {
                byName: '',
                byType: 'all',
            },
            selectedNote: null, // perhaps ill go this way instead of the route way sending a prop and if its a new Note just send null,
        };
    },
    methods: {
        setFilter(filter) {
            this.filterBy = filter;

            console.log('Note App Says Filter has changed!', this.filterBy);
            this.notesToShow;

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
        toggleModal(id) {
            console.log('opening');
            this.modalOpened = !this.modalOpened;
        },
        closeModal() { // made this only so i could clear the link from the noteId
            console.log('closing');
            this.modalOpened = false;
            if (this.$route.params.noteId) this.$router.push('/note');
        },
        addNote(newNote) {
            console.log('adding note');
            this.toggleModal(); /////////////
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
            this.closeModal();/////////////
            noteServices.editNote(editedNote)
                .then((note) => {
                    console.log(note, 'has been edited')
                    noteServices.query()
                        .then(notes => this.notes = notes)
                })
                .catch(err => console.log('Error', err))
        },

    },
    created() {
        noteServices.query()
            .then(notes => this.notes = notes)
        eventBus.$on('removeNote', this.removeNote);
        eventBus.$on('editNote', this.toggleModal);   /////////////
    },
    destroyed() {
        console.log('no longer here');
        eventBus.$off('removeNote', this.removeNote);
        eventBus.$off('editNote', this.toggleModal);
    },
    computed: {
        notesToShow() {
            if (!this.filterBy) return this.notes;
            var filteredByType;
            if (this.filterBy.byType === 'all') filteredByType = this.notes;
            else filteredByType = this.notes.filter(note => note.type === this.filterBy.byType);
            if (!this.filterBy.byName) {
                console.log(filteredByType);
                return filteredByType;
            }
            var filteredNotes = filteredByType.filter((note) => {
                var values = Object.values(note.info);
                console.log('values', values);
                if (note.type === 'note-todos') {
                    if (note.info.label.toLowerCase().includes(this.filterBy.byName.toLowerCase())) return note;
                    var todoValues = Object.values(note.info.todos);
                    console.log('todoValues', todoValues);
                    if (todoValues.some(val => val.txt.toLowerCase().includes(this.filterBy.byName.toLowerCase()))) return note;
                    else return false;
                }
                // if (note.type === 'note-img' || note.type === 'note-video') values = note.info.title
                // else if (note.type === 'note-txt') values = note.info.txt
                // if (values.toLowerCase().includes(this.filterBy.byName.toLowerCase())) return note
                if (values.some(val => val.toLowerCase().includes(this.filterBy.byName.toLowerCase()))) return note;
            })
            return filteredNotes;
        },
        sortByPin() {

        }


    },
    watch: {

    },
    components: {
        noteList,
        noteFilter,
        noteAdd,
    }
};