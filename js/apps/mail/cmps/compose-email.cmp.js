import { storageService } from '../../../services/async-storage-service.js';
import { emailService } from '../services/email-services.js'
import { eventBus } from '../../../services/event-bus-service.js';
// import {utilService} from '../services/util-service.js';
// import { eventBus } from '../services/event-bus-service.js';
// import { storageService } from '../services/async-storage-service.js';

export default {
  // props:['comp'],
  template: `
        <section class="compose-email ">
        <div class="overlay" @click="closeModal"></div>
            <div class="modal-card">
            <h3 class="compose-header"><span>New Email</span> </h3>
            <!-- <div class="overlay" @click="closeModal"></div> -->
            <input type="text" placeholder="To" v-model="newEmail.to">
    
            <input type="text" placeholder="Subject" v-model="newEmail.subject">
            

            <textarea v-model="newEmail.body"  cols="30" rows="30"></textarea>
            <button class="compose-send" @click="addNewEmail">Send</button>
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
      },
      isOpen: true,
      saveInterval: null,
    };
  },
  created() {
    eventBus.$on('openDraft', this.putData);
    eventBus.$on('makeNote', this.createNote);
    console.log(this.newEmail);
   
    this.saveInterval = setInterval(()=> {
      if(this.newEmail.to || this.newEmail.subject || this.newEmail.body){
        emailService.saveDraft(this.newEmail).then(d => console.log(d))
       } 
       else this.newEmail = {
        to: '',
        subject: '',
        body: ''
       }
    },5000);
  },
  mounted(){
    // this.$refs.textInput.focus();
    // this.newEmail.to = 'yes' 
  },
  destroyed() {
    console.log('destroy');
    clearInterval(this.saveInterval);
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
         if(this.newEmail.isDraft){
           console.log('is draft');
          emailService.removeDraft(email.id).then(e =>{
            console.log('removed draft');
            this.$emit('draftRemove');
        });
         }
         this.newEmail = {
          to: '',
          subject: '',
          body: ''
         };
         this.closeModal();
       })
        // emailService.addGoogleBook(book).then((cap)=>{ // return a cap obj with book and books
        //      const link = '/book/'+cap.book.id;
        //     // this.createMsg('Added new Book','success',link);
        //     this.$emit('addedBook',cap.books);
        // });
    },
    putData(draft){
      console.log(draft.id);
      console.log('buss call');
      console.log(draft);
      this.newEmail = draft;
      // setTimeout(()=>{
      //   this.newEmail = draft;
      //   console.log('try');
      // },2000);
      // setTimeout()
      // this.newEmail = JSON.parse(JSON.stringify(draft));
      // console.log(this.newEmail);
      // emailService.getDraftById(draft.id).then(d => {
      //   this.newEmail = d;
      //   console.log(d);
      // })
      // this.busData = draft;
      // this.newEmail.to = 'hello';
      // // this.newEmail.to = draft.to;
      // this.newEmail.subject = 'hello';
      // return Promise.resolve(draft);
    },
    createNote(noteEmail){
      emailService.addEmail(noteEmail).then(e => {
        this.newEmail = e;
      });
    },

    closeModal(){
        this.isOpen = false;
        this.$emit('closed');
    }
  },
  computed:{
   
  },
  watch: {
   '$route.params.emailId': {
      handler() {
        console.log('change route');
      },
      immediate:true
    }
      
   
  }
};
