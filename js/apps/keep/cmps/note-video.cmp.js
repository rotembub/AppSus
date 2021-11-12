


export default {
    props: ['info'],
    template: `
        <section class="note-video">
            <h2>{{info.title}}</h2>
            <iframe width="420" height="345" :src="getProperURL">
                
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
            const proper = 'embed';
            const urlArray = this.info.url.split('/');
            console.log(urlArray)
            urlArray.splice(urlArray.length - 1, 0, proper);
            console.log(urlArray.join('/'));
            return urlArray.join('/')
        }
    }
};