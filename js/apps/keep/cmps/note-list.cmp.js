
import notePreview from './note-preview.cmp.js'


export default {
    props: ['notes'],
    template: `
        <section v-if="notes" class="note-list">
                <note-preview v-for="(note, idx) in notes" :key="note.id" :note="note" @copiedNote="copiedNote" @noteEdited="noteEdited">
                    
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
    }

}