

export default {
    template: `
                <div class="note-add">
                    <!-- <button>x</button> -->
                    
                    <select v-model="newNote.noteType" name="note-type">
                        <option value="txt">Text</option>
                        <option value="video">Video</option>
                        <option value="img">Image</option>
                        <option value="todo">Todo</option>
                    </select>
                    <form class="note-form" @submit.prevent = "saveNote">

                        <template v-if="newNote.noteType === 'txt'">
                            <label for="comments">Write something</label>
                            <textarea v-model="newNote.txt" name="comments" placeholder="Your thoughts" rows="10" cols="30" required></textarea>
                        </template>

                        <template v-if="newNote.noteType === 'video'">
                            <label for="title">Add a Title</label>
                            <input v-model="newNote.title" name="title" placeholder="Title..." required>
                            <label for="video">Add a video</label>
                            <input v-model="newNote.vidUrl" type="url" name="video" placeholder="https://video.com" required>
                        </template>

                        <template v-if="newNote.noteType === 'img'">
                            <label for="title">Add a Title</label>
                            <input v-model="newNote.title" name="title" placeholder="Title..." required>
                            <br>
                            <label for="img">Add a photo</label>
                            <input v-model="newNote.imgUrl" type="url" name="img" placeholder="https://image.com" required>
                        </template>

                        <template v-if="newNote.noteType === 'todo'">
                        
                           <input v-model="newNote.label" type="text" placeholder="Enter a label">
                           <span>What to do?</span>
                           <input v-model="newNote.todo.txt" type="text" placeholder="to do..">

                           <button @click.stop.prevent="addTodo">+</button>

                        </template>

                        <button>Save</button>
                    </form>

                </div>
    `,
    data() {
        return {
            newNote: {
                txt: null,
                vidUrl: null,
                imgUrl: null,
                title: null,
                label: null,
                todo: {txt: null, doneAt: null},
                todos: [],
                noteType: 'txt',
            },

        }
    },
    created() {

    },
    mounted() {

    },
    methods: {
        setNote() {

        },
        saveNote() {
            console.log(this.newNote);
            this.$emit('noteAdd', this.newNote);
        },
        addTodo() {
            
            this.newNote.todos.push(JSON.parse(JSON.stringify(this.newNote.todo)));
            this.newNote.todo = {txt: null, doneAt: null};
            console.log(this, this.newNote);
        }

    },

    computed: {

    }
}