
import noteTxt from './note-txt.cmp.js'
import noteVideo from '../cmps/note-video.cmp.js'
import noteTodos from './note-todos.cmp.js'
import noteImg from '../cmps/note-img.cmp.js'
import { eventBus } from '../../../services/event-bus-service.js'
import { noteServices } from '../services/note-services.cmp.js'

export default {
    props: ['note'],
    template: `
        <section class="note-preview" :style="note.style"  @dragstart="startDrag($event,note)" @drop="onDrop($event,note.id)" @dragenter.prevent @dragover.prevent>
            <div class="note-control-box">
                <!-- <router-link :to="'/note/'+note.id" @click.native="openEditor">Edit</router-link> watch out for the @click -->
                <button @click.stop.prevent="openEditor">Edit</button> <!--watchout for native -->
                <button @click.stop.prevent="removeNote">x</button>
                <span :class="{yellow: note.isPinned }" @click.stop="setPinned">📌</span>
                <button @click.stop.prevent="copyNote">Copy</button> 
                <button @click.stop.prevent="toggleColors">🎨</button>
                <div v-if="colorOpen" class="color-options">
                    <span @click.stop.prevent="setColor(color)" class="color-span" v-for="color in colors" :style="{ 'background-color': color }">Co</span>
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
            colors: ['darkkhaki', 'lightyellow', 'lightblue', 'white', 'violet', 'lightgray', 'lightgreen', 'lightcoral', 'lightpink', 'lightseagreen', 'tomato']

        }
    },
    methods: {
        removeNote() {
            noteServices.removeNote(this.note.id)
                .then(note => {
                    this.$emit('noteChanged');
                })
        },
        setColor(color) {
            this.note.style.backgroundColor = color;
            noteServices.editNote(this.note)
                .then(note => {
                    // eventBus.$emit('noteChanged');
                    this.$emit('noteChanged');
                })
        },
        openEditor() {
            console.log('trying to open');
            eventBus.$emit('editNote', this.note); //////////////////////
        },
        toggleColors() {
            this.colorOpen = !this.colorOpen;
        },
        setPinned() {
            this.note.isPinned = !this.note.isPinned
            noteServices.editNote(this.note)
                .then(note => {
                    // eventBus.$emit('noteChanged');
                    this.$emit('noteChanged');
                })
        },
        copyNote() {
            this.$emit('copiedNote', JSON.parse(JSON.stringify(this.note))); // gotta think of a better way
        },
        startDrag(ev, note) {
            console.log('u are draggin!');
            console.log('being moved dragged:', note, ev);
            ev.dataTransfer.dropEffect = 'move';
            ev.dataTransfer.effectAllowed = 'move';
            ev.dataTransfer.setData('noteId', note.id);
        },
        onDrop(ev, dropId) {
            const noteId = ev.dataTransfer.getData('noteId');
            console.log(noteId);
            // console.log(notes);
            this.$emit('switchPlaces', noteId, dropId);
            // const note = notes.find(note => note.id === noteId)
            // console.log(note);

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