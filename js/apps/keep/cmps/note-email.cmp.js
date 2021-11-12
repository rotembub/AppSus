

export default {
    props: ['info'],
    template: `
        <section class=note-email>
            <h2>{{info.subject}}</h2>
            <p> {{info.body}}</p>
            <span>{{info.to}}</span>
            <span>{{info.sentAt}}</span>
        </section> 
    `,
    data() {
        return {


        };
    },
    methods: {

    }
};
// subject: null,
// body: null,
// to: null,
// sentAt: null,