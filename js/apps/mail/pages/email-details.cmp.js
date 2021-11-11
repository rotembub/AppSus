// import longText from '../cmps/long-text.cmp.js';
import {emailService} from '../services/email-services.js';
// import reviewAdd from '../cmps/review-add.cmp.js';


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
         <!-- <div  class="overlay" @click="close"></div> -->
           <!-- <div class="modal-card"> -->
           <!-- <button class="btn-close" @click="$emit('close')" >X</button> -->
          
            <!-- <router-link :to="'/book/'+prevBookId" ><= Prev Book</router-link>
            <router-link :to="'/book/'+nextBookId" >Next Book =></router-link> -->
            <!-- </div> -->
            <!-- <review-add/> -->
        </section>
    `,
  data() {
    return {
      email: null,
      // nextBookId: null,
      // prevBookId: null
    };
  },
  created() {
    const {emailId} = this.$route.params;
    emailService.getById(emailId).then((email) => (this.email = email));
    // const {bookId} = this.$route.params;
    // bookService.getById(bookId).then((book) => (this.book = book));
    // bookService.getNextBookId(bookId).then(bookId => this.nextBookId = bookId);
  },
  methods: {
   
  },
  computed: {
   
    
  },
  components: {
    // longText,
    // reviewAdd
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
