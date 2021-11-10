import {emailService} from '../services/email-services.js';
import emailList from '../cmps/email-list.cmp.js';
// import emailFilter from '../cmps/email-filter.cmp.js';
import emailDetails from './email-details.cmp.js';
// import bookAdd from '../cmps/book-add.cmp.js'
// import carEdit from './car-edit.cmp.js';

export default {
  template: `
        <section class="book-app">
            <h1>hello</h1>
            <!-- <email-filter @filtered="setFilter" /> -->
            <!-- <book-add @addedBook="refBooks"/> -->
            <email-list :emails="emailsToShow" @selected="selectEmail" @remove="onRemove" />
            <email-details v-if="selectedEmail" :email="selectedEmail" @close="closeDetails" />
           
        </section>
    `,
  data() {
    return {
      emails: null,
      selectedEmail: null,
      filterBy: null,
    };
  },
  created() {
    this.loadEmails();
  },
  methods: {
    loadEmails() {
      emailService.query().then((emails) => (this.emails = emails));
    },
    selectEmail(email) {
      console.log('yes');
      console.log(email);
      this.selectedEmail = email;
      this.$router.push('/email/'+email.id); 
    },
    closeDetails() {
      this.selectedBook = null;
    },
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
    refBooks(newBooks){
      this.emails = newBooks;
    },
    onRemove(email) {
      emailService.remove(email.id).then(emails => this.emails = emails);
    },
  },
  computed: {
    emailsToShow() {
      if (!this.filterBy) return this.emails;
      const searchStr = this.filterBy.title.toLowerCase();
      // const searchPrice = this.filterBy.price ? this.filterBy.price : Infinity;
      const emailsToShow = this.emails.filter((email) => {
        return (
          email.subject.toLowerCase().includes(searchStr)
          // book.listPrice.amount <= searchPrice
        );
      });
      return emailsToShow;
    },
  },
  components: {
    emailList,
    // emailFilter,
    emailDetails,
    // bookAdd
    // carEdit,
  },
};
