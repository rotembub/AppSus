import {emailService} from '../services/email-services.js';


export default {
  template: `
        <section v-if="email" class="email-details home-page  ">
      <div class="email-display">
           
          <h2 class="mb-0">
            Subject: <strong>{{ email.subject }}</strong>
         </h2>
       <div>
         <em>To {{ email.to }} on {{ email.sentAt }}</em>
      </div>
        <div>{{email.body}}</div>
    </div>

    <router-link to="/email" >Back</router-link>
        
        </section>
    `,
  data() {
    return {
      email: null,
     
    };
  },
  created() {
    const {emailId} = this.$route.params;
    emailService.getById(emailId).then((email) => (this.email = email));
  },
  methods: {
   
  },
  computed: {
   
    
  },
  components: {

  },
  watch:{
    // '$route.params.bookId': {
    //   handler() {
    //     const {bookId} = this.$route.params;
    //     emailService.getById(bookId).then((book) => (this.book = book));
    //     emailService.getNextBookId(bookId).then(bookId => this.nextBookId = bookId);
    //     emailService.getPrevtBookId(bookId).then(bookId => this.prevBookId = bookId);
    //   },
    //   immediate: true
    // }
  }
};
