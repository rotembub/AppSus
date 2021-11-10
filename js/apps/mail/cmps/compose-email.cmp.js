import { emailService } from '../services/email-services.js'
// import {utilService} from '../services/util-service.js';
// import { eventBus } from '../services/event-bus-service.js';
// import { storageService } from '../services/async-storage-service.js';

export default {
  template: `
        <section class="compose-email ">
            <div class="modal-card">
            <h3>Create a new Email</h3>
            <!-- <div class="overlay" @click="closeModal"></div> -->
            <label >to</label>
            <input type="text" v-model="newEmail.to">
            <label >subject</label>

            <input type="text" v-model="newEmail.subject">
            <label >body</label>

            <textarea v-model="newEmail.body"  cols="30" rows="10"></textarea>
            <button @click="addNewEmail">Send</button>
            <!-- can use debounce -->
            <!-- <input ref="textInput" @change="filterBooks" v-model.lazy="bookName" type="text" placeholder="search book"> -->
           
        </div>
        </section>
    `,
  data() {
    return {
      newEmail: {
        to: '',
        subject: '',
        body: ''
      }
    };
  },
  created() {
   
  },
  mounted(){
    // this.$refs.textInput.focus();
  },
  methods: {
    createMsg(txt,type,link = ''){
      const msg = {
        txt,
        type,
        link
    };
    eventBus.$emit('showMsg', msg)
    },
    filterBooks(){
        //make a call to the api retrive books , save in storage
        // emailService.apiBooks(this.bookName).then(books => this.books = books);
        // console.log(this.bookName);
    },
    addNewEmail(){
       
       emailService.addEmail(this.newEmail).then(email => {
         console.log('added',email);
         this.newEmail = {
          to: '',
          subject: '',
          body: ''
         }
       })
        // emailService.addGoogleBook(book).then((cap)=>{ // return a cap obj with book and books
        //      const link = '/book/'+cap.book.id;
        //     // this.createMsg('Added new Book','success',link);
        //     this.$emit('addedBook',cap.books);
        // });
    },

    closeModal(){
        this.books = null;
        this.bookName = '';
    }
  },
  computed:{
   
  }
};
