
import noteTxt from './note-txt.cmp.js'
import noteVideo from '../cmps/note-video.cmp.js'
import noteTodos from './note-todos.cmp.js'
import noteImg from '../cmps/note-img.cmp.js'

export default {
    props: ['note'],
    template: `
        <section class="note-preview">
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
    computed: {

    },
    components: {
        noteImg,
        noteTxt,
        noteTodos,
        noteVideo
    }

}