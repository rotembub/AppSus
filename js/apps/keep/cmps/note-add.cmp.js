

export default {
    template: `
                <div class="note-add" v-if="note">
                    
                    <select v-model="noteType" name="note-type">
                        <option value="txt">Text</option>
                        <option value="video">Video</option>
                        <option value="img">Image</option>
                        <option value="todo">Todo</option>
                    </select>
                    <form class="note-form" @submit.prevent = "saveNote">

                        <template v-if="noteType === txt">
                            <label for="comments">Write something</label>
                            <textarea v-model="review.txt" name="comments" placeholder="Comments" rows="10" cols="30" required></textarea>
                        </template>
                        <template v-if="noteType === txt">
                            <label for="comments">Write something</label>
                            <textarea v-model="review.txt" name="comments" placeholder="Comments" rows="10" cols="30" required></textarea>
                        </template>
                        <template v-if="noteType === txt">
                            <label for="comments">Write something</label>
                            <textarea v-model="review.txt" name="comments" placeholder="Comments" rows="10" cols="30" required></textarea>
                        </template>
                        <template v-if="noteType === txt">
                            <label for="comments">Write something</label>
                            <textarea v-model="review.txt" name="comments" placeholder="Comments" rows="10" cols="30" required></textarea>
                        </template>

                        
                        <button>Save</button>
                    </form>

                </div>
    `,
    data() {
        return {
            newNote: {
                txt: null,
                url: null,
                title: null,
                label: null,
                todos: [{ txt: null, doneAt: null }],
            },
            noteType: null,
        }
    },
    created() {

    },
    mounted() {

    },
    methods: {

    },

    computed: {

    }
}