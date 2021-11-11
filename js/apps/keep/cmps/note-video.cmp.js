


export default {
    props: ['info'],
    template: `
        <section class="note-video">
            <iframe width="420" height="345" :src="info.url">
            </iframe>
        </section>
    `,
    data() {
        return {

        };
    },
    methods: {
    },
    computed: {
        getProperURL() {
            var proper = '/embed';
            this.info.url
        }
    }
};