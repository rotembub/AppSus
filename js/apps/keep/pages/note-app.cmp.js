import { noteServices } from '../services/note-services.cmp.js'

import noteList from '../cmps/note-list.cmp.js'
import noteFilter from '../cmps/note-filter.cmp.js'
import { eventBus } from '../../../services/event-bus-service.js';
import noteAdd from '../cmps/note-add.cmp.js'



// • Apps Integration - Allow sending a note content straight into the compose-message page in misterEmail (use queryString Params)


export default {
    template: `
    <section class="note-app">
        <h1>Welcome to Notes!</h1>
        <div class="note-task-bar"> 
            <note-filter @filter="setFilter"></note-filter>
            <button @click="toggleModal">Add</button>
        </div>
        <note-add v-if="modalOpened" :selectedNote="selectedNote" @noteAdd="addNote" @noteEdited="updateNote" @closeEditor="closeModal"></note-add>
        <note-list v-if="notes" :notes="notesToShow" @copiedNote="copyNote" @noteChanged="noteChanges" @switchPlaces="switchPlaces"></note-list>

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
            selectedNote: null,
        };
    },
    methods: {
        setFilter(filter) {
            this.filterBy = filter;
            console.log('Note App Says Filter has changed!', this.filterBy);
            this.notesToShow;
        },
        // removeNote(id) {
        //     console.log('removing', id);
        //     noteServices.removeNote(id)
        //         .then(notes => {
        //             console.log(notes);
        //             this.notes = notes;
        //         })
        //         .catch(err => {
        //             console.log('Error', err);
        //         })
        // },
        toggleModal(id) {
            console.log('opening');
            this.modalOpened = !this.modalOpened;
        },
        closeModal() {
            console.log('closing');
            this.modalOpened = false;
            this.selectedNote = null;
            // if (this.$route.params.noteId) this.$router.push('/note');
        },
        addNote(ev) {
            this.closeModal(); /////////////
            console.log('NOTE ADDED! received at APP',)
            noteServices.query()
                .then(notes => {
                    this.notes = notes;
                    this.sortByPin; ////////////// 
                })
        },
        updateNote(ev) {
            console.log('NOTE EDITED! received at APP!');
            this.closeModal();/////////////
            noteServices.query()
                .then(notes => {
                    this.notes = notes;
                    this.sortByPin; ////////////// 
                })
        },
        copyNote(copy) { // gotta think of a better way
            noteServices.addNote(copy)
                .then((note) => {
                    console.log('COPY ADDED!', note)
                    noteServices.query()
                        .then(notes => this.notes = notes)
                })
                .catch(err => console.log('Error', err))
        },
        openEditor(note) {
            console.log('parent received opening editor', this.modalOpened)
            this.selectedNote = note;
            console.log(this.selectedNote, note);
            this.toggleModal();
        },
        noteChanges() {
            console.log('received Note Changes!');
            noteServices.query()
                .then(notes => {
                    this.notes = notes;
                    this.sortByPin; ////////////// 
                })
        },
        switchPlaces(noteId, dropId) {
            console.log(noteId, dropId, 'in APP');
            const idxDragged = this.notes.findIndex(note => note.id === noteId);
            const idxToPlace = this.notes.findIndex(note => note.id === dropId);
            console.log(idxDragged, idxToPlace);
            const movedNote = JSON.parse(JSON.stringify(this.notes[idxDragged]))
            this.notes.splice(idxDragged, 1);
            this.notes.splice(idxToPlace, 0, movedNote);
            // see if i can do it with the server although im not sure if its necessary because its just a visual
        },
        // switchPlaces(noteId, dropId) {
        //     console.log(noteId, dropId, 'in APP');
        //     const idxDragged = this.notes.findIndex(note => note.id === noteId);
        //     const idxToPlace = this.notes.findIndex(note => note.id === dropId);
        //     console.log(idxDragged, idxToPlace);
        //     const movedNote = JSON.parse(JSON.stringify(this.notes[idxDragged]))
        //     noteServices.changeIdx(movedNote, noteId, idxToPlace)
        //         .then(note => {
        //             this.notes.splice(idxDragged, 1);
        //             this.notes.splice(idxToPlace, 0, movedNote);

        //         })
        //     // see if i can do it with the server althought im not sure if its necessary because its just a visual
        // }


    },
    created() {

        noteServices.query()
            .then(notes => {
                this.notes = notes
                this.sortByPin
            });

        // eventBus.$on('noteChanged', this.noteChanges)
        // eventBus.$on('removeNote', this.removeNote);
        eventBus.$on('editNote', this.openEditor);   /////////////

    },
    destroyed() {
        console.log('no longer here');
        // eventBus.$off('noteChanged', this.noteChanges)
        // eventBus.$off('removeNote', this.removeNote);
        eventBus.$off('editNote', this.openEditor);
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
            this.notes.sort((a, b) => {
                if (a.isPinned && !b.isPinned) return -1
                else return 1
            })
            console.log(this.notes);
        }


    },////////////// WORK IN PROGRESS
    watch: {
        '$route.params.emailId': {
            handler() {
                const { emailId } = this.$route.params;
                // const emailId = 'qwer';
                console.log(emailId);
                if (!emailId) return;
                noteServices.emailToNoteEntity(emailId)
                    .then(emailNote => {
                        this.openEditor(emailNote);
                    })
            },
            immediate: true
        }
    },
    components: {
        noteList,
        noteFilter,
        noteAdd,
    }
};