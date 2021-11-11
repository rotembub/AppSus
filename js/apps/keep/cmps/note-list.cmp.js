
import notePreview from './note-preview.cmp.js'


export default {
    props: ['notes'],
    template: `
        <section v-if="notes" class="note-list">
                <note-preview v-for="(note, idx) in notes" :key="note.id" :class="note.type" :note="note" @copiedNote="copiedNote" @noteEdited="noteEdited">
                    
                </note-preview>
        </section>
    `,
    components: {
        notePreview,
    },
    data() {
        return {

        }
    },
    methods: {
        noteEdited(ev) {
            console.log('emiting');
            this.$emit('noteEdited', ev);
        },
        copiedNote(ev) {
            this.$emit('copiedNote', ev);   // gotta think of a better way
        }
    },
    computed: {
        setClass() {
            if (this.note.type === 'note-img' || this.not.type === 'note-video') {
                return 'wider'
            }
        }
    }



}