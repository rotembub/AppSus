import { noteServices } from '../services/note-services.cmp.js'

import noteList from '../cmps/note-list.cmp.js'




export default {
    template: `
    <section class="note-app">
            <h1>Welcome to notes!</h1>
    <note-list v-if="notes" :notes="notes"></note-list>

    </section> 
    `,
    data() {
        return {
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
            filterBy: null,
        };
    },
    methods: {

    },
    created() {

    },
    computed: {
        notesToShow(){

        }

    },
    watch: {

    },
    components: {
        noteList,

    }
};