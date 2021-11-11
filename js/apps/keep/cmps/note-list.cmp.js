
import notePreview from './note-preview.cmp.js'


export default {
    props: ['notes'],
    template: `
        <section v-if="notes" class="note-list">
                <note-preview v-for="(note, idx) in notes" :key="note.id" :class="note.type" :note="note" @copiedNote="copiedNote" @noteChanged="noteChanged">
                    
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
        copiedNote(ev) {
            this.$emit('copiedNote', ev);   // gotta think of a better way
        },
        noteChanged(ev){
            this.$emit('noteChanged');
        }
    },
    computed: {
        // setClass() { // not in use currently
        //     if (this.note.type === 'note-img' || this.not.type === 'note-video') {
        //         return 'wider'
        //     }
        // }
    }



}