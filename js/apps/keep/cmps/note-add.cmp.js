import { noteServices } from '../services/note-services.cmp.js'

export default {
    template: `
                <div class="note-add">
                    <!-- <button>x</button> -->
                    
                    <select v-model="noteType" @change="setNoteForm" name="note-type">
                        <option value="note-txt">Text</option>
                        <option value="note-video">Video</option>
                        <option value="note-img">Image</option>
                        <option value="note-todos">Todo</option>
                    </select>
                    <form class="note-form" @submit.prevent = "saveNote">

                        <template v-if="(noteType === 'note-txt') && newNote"  >
                            <label for="comments">Write something</label>
                            <textarea v-model="newNote.info.txt" name="comments" placeholder="Your thoughts" rows="10" cols="30" required></textarea>
                        </template>

                        <template v-if="(noteType === 'note-video') && newNote">
                            <label for="title">Add a Title</label>
                            <input v-model="newNote.info.title" name="title" placeholder="Title..." required>
                            <label for="video">Add a video</label>
                            <input v-model="newNote.info.url" type="url" name="video" placeholder="https://video.com" required>
                        </template>

                        <template v-if="(noteType === 'note-img') && newNote">
                            <label for="title">Add a Title</label>
                            <input v-model="newNote.info.title" name="title" placeholder="Title..." required>
                            <br>
                            <label for="img">Add a photo</label>
                            <input v-model="newNote.info.url" type="url" name="img" placeholder="https://image.com" required>
                        </template>

                        <template v-if="(noteType === 'note-todos') && newNote">
                        
                           <input v-model="newNote.info.label" type="text" placeholder="Enter a label">
                           <span>What to do?</span>
                            <input type="text" v-for="(todo,idx)  in newNote.info.todos" v-model="newNote.info.todos[idx].txt">
                           <!-- <input v-model="todo.txt" type="text" placeholder="to do.."> -->

                           <button @click.stop.prevent="addTodo">+</button>

                        </template>

                        <button>Save</button>
                    </form>

                </div>
    `,
    data() {
        return {
            newNote: null,
            noteType: 'note-txt', //watchout!!!
            todo: { txt: null, doneAt: null },
            isEdited: false,

        }
    },
    created() {
        const { noteId } = this.$route.params;
        if (noteId) {
            noteServices.getNoteById(noteId)
                .then(note => {
                    this.newNote = note;
                    this.noteType = note.type
                    console.log(note, this.newNote, 'here');
                    this.isEdited = true;
                });
        } else {

            this.newNote = noteServices.getEmptyNoteByType(this.noteType);
            console.log('here actually', this.noteType, this.newNote);
        }
    },
    mounted() {

    },
    methods: {

        saveNote() {
            console.log(this.newNote);

            if (this.isEdited) {
                console.log(this.newNote, this.isEdited);
                this.$emit('noteEdited', this.newNote);
            }

            else this.$emit('noteAdd', this.newNote);
        },
        addTodo() {
            this.newNote.info.todos.push(JSON.parse(JSON.stringify(this.todo)));
            this.todo = { txt: null, doneAt: null };

        },
        setNoteForm() {
            this.newNote = noteServices.getEmptyNoteByType(this.noteType);
        }


    },

    computed: {

    }
}