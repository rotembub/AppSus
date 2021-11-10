// import longText from '../cmps/long-text.cmp.js';
import {emailService} from '../services/email-services.js';
// import reviewAdd from '../cmps/review-add.cmp.js';


export default {
  template: `
        <section v-if="email" class="book-details ">
      <div class="email-display">
             <div>
                <button @click="toggleRead(mail)">{{ email.read ? "Mark Unread (r)" : "Mark Read (r)" }}</button>
            </div>
          <h2 class="mb-0">
            Subject: <strong>{{ email.subject }}</strong>
         </h2>
       <div>
         <em>To {{ email.to }} on {{ email.sentAt }}</em>
      </div>
        <div>{{email.body}}</div>
    </div>
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
    close() {
      this.email = null;
    },
  },
  computed: {
    readingLength() {
      const pages = this.book.pageCount;
      let reading = '';
      if (pages > 500) {
        reading = 'Long Reading';
      } else if (pages > 200) {
        reading = 'Decent Reading';
      } else if (pages < 100) {
        reading = 'Light Reading';
      }
      return reading;
    },
    publish() {
      const publishDate = this.book.publishedDate;
      const currDate = new Date().getFullYear();
      let publishStr = '';
      if (currDate - publishDate > 10) {
        publishStr = 'Veteran Book';
      } else if (currDate - publishDate <= 1) {
        publishStr = 'New!';
      }
      return publishStr;
    },
    priceColor() {
      const price = this.book.listPrice.amount;
      let classColor = '';
      if (price < 20) {
        classColor = 'color-green';
      } else if (price > 150) {
        classColor = 'color-red';
      }
      return classColor;
    },
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
