
import noteTxt from './note-txt.cmp.js'
import noteVideo from '../cmps/note-video.cmp.js'
import noteTodos from './note-todos.cmp.js'
import noteImg from '../cmps/note-img.cmp.js'
import { eventBus } from '../../../services/event-bus-service.js'
// import { noteServices } from '../services/note-services.cmp.js'

export default {
    props: ['note'],
    template: `
        <section class="note-preview" :style="note.style">
            <div class="note-control-box">
                <router-link :to="'/note/'+note.id" @click.native="openEditor">Edit</router-link> <!-- watch out for the @click -->
                <button @click.stop.prevent="removeNote">x</button>
                <span :class="{yellow: note.isPinned }" @click.stop="setPinned">📌</span>
                <button @click.stop.prevent="copyNote">Copy</button> 
                <button @click.stop.prevent="toggleColors">🎨</button>
                <div v-if="colorOpen" class="color-options">
                    <span @click.stop.prevent="setColor(color)" class="color-span" v-for="color in colors" :style="{ 'background-color': color }">C</span>
                </div>
                

            </div>
            <component  
                        :is="note.type" 
                        :info="note.info"> 
            </component>

            
        
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
            colorOpen: false,
            colors: ['darkkhaki', 'lightyellow', 'lightblue', 'white', 'violet', 'lightgray', 'lightgreen', 'lightcoral','lightpink','lightseagreen','tomato']

        }
    },
    methods: {
        removeNote() {
            eventBus.$emit('removeNote', this.note.id);
            console.log(' $emiting remove:', this.note.id);
        },
        setColor(color) {
            console.log(this.note)
            this.note.style.backgroundColor = color;
            this.$emit('noteEdited', this.note)
        },
        openEditor() {
            console.log('trying to open');
            eventBus.$emit('editNote', this.note.id); //////////////////////
        },
        toggleColors() {
            this.colorOpen = !this.colorOpen;
        },
        setPinned() {
            this.note.isPinned = !this.note.isPinned
            this.$emit('noteEdited', this.note);
        },
        copyNote() {
            this.$emit('copiedNote',JSON.parse(JSON.stringify(this.note))); // gotta think of a better way
        }

    },
    computed: {
        pinTxt() {

        }
    },
    components: {
        noteImg,
        noteTxt,
        noteTodos,
        noteVideo
    }

}