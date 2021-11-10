
import noteTxt from './note-txt.cmp.js'
import noteVideo from '../cmps/note-video.cmp.js'
import noteTodos from './note-todos.cmp.js'
import noteImg from '../cmps/note-img.cmp.js'
import { eventBus } from '../../../services/event-bus-service.js'

export default {
    props: ['note'],
    template: `
        <section class="note-preview">
            <div class="note-control-box">
                <!-- <button @click="edit = !edit">Update</button> -->
                <router-link :to="'/note/'+note.id">Edit</router-link>
                <button @click="removeNote">x</button>
            </div>
            <component  
                        :is="note.type" 
                        :info="note.info"> 
            </component>
            <template v-if="edit">
                <label for="message">Write something</label>
                <textarea v-model="txt" name="message" placeholder="Your thoughts" rows="10" cols="30" required></textarea>
                <button @click="updateNote">Save</button>
            </template>
            
        
        </section>
    `,
    data() {
        return {
            edit: false,
            txt: null,

        }
    },
    methods: {
        removeNote() {
            eventBus.$emit('removeNote', this.note.id);
            console.log(' $emiting remove:', this.note.id);
        },
        updateNote() {
            eventBus.$emit('updateNote', this.note.id);
        }

    },
    computed: {

    },
    components: {
        noteImg,
        noteTxt,
        noteTodos,
        noteVideo
    }

}