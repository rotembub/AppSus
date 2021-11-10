
import noteTxt from './note-txt.cmp.js'
import noteVideo from '../cmps/note-video.cmp.js'
import noteTodos from './note-todos.cmp.js'
import noteImg from '../cmps/note-img.cmp.js'
import { eventBus } from '../../../services/event-bus-service.js'

export default {
    props: ['note'],
    template: `
        <section class="note-preview" :style="styleObj">
            <div class="note-control-box">
                <!-- <button @click="edit = !edit">Update</button> -->
                <router-link :to="'/note/'+note.id" @click.native="openEditor">Edit</router-link> <!-- watch out for the @click -->
                <!-- <button @click.stop.prevent="edit">Edit</button> -->
                <button @click.stop.prevent="removeNote">x</button>
                <button @click.stop.prevent="setColor">Color</button>
                <!-- <div class="colorOptions"> -->
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
            styleObj: {
                backgroundColor: null,
                fontSize: '16px',
            },


        }
    },
    methods: {
        removeNote() {
            eventBus.$emit('removeNote', this.note.id);
            console.log(' $emiting remove:', this.note.id);
        },
        // updateNote() {
        //     eventBus.$emit('updateNote', this.note.id);
        // },
        setColor() {
            this.styleObj.backgroundColor = 'yellow';
        },
        openEditor() {
            console.log('trying to open');
            eventBus.$emit('editNote', this.note.id); //////////////////////
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