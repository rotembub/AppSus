
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
                <!-- <button @click="updateNote">Update</button> -->
                <button @click="removeNote">x</button>
            </div>
            <component  
                        :is="note.type" 
                        :info="note.info"> 
            </component>
            
        
        </section>
    `,
    data() {
        return {

        }
    },
    methods: {
        removeNote() {
            eventBus.$emit('removeNote', this.note.id);
            console.log(' $emiting remove:', this.note.id);
        },

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