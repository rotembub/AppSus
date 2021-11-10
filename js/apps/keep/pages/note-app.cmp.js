import { noteServices } from '../services/note-services.cmp.js'

import noteList from '../cmps/note-list.cmp.js'
import noteFilter from '../cmps/note-filter.cmp.js'
import { eventBus } from '../../../services/event-bus-service.js';

// • Support setting the note's background color and other styles
// • Support filtering notes by search and by type 
// • Support pining a note to the top of the list
// • Support duplicating a note
// • Apps Integration - Allow sending a note content straight into the compose-message page in misterEmail (use queryString Params)


export default {
    template: `
    <section class="note-app">
        <h1>Welcome to notes!</h1>
        <note-filter @filter="setFilter"></note-filter>
        <note-list v-if="notes" :notes="notes"></note-list>

    </section> 
    `,
    data() {
        return {
            filterBy: null,
            notes: [
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
            ],
        };
    },
    methods: {
        setFilter(filter) {
            this.filterBy = filter;
            console.log('Note App Says Filter has changed!');
        },
        removeNote(id) {
            console.log('removing', id);
            this.notes = this.notes.filter(note => note.id !== id);
            // console.log(this.notes);
        }
    },
    created() {
        eventBus.$on('removeNote', this.removeNote);
    },
    destroyed() {
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
    }
};