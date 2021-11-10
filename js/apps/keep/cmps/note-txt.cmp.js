

export default {
    props: ['info'],
    template: `
        <section class=note-txt>
            <h2>{{info.txt}}</h2>
            <div v-if="edit"></div>
        </section>
    `,
    data() {
        return {
            edit: false,
        };
    },
    methods: {

    }
};